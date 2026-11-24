import test from "node:test";
import assert from "node:assert";
import crypto from "crypto";

// Test Encryption & Privacy for Minors
const ENCRYPTION_KEY = "aetheris_secret_key_min_32_bytes_safe_2026";
const IV_LENGTH = 12;

function encryptSensitiveData(text) {
  if (!text) return "";
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.scryptSync(ENCRYPTION_KEY, "aetheris_salt", 32);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

function decryptSensitiveData(encryptedData) {
  if (!encryptedData) return "";
  const parts = encryptedData.split(":");
  if (parts.length !== 3) return "[Decryption Error: Invalid Format]";
  const [ivHex, tagHex, contentHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const encryptedText = Buffer.from(contentHex, "hex");
  const key = crypto.scryptSync(ENCRYPTION_KEY, "aetheris_salt", 32);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString("utf8");
}

test("Counseling and clinical notes AES-256-GCM encryption round-trip", () => {
  const secretClinicalNote = "Confidential: Student experiencing exam stress, counselor consultation recommended.";
  const encrypted = encryptSensitiveData(secretClinicalNote);
  assert.notStrictEqual(encrypted, secretClinicalNote);
  assert.ok(encrypted.includes(":"), "Format should be iv:tag:ciphertext");

  const decrypted = decryptSensitiveData(encrypted);
  assert.strictEqual(decrypted, secretClinicalNote);
});

test("RBAC access control logic verifies allowed roles", () => {
  const checkAccess = (role, allowedRoles) => allowedRoles.includes(role);

  assert.strictEqual(checkAccess("PRINCIPAL", ["PRINCIPAL", "ADMIN"]), true);
  assert.strictEqual(checkAccess("TEACHER", ["PRINCIPAL", "ADMIN"]), false);
  assert.strictEqual(checkAccess("TEACHER", ["TEACHER", "PRINCIPAL"]), true);
  assert.strictEqual(checkAccess("STUDENT", ["TEACHER", "ADMIN"]), false);
});
