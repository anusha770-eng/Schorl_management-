export type UserRole =
  | "ADMIN"
  | "PRINCIPAL"
  | "TEACHER"
  | "STUDENT"
  | "PARENT"
  | "ACCOUNTANT"
  | "TRANSPORT";

export type MTSSSeverity = "TIER_1_LOW" | "TIER_2_MODERATE" | "TIER_3_CRITICAL";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId: string;
  languagePref: string;
  studentProfileId?: string;
  staffProfileId?: string;
  parentProfileId?: string;
}

export interface MTSSFlagDTO {
  id: string;
  studentId: string;
  studentName: string;
  gradeLevel: number;
  sectionName: string;
  severity: MTSSSeverity;
  domain: "ACADEMIC" | "ATTENDANCE" | "SEL";
  triggerReason: string;
  status: "ACTIVE" | "IN_INTERVENTION" | "RESOLVED";
  recommendedAction: string;
  hasEncryptedNotes: boolean;
  createdAt: string;
}

export interface SocraticMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface SocraticChatRequest {
  topic: string;
  curriculumRef: string;
  messages: SocraticMessage[];
}

export interface SubstitutionRecommendation {
  slotId: string;
  date: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  classSection: string;
  absentTeacherName: string;
  candidates: {
    staffId: string;
    teacherName: string;
    department: string;
    matchingScore: number;
    reason: string;
    currentWeeklyHours: number;
  }[];
}

export interface BusBoardingEvent {
  busRouteId: string;
  studentId: string;
  tripType: "MORNING_PICKUP" | "AFTERNOON_DROPOFF";
  verifiedBy: "ATTENDANT_SCAN" | "MANUAL_TAP";
}
