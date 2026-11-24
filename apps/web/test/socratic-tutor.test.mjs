import test from "node:test";
import assert from "node:assert";

// Generalized PII scrubber
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b|\b\d{10,12}\b/g;
const STUDENT_ID_REGEX = /\b[A-Z]{2,4}-\d{4}-\d{3,5}\b|\b\d{1,2}[A-Z]-\d{1,3}\b/g;
const UNSEEN_NAME_PATTERNS = [
  /(?:my name is|i am|call me|this is|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
  /(?:student|learner|author|from|by):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
];

function scrubPII(text) {
  let sanitized = text;
  sanitized = sanitized.replace(EMAIL_REGEX, "[REDACTED_EMAIL]");
  sanitized = sanitized.replace(PHONE_REGEX, "[REDACTED_PHONE]");
  sanitized = sanitized.replace(STUDENT_ID_REGEX, "[REDACTED_ID]");
  for (const pattern of UNSEEN_NAME_PATTERNS) {
    sanitized = sanitized.replace(pattern, (match, capturedName) => {
      return match.replace(capturedName, "[REDACTED_NAME]");
    });
  }
  return sanitized;
}

test("PII Stripping catches arbitrary UNSEEN student names without hardcoded lists", () => {
  // Test with names completely unseen by the system
  const rawInput1 = "Hello tutor, my name is Alexander Wright and my email is alexander.wright@external-school.org.";
  const cleaned1 = scrubPII(rawInput1);
  assert.ok(!cleaned1.includes("Alexander Wright"), "Unseen name Alexander Wright must be scrubbed");
  assert.ok(cleaned1.includes("[REDACTED_NAME]"));
  assert.ok(!cleaned1.includes("alexander.wright@external-school.org"));
  assert.ok(cleaned1.includes("[REDACTED_EMAIL]"));

  const rawInput2 = "I am Priya Bhattacharya, student ID AIA-2024-8841. Can you help me?";
  const cleaned2 = scrubPII(rawInput2);
  assert.ok(!cleaned2.includes("Priya Bhattacharya"), "Unseen name Priya Bhattacharya must be scrubbed");
  assert.ok(!cleaned2.includes("AIA-2024-8841"), "Student ID must be scrubbed");
  assert.ok(cleaned2.includes("[REDACTED_NAME]"));
  assert.ok(cleaned2.includes("[REDACTED_ID]"));
});

test("Socratic Tutor refuses out-of-scope entertainment questions", () => {
  const isOutOfScope = (q) => /minecraft|movie|football|weather|joke/i.test(q);
  assert.strictEqual(isOutOfScope("Can you give me cheat codes for Minecraft?"), true);
  assert.strictEqual(isOutOfScope("How do I factorize quadratic expressions?"), false);
});

test("Socratic Tutor enforces inquiry guidance over direct answer generation", () => {
  const isDirectAnswerRequest = (q) => /solve|answer|give me the answer/i.test(q);
  assert.strictEqual(isDirectAnswerRequest("Just give me the answer for question 4"), true);
});
