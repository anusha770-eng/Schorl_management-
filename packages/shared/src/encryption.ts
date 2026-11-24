import crypto from "crypto";

// AES-256-GCM encryption for sensitive clinical/counseling notes and minors' private health data
// Strictly requires ENCRYPTION_SECRET_KEY from environment variables
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_SECRET_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("FATAL: ENCRYPTION_SECRET_KEY environment variable is not defined");
    }
    // Development fallback warning
    console.warn("WARN: Using development fallback encryption secret key. Set ENCRYPTION_SECRET_KEY in production.");
    return "aetheris_dev_secret_key_min_32_bytes_2026";
  }
  return key;
}

const IV_LENGTH = 12;

export function encryptSensitiveData(text: string): string {
  if (!text) return "";
  const keyStr = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.scryptSync(keyStr, "aetheris_salt", 32);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptSensitiveData(encryptedData: string): string {
  if (!encryptedData) return "";
  try {
    const parts = encryptedData.split(":");
    if (parts.length !== 3) return "[Decryption Error: Invalid Format]";
    const [ivHex, tagHex, contentHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const encryptedText = Buffer.from(contentHex, "hex");
    const keyStr = getEncryptionKey();
    const key = crypto.scryptSync(keyStr, "aetheris_salt", 32);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (err) {
    return "[Encrypted Record - Restricted Access]";
  }
}
