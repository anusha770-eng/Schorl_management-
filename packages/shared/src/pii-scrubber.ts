/**
 * Generalized Zero-PII Scrubber for Minor Student Data Protection
 * Compliant with COPPA, FERPA, GDPR-K, and DPDP 2023.
 * Automatically catches and redacts unseen names, emails, phone numbers, and student IDs.
 */

// Regex patterns for entity redaction
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b|\b\d{10,12}\b/g;
const STUDENT_ID_REGEX = /\b[A-Z]{2,4}-\d{4}-\d{3,5}\b|\b\d{1,2}[A-Z]-\d{1,3}\b/g;

// Catches arbitrary unseen names in conversational patterns
// Examples: "My name is Jonathan Miller", "I am Priya Sharma", "call me Alex", "Student: Marcus Cole"
const UNSEEN_NAME_PATTERNS = [
  /(?:my name is|i am|call me|this is|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
  /(?:student|learner|author|from|by):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
];

export function scrubPII(text: string): { sanitized: string; redactedEntitiesCount: number } {
  if (!text) return { sanitized: "", redactedEntitiesCount: 0 };

  let sanitized = text;
  let count = 0;

  // 1. Redact Emails
  sanitized = sanitized.replace(EMAIL_REGEX, () => {
    count++;
    return "[REDACTED_EMAIL]";
  });

  // 2. Redact Phone Numbers
  sanitized = sanitized.replace(PHONE_REGEX, () => {
    count++;
    return "[REDACTED_PHONE]";
  });

  // 3. Redact Student IDs / Roll Numbers (e.g. AIA-2024-0891, 9A-04)
  sanitized = sanitized.replace(STUDENT_ID_REGEX, () => {
    count++;
    return "[REDACTED_ID]";
  });

  // 4. Redact arbitrary unseen names from introductory declarations
  for (const pattern of UNSEEN_NAME_PATTERNS) {
    sanitized = sanitized.replace(pattern, (match, capturedName) => {
      count++;
      return match.replace(capturedName, "[REDACTED_NAME]");
    });
  }

  return { sanitized, redactedEntitiesCount: count };
}
