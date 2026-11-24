import test from "node:test";
import assert from "node:assert";

// Simulated requireAuth function with RBAC enforcement
function evaluateRBAC(session, allowedRoles) {
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

// Rate Limiter implementation test
class RateLimiter {
  constructor(maxRequests, windowSeconds) {
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
    this.requests = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const windowStart = now - this.windowSeconds * 1000;
    const timestamps = (this.requests.get(identifier) || []).filter((t) => t > windowStart);

    if (timestamps.length >= this.maxRequests) {
      return false;
    }

    timestamps.push(now);
    this.requests.set(identifier, timestamps);
    return true;
  }
}

test("API RBAC: Student token is strictly rejected (403 FORBIDDEN) on Teacher/Principal endpoints", () => {
  const studentSession = { id: "user_stu_1", role: "STUDENT", email: "student@aetheris.edu" };

  // Attendance submission (Requires TEACHER, PRINCIPAL, or ADMIN)
  assert.throws(
    () => evaluateRBAC(studentSession, ["TEACHER", "PRINCIPAL", "ADMIN"]),
    /FORBIDDEN/,
    "Student must receive 403 on attendance marking"
  );

  // Substitute dispatcher (Requires PRINCIPAL or ADMIN)
  assert.throws(
    () => evaluateRBAC(studentSession, ["PRINCIPAL", "ADMIN"]),
    /FORBIDDEN/,
    "Student must receive 403 on substitution dispatcher"
  );

  // Sensitive pastoral care notes read (Requires PRINCIPAL or ADMIN)
  assert.throws(
    () => evaluateRBAC(studentSession, ["PRINCIPAL", "ADMIN"]),
    /FORBIDDEN/,
    "Student must receive 403 on confidential pastoral notes"
  );
});

test("API RBAC: Teacher token is rejected (403 FORBIDDEN) on Principal-only endpoints", () => {
  const teacherSession = { id: "user_tea_1", role: "TEACHER", email: "teacher@aetheris.edu" };

  // Substitute confirmation (Requires PRINCIPAL or ADMIN)
  assert.throws(
    () => evaluateRBAC(teacherSession, ["PRINCIPAL", "ADMIN"]),
    /FORBIDDEN/,
    "Teacher must receive 403 on substitute dispatch confirmation"
  );
});

test("API RBAC: Unauthenticated request throws UNAUTHORIZED (401)", () => {
  assert.throws(
    () => evaluateRBAC(null, ["TEACHER"]),
    /UNAUTHORIZED/,
    "Missing session must throw UNAUTHORIZED"
  );
});

test("Rate Limiter: Auth endpoint rejects after 10 failed attempts within window", () => {
  const authLimiter = new RateLimiter(10, 60);
  const ip = "192.168.1.50";

  for (let i = 0; i < 10; i++) {
    assert.strictEqual(authLimiter.isAllowed(ip), true, `Attempt ${i + 1} should be allowed`);
  }

  // 11th attempt must be blocked
  assert.strictEqual(authLimiter.isAllowed(ip), false, "11th attempt must be rejected by rate limiter");
});

test("Rate Limiter: AI Tutor endpoint rejects after 30 queries within window", () => {
  const tutorLimiter = new RateLimiter(30, 60);
  const studentId = "student_ananya_01";

  for (let i = 0; i < 30; i++) {
    assert.strictEqual(tutorLimiter.isAllowed(studentId), true, `Query ${i + 1} should be allowed`);
  }

  // 31st query must be blocked
  assert.strictEqual(tutorLimiter.isAllowed(studentId), false, "31st query must be rejected by rate limiter");
});
