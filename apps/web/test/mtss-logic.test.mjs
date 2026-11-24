import test from "node:test";
import assert from "node:assert";

// MTSS Holistic Growth Index calculation & Flagging logic
function calculateMTSSRisk(assessmentScores, attendancePercentage, missedAssignments) {
  // Score trajectory: check if last score dropped significantly
  const n = assessmentScores.length;
  let deceleration = 0;
  if (n >= 2) {
    const recent = assessmentScores[n - 1];
    const prev = assessmentScores[n - 2];
    deceleration = prev - recent;
  }

  // Base HGI calculation
  const avgScore = assessmentScores.reduce((a, b) => a + b, 0) / (n || 1);
  const penalty = (deceleration > 15 ? 15 : 0) + (attendancePercentage < 80 ? 20 : 0) + missedAssignments * 5;
  const hgi = Math.max(0, Math.min(100, (avgScore * 0.6) + (attendancePercentage * 0.4) - penalty));

  let tier = "TIER_1_LOW";
  let recommendedAction = "Maintain universal classroom monitoring";

  if (hgi < 70 || deceleration > 20 || attendancePercentage < 75) {
    tier = "TIER_2_MODERATE";
    recommendedAction = "Deploy targeted Socratic Remediation module & schedule 15-minute educator check-in";
  }

  if (hgi < 50 || (attendancePercentage < 65 && deceleration > 25)) {
    tier = "TIER_3_CRITICAL";
    recommendedAction = "Escalate to Student Pastoral Care Team and Principal with confidential support plan";
  }

  return { hgi: Number(hgi.toFixed(1)), tier, recommendedAction };
}

test("MTSS logic correctly assigns Tier 1 to steady student", () => {
  const result = calculateMTSSRisk([88, 92, 90], 95, 0);
  assert.strictEqual(result.tier, "TIER_1_LOW");
  assert.ok(result.hgi >= 80);
});

test("MTSS logic detects steep deceleration and triggers Tier 2 targeted intervention", () => {
  // Rahul: drops from 82 to 58 (-24 points), missed 2 assignments
  const result = calculateMTSSRisk([85, 82, 58], 85, 2);
  assert.strictEqual(result.tier, "TIER_2_MODERATE");
  assert.ok(result.recommendedAction.includes("Socratic Remediation"));
});

test("MTSS logic triggers Tier 3 for compounding severe risks", () => {
  const result = calculateMTSSRisk([65, 45, 30], 60, 5);
  assert.strictEqual(result.tier, "TIER_3_CRITICAL");
  assert.ok(result.recommendedAction.includes("Pastoral Care"));
});
