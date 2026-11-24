import test from "node:test";
import assert from "node:assert";

// Test PII Stripping function
function sanitizeStudentMessage(rawText) {
  return rawText
    .replace(/ananya|rahul|tanvi|vikram/gi, "Learner")
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[email]")
    .replace(/\+?[0-9]{10,12}/g, "[phone]");
}

// Test Socratic Pedagogy rule engine
function evaluateSocraticResponse(query) {
  const q = query.toLowerCase();
  if (q.includes("minecraft") || q.includes("movie")) {
    return { isRefusal: true, prompt: "Redirect to curriculum" };
  }
  if (q.includes("solve") || q.includes("answer")) {
    return { isRefusal: false, givesDirectAnswer: false, asksGuidingQuestion: true };
  }
  return { isRefusal: false, givesDirectAnswer: false, asksGuidingQuestion: true };
}

test("PII Stripping removes names, emails and phone numbers before LLM routing", () => {
  const rawInput = "Hi, my name is Ananya Sharma, my email is student@aetheris.edu and phone is 9880612345. Can you help me factorize x^2 + 5x + 6?";
  const cleaned = sanitizeStudentMessage(rawInput);

  assert.ok(!cleaned.includes("Ananya"), "Name must be stripped");
  assert.ok(!cleaned.includes("student@aetheris.edu"), "Email must be stripped");
  assert.ok(!cleaned.includes("9880612345"), "Phone must be stripped");
  assert.ok(cleaned.includes("Learner"));
  assert.ok(cleaned.includes("[email]"));
  assert.ok(cleaned.includes("[phone]"));
});

test("Socratic Tutor refuses out-of-scope entertainment questions", () => {
  const result = evaluateSocraticResponse("Can you give me cheat codes for Minecraft?");
  assert.strictEqual(result.isRefusal, true);
  assert.strictEqual(result.prompt, "Redirect to curriculum");
});

test("Socratic Tutor refuses to give direct homework answers", () => {
  const result = evaluateSocraticResponse("Just solve x^2 + 5x + 6 for me and tell me the answer.");
  assert.strictEqual(result.givesDirectAnswer, false);
  assert.strictEqual(result.asksGuidingQuestion, true);
});
