import test from "node:test";
import assert from "node:assert";

// Grade Calculation Logic
function calculateGrade(marksObtained, maxMarks = 100) {
  const percentage = (marksObtained / maxMarks) * 100;
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

// Substitution Constraint Scoring
function calculateProxyMatchScore(candidate, targetSlot) {
  let score = 70; // baseline free period
  if (candidate.department === targetSlot.department) score += 20;
  if (candidate.specializations.includes(targetSlot.subject)) score += 10;
  
  const workloadRatio = candidate.currentHours / candidate.maxHours;
  if (workloadRatio < 0.6) score += 5;
  if (workloadRatio > 0.85) score -= 10;

  return Math.min(98, Math.max(50, score));
}

test("Marks to Letter Grade conversion", () => {
  assert.strictEqual(calculateGrade(95, 100), "A+");
  assert.strictEqual(calculateGrade(82, 100), "A");
  assert.strictEqual(calculateGrade(74, 100), "B");
  assert.strictEqual(calculateGrade(58, 100), "D");
  assert.strictEqual(calculateGrade(35, 100), "F");
});

test("Substitution constraint engine rewards subject synergy and workload balance", () => {
  const physicsTeacher = {
    name: "Priya Patel",
    department: "Science",
    specializations: ["Physics", "Applied Mathematics"],
    currentHours: 18,
    maxHours: 28,
  };

  const historyTeacher = {
    name: "Sunita Rao",
    department: "Humanities",
    specializations: ["History"],
    currentHours: 26,
    maxHours: 28,
  };

  const targetSlot = {
    subject: "Physics",
    department: "Science",
  };

  const scorePhysics = calculateProxyMatchScore(physicsTeacher, targetSlot);
  const scoreHistory = calculateProxyMatchScore(historyTeacher, targetSlot);

  assert.ok(scorePhysics > scoreHistory, "Science educator must rank higher for physics proxy");
  assert.strictEqual(scorePhysics >= 95, true);
});
