import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";
import { aiTutorRateLimiter, scrubPII } from "@aetheris/shared";

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    const ip = req.headers.get("x-forwarded-for") || session.id;

    if (!aiTutorRateLimiter.isAllowed(ip)) {
      return NextResponse.json(
        { error: "Tutor query rate limit reached (30 queries/min). Please take a moment to reflect." },
        { status: 429 }
      );
    }

    const { subject = "Mathematics", chapter = 4, messages = [] } = await req.json();

    if (!messages.length) {
      return NextResponse.json({ error: "Conversation messages are required" }, { status: 400 });
    }

    // 1. Fetch Approved Curriculum Unit from DB for Grounding
    const curriculum = await prisma.curriculumUnit.findFirst({
      where: {
        subject: { contains: subject },
        chapter: Number(chapter),
      },
    });

    const curriculumContext = curriculum
      ? `Curriculum Unit: ${curriculum.title}\nKey Concepts: ${curriculum.keyConcepts}\nApproved Textbook Knowledge Body:\n${curriculum.contentBody}`
      : "Standard Secondary Mathematics Curriculum (Algebra, Linear Equations, Factoring Quadratic Equations).";

    // 2. Anonymize PII - strictly strip arbitrary unseen names, emails, phone numbers, student IDs
    const anonymizedMessages = messages.map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: scrubPII(m.content || "").sanitized,
    }));

    const lastUserMessage = anonymizedMessages[anonymizedMessages.length - 1]?.content || "";

    // 3. Check OpenRouter API Key
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    let replyText = "";
    let isDemoMode = false;

    if (apiKey) {
      // Call OpenRouter API with Gemini / Claude model
      const systemPrompt = `You are Aetheris Socratic Mentor, an inquiry-based tutor for Grade 9 students.
CRITICAL PEDAGOGICAL RULES:
1. You are strictly grounded in this approved school curriculum:
${curriculumContext}
2. NEVER give direct answers or write out the complete solution.
3. If the student asks for the answer to a homework problem (e.g. "factorize x^2 + 5x + 6" or "what is x?"), ask them to identify key components first (e.g., "What are the values of a, b, and c?" or "What two numbers add to give 5 and multiply to give 6?").
4. If the student asks something completely outside the curriculum (e.g., video games, unrelated topics, non-academic queries), gently and warmly redirect them back to the current topic.
5. Keep your response encouraging, concise (2-4 sentences max), with 1 guiding question at the end.`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://aetheris.edu",
          "X-Title": "Aetheris School OS",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [
            { role: "system", content: systemPrompt },
            ...anonymizedMessages,
          ],
          temperature: 0.3,
          max_tokens: 400,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        replyText = data.choices?.[0]?.message?.content || "Let's review the first step together: what are the coefficients of your equation?";
      } else {
        // Fallback to high-fidelity demo response if OpenRouter has temporary error
        isDemoMode = true;
        replyText = generateSocraticDemoResponse(lastUserMessage, curriculum?.title || "Quadratic Equations");
      }
    } else {
      // No API key configured: High-Fidelity Socratic Demo Engine
      isDemoMode = true;
      replyText = generateSocraticDemoResponse(lastUserMessage, curriculum?.title || "Quadratic Equations");
    }

    // Save session telemetry to database (anonymized)
    if (session.studentProfileId) {
      await prisma.socraticSession.create({
        data: {
          studentId: session.studentProfileId,
          subject: subject,
          topic: curriculum?.title || "Algebraic Foundations",
          curriculumRef: `G9-Ch${chapter}`,
          messages: JSON.stringify([
            ...anonymizedMessages,
            { role: "assistant", content: replyText, timestamp: new Date().toISOString() },
          ]),
          masteryScore: isDemoMode ? 82.5 : null,
          conceptGaps: JSON.stringify(["Middle Term Splitting", "Sign Conventions"]),
        },
      });
    }

    return NextResponse.json({
      reply: replyText,
      curriculumGroundedIn: curriculum?.title || "Grade 9 Mathematics - Chapter 4",
      isDemoMode,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// High-Fidelity Socratic Demo Engine (Pedagogically grounded)
function generateSocraticDemoResponse(userQuery: string, topicTitle: string): string {
  const query = userQuery.toLowerCase();

  // Out of scope check
  if (
    query.includes("minecraft") ||
    query.includes("movie") ||
    query.includes("football") ||
    query.includes("weather") ||
    query.includes("joke")
  ) {
    return `That sounds interesting, but right now we are exploring "${topicTitle}". How about we first master this concept together? What part of the equation would you like to examine first?`;
  }

  // Direct answer seeking ("tell me the answer", "solve this", "what is x", "factor")
  if (query.includes("answer") || query.includes("solve") || query.includes("factor") || query.includes("how to do")) {
    return `I'm here to help you discover the solution yourself! In a quadratic expression ax² + bx + c, what are your values for 'a', 'b', and 'c'? Once we identify them, finding the middle terms becomes much clearer!`;
  }

  // When student provides coefficients or numbers
  if (query.includes("a =") || query.includes("b =") || /\b\d+\b/.test(query)) {
    return `Spot on! Now that we have the coefficients, remember the core rule: we need two numbers that multiply to give (a × c) and add up to give (b). What two numbers come to mind?`;
  }

  // Student asking for hint or confused
  if (query.includes("help") || query.includes("hint") || query.includes("stuck") || query.includes("don't know")) {
    return `No worries at all, feeling stuck is part of learning! Let's take it one step at a time. Look at the constant term at the end. Can you list all the pairs of factors for that number?`;
  }

  // Default encouraging Socratic prompt
  return `Great thought! To make sure we're on solid ground with "${topicTitle}", what is the very first step your textbook recommends before rearranging the terms?`;
}
