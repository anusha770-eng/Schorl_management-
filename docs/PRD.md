# Product Requirements Document (PRD)
## Project: Aetheris School OS
**The Next-Generation Adaptive School Management & Learning Intelligence Operating System**

---

## 1. Executive Summary & Vision

### 1.1 The Vision
**Aetheris School OS** is the world’s first unified, human-centered School Management System (SMS) designed to move schools from **reactive compliance logging to proactive learning intelligence**. 

Built for K-12 and secondary schools (with native architecture supporting both international curricula and regional school ecosystems like CBSE/ICSE/State boards), Aetheris unifies all core administrative operations—admissions, attendance, timetables, gradebooks, fees, library, transport, notices—with a breakthrough **Proactive Intervention Engine (MTSS)**, a **Curriculum-Grounded Socratic AI Tutor**, an **Autonomous Morning Substitute Dispatcher**, and a **Dual-Verification Safe Transport Ecosystem**.

### 1.2 The Signature Value Proposition
Unlike legacy systems (PowerSchool, Blackbaud, Entab, Fedena) that function as static data silos, and unlike lightweight classroom apps (Google Classroom, ClassDojo) that lack institutional ERP backbones, Aetheris establishes a closed-loop operational ecosystem:
> **Operational Telemetry → Proactive MTSS Early Warning → Guided Socratic Remediation → Boundary-Guarded Parent Collaboration.**

---

## 2. Evidence of Market Gaps & Competitor Verification

Before finalizing this product specification, extensive competitive analysis was conducted across 12 products (see `research/market-gap-report.md`). Key verified gaps addressed by Aetheris include:

1. **The MTSS / Learning Disconnect:** Tools like Panorama Education provide early-warning analytics for US districts, but are expensive standalone products with no built-in ERP (no timetables, fees, bus tracking, admissions) and zero student tutoring capabilities. Conversely, ERPs (Fedena, Entab, PowerSchool) merely record failing grades weeks after the failure happened.
   - *Verification Citation:* Searches confirmed no commercial SMS includes an integrated Multi-Tiered System of Supports (MTSS) engine that directly triggers curriculum-grounded Socratic remediation.
2. **Teacher Administrative Double-Entry & Substitution Chaos:** Teachers lose 8-12 hours/week copying grades between LMS and SIS, while administrative morning substitution takes 45-60 minutes of chaotic phone calls and manual paper logs.
   - *Verification Citation:* IntelCampus and Myleadingcampus report that existing substitute tools are either third-party add-ons or rigid single-attribute matchers. Aetheris incorporates a multi-variable constraint optimization engine directly into the core timetable.
3. **The Transport "Frozen Dot" Blindspot:** Parents tracking buses experience intense anxiety when vehicle GPS stops moving or drops offline, and GPS alone never verifies whether the child physically boarded.
   - *Verification Citation:* Transport analyses by NeoTrack & Campus24x7 show parent distress stems from the lack of child boarding manifests. Aetheris couples driver GPS with an attendant tap/QR manifest with offline caching.
4. **Parent Communication Overload & Exclusion:** Parents face notification noise or regional language barriers (Hindi, Kannada), while teachers suffer from 24/7 boundary erosion. Aetheris introduces triaged priority feeds with auto-translation and strict "Quiet Hours."

---

## 3. User Personas & Core Journeys

### Persona 1: Ananya Sharma – Grade 9 Student
- **Profile:** 14 years old, eager to learn but struggles with quadratic equations in Algebra. Experiences anxiety when sudden surprise tests are scheduled on the same day as science lab submissions.
- **Goals:** Understand concepts without feeling judged; track homework and exams in one place; get help when stuck at 8:00 PM without having to wait for the next day's class.
- **Frustrations:** Dislikes red marks and point-chasing; finds existing school portals ugly, confusing, and stressful.
- **Aetheris Journey:** Logs in with a clean, distraction-free dashboard; views her weekly schedule and balanced homework load; uses the **Socratic AI Tutor** to work through a math problem step-by-step; completes a 2-second opt-in SEL mood pulse.

### Persona 2: Vikram Rathore – High School Mathematics Teacher
- **Profile:** 38 years old, teaches 5 sections of Math across Grades 9 and 10; Class Teacher for Grade 9-B.
- **Goals:** Spend instructional time teaching, not doing repetitive clerical data entry; identify which students are falling behind before term exams; keep clear boundaries between school hours and personal life.
- **Frustrations:** Drowns in attendance clicks, report card comments, and late-night WhatsApp pings from anxious parents.
- **Aetheris Journey:** Opens the **Teacher Cockpit**; takes attendance in 5 seconds with keyboard shortcuts or rapid multi-select; views MTSS action cards highlighting students needing concept reinforcement; generates contextual AI draft remarks for report cards with one click; enjoys guaranteed quiet hours after 6:00 PM.

### Persona 3: Meera & Rajesh Iyer – Parents of Two (Grade 4 & Grade 9)
- **Profile:** Working parents in Bangalore, managing hectic commutes and dual children's school commitments. Fluent in English and Kannada.
- **Goals:** Real-time peace of mind that children arrived safely at school; clear understanding of child's growth without grade micromanagement; hassle-free fee payments.
- **Frustrations:** The school bus GPS app constantly freezes; school notices get lost in noisy WhatsApp groups; juggling different logins for two kids.
- **Aetheris Journey:** Seamlessly toggles between both children in one unified mobile-first view; receives instant "Boarded Bus" and "Arrived at School" dual notifications; reads school circulars auto-translated into Kannada; reviews term progress narrative with actionable suggestions.

### Persona 4: Dr. Sunita Kulkarni – Principal
- **Profile:** 54 years old, visionary school leader overseeing 1,200 students and 85 faculty members.
- **Goals:** High academic standards, teacher retention, operational excellence, student safety, and fiscal stability.
- **Frustrations:** Blindsided by academic dips at the end of the year; morning teacher absenteeism causes chaos and complaints.
- **Aetheris Journey:** Reviews the **Principal Executive Overview**; monitors campus-wide MTSS health index, teacher workload equilibrium, and fee collection run-rate; oversees autonomous morning substitution allocations with 1-click approvals.

### Persona 5: Suresh Nair – School Accountant & Administrative Officer
- **Profile:** 46 years old, manages tuition invoices, transport fees, vendor payroll, and regulatory reporting.
- **Goals:** High collection rates, audit-ready ledgers, zero cash discrepancies, empathetic resolution of family payment delays.
- **Frustrations:** Chasing late fees feels confrontational; standard ERPs lock financial exports behind custom IT requests.
- **Aetheris Journey:** Automates fee head structures and digital payment links; offers pre-approved split-payment installment plans to struggling parents; exports one-click compliance ledgers.

### Persona 6: Ramesh Gowda – Bus Transport In-Charge & Fleet Attendant
- **Profile:** 42 years old, coordinates 14 school buses and ensures student safety on morning/afternoon routes.
- **Goals:** Safe, orderly boarding and drop-off; real-time route execution without distracted phone calls from parents.
- **Frustrations:** Parents calling while driving; battery drain on personal smartphones; attendance confusion at busy bus stops.
- **Aetheris Journey:** Uses the **Transport Attendant Interface**; taps student QR cards or uses offline roster check-in in seconds; vehicle location streams reliably with automatic ETA recalculations.

---

## 4. Product Modules & Feature Specifications

### 4.1 Core Baseline Modules (Engineered to Excellence)
1. **Student Information System (SIS):** Comprehensive profiles, guardian relationships, health alerts, admission timeline, academic history, documents archive.
2. **Staff & Faculty Management:** Departmental directories, credential tracking, assigned periods, leave balances, workload metrics.
3. **Attendance Cockpit:** Ultra-fast period-by-period and daily attendance taking (keyboard shortcuts: `P` for Present, `A` for Absent, `L` for Late; Bulk-mark Present with one stroke).
4. **Dynamic Timetable Engine:** Interactive master timetable grid, classroom room-mapping, teacher allocation matrix, conflict prevention.
5. **Examinations & Gradebook:** Configurable grading schemes (percentage, GPA, CBSE/ICSE letter scales), assessment weightage, skill rubric attachments, CSV grade import/export.
6. **Smart Report Cards:** Multi-dimensional narrative report cards combining academic mastery, attendance metrics, co-curricular achievements, and AI-assisted personalized teacher remarks.
7. **Fees & Payments:** Fee structure configuration (Tuition, Lab, Transport, Sports), automated invoicing, Razorpay/Stripe integration, receipt generation, aging reports.
8. **Digital Library:** Catalog search, ISBN lookup, issue/return barcode scanning, overdue calculations, digital reading list recommendations.
9. **Transport & Fleet Management:** Bus routes, stops, vehicle tracking, driver & attendant assignments, vehicle maintenance logs.
10. **Notices & Communication:** Broadcast announcements, targeted grade/class circulars, priority tagging (Critical / Action Required / Information), attachments.
11. **Role-Based Portals & Dashboards:** 7 custom-designed dashboards (Admin, Principal, Teacher, Student, Parent, Accountant, Transport).

---

### 4.2 Signature Differentiators (The Aetheris Innovation Suite)

#### Signature Feature 1: OmniLoop Proactive MTSS & Early Warning Engine
- **Multi-Factor Risk Scoring:** Continuous, passive calculation of a student's **Holistic Growth Index (HGI)** based on 4 non-invasive vectors:
  1. *Academic Velocity:* Trajectory across last 3 formative assessments (detects sharp decelerations).
  2. *Attendance Drift:* Micro-absenteeism patterns (e.g., missing 3 consecutive Friday morning science labs).
  3. *Submission Consistency:* Timeliness and completion rate of assignments without penalizing illness.
  4. *Opt-in SEL Pulse:* Optional 2-second daily mood/energy check-in.
- **Tiered Intervention Action Cards:**
  - *Tier 1 (Universal):* Normal classroom support, automatic positive reinforcement badges.
  - *Tier 2 (Targeted Support):* Generates an actionable suggestion for the teacher ("Rahul missed 2 foundational homework sets in Linear Equations. Suggested action: 10-minute concept review or assign Socratic remedial module").
  - *Tier 3 (Intensive Support):* Discreetly alerts school counselor and principal with private case notes (HIPAA/FERPA/DPDP privacy-partitioned).
- **Zero Surveillance Guarantee:** No keystroke logging, no webcam tracking, no invasive screen monitoring. Respects student dignity at all times.

#### Signature Feature 2: Syllabus-Grounded Socratic AI Tutor ("Aetheris Mentor")
- **Curriculum Anchoring:** Integrated with the school’s active curriculum units and weekly syllabus schedule. The tutor knows exactly what chapter and learning objective the student is studying.
- **Socratic Pedagogy:** When a student enters a problem or asks for help, the AI is constrained by system prompts to *never reveal the final answer immediately*. Instead, it guides the student with step-by-step diagnostic questions, hints, and conceptual analogies.
- **Remediation Feedback Loop:** When a student demonstrates mastery or reveals a persistent misconception during a Socratic chat, this qualitative insight anonymized and summarized feeds back to the teacher's MTSS cockpit ("7 students in 9-B struggled with factoring binomials").

#### Signature Feature 3: Autonomous Morning Substitute Dispatcher ("Smart Proxy")
- **Constraint-Satisfaction Optimization:** When a faculty member logs sick leave (or doesn't check in by 7:30 AM), the engine evaluates:
  1. Free period availability of peers.
  2. Subject competency matching (Physics teacher prefers covering Math/Science).
  3. Workload equity (prevents overburdening the same junior faculty).
  4. Class familiarity.
- **1-Click Dispatch:** Presents the Principal or Academic Coordinator with the top 3 ranked recommendations with 1-click accept, instantly notifying the substitute teacher with pre-attached lesson objectives.

#### Signature Feature 4: Dual-Verification Safe Transport Ecosystem ("SafeRide")
- **Child + Vehicle Dual Sync:** Bus tracking combines real-time GPS telemetry with an Attendant Boarding Manifest (digital QR/NFC tap or rapid swipe).
- **Parent Certainty Pings:** Parents receive notifications for both:
  - *"Bus 4 has started morning route (ETA 12 mins to your stop)."*
  - *"Ananya has safely boarded Bus 4 at Stop #3 (7:42 AM)."*
- **Offline Resilient Manifest:** Operates seamlessly even when the bus navigates cellular dead zones, syncing records the instant connection restores.

#### Signature Feature 5: Empathetic Financial Health Workflows
- **Respectful Invoicing:** Eliminates humiliating public fee callouts. 
- **1-Click Installment Request:** Allows parents experiencing temporary cash flow strain to request an automated 3-part split installment plan directly in the app.
- **Automated Grace Periods:** Transparent administration approval with discrete accounting ledgers.

#### Signature Feature 6: Triaged Multilingual Communication & Boundary Guardian
- **Signal vs. Noise Priority Feed:** Automatically sorts incoming school updates into *Action Required* (signature, permission slip, fee due), *Academic Updates*, and *Campus Life*.
- **Native Trilingual Engine:** Full interface and notice translation across **English, Hindi, and Kannada**, with immediate extensibility for additional regional/international languages.
- **Teacher Boundary Guardian:** Enforces scheduled Quiet Hours (e.g., 6:00 PM – 7:30 AM). Inquiries received during quiet hours are acknowledged by an automated AI assistant and queued for teacher review during the next working day.

---

## 5. Non-Functional Requirements & Compliance

1. **Performance:**
   - Global command bar (`Cmd+K`) response time: `< 80ms`.
   - Page transitions: `< 150ms` using Next.js App Router client caching.
   - Core Web Vitals: LCP `< 1.2s`, CLS `< 0.05`, FID `< 50ms`.
2. **Security & Data Privacy (Minors' Data Protection):**
   - Strictly compliant with COPPA, FERPA, GDPR-K, and India Digital Personal Data Protection Act (DPDP 2023).
   - Strict Role-Based Access Control (RBAC) and Row-Level Security principles.
   - PII encryption at rest (AES-256) and in transit (TLS 1.3).
   - Segregation of sensitive student counseling/medical notes from general academic records.
3. **Accessibility:**
   - Full WCAG 2.1 Level AA compliance.
   - Comprehensive keyboard navigation support (`Tab`, `Escape`, `Cmd+K`, Arrow keys).
   - Screen-reader friendly semantic ARIA attributes and high-contrast color tokens.
4. **Cross-Platform Responsiveness:**
   - Mobile-first optimization for Parent and Student portals.
   - High-density information architecture for Teacher, Admin, and Principal desktop cockpits.

---

## 6. MVP Scope vs. Future Roadmap

### Phase 3 MVP Scope (Full Working System)
- **All 7 Role-Based Dashboards & Workspaces:** (Admin, Principal, Teacher, Student, Parent, Accountant, Transport).
- **Core Operational Workflows:** Student directory, staff records, attendance marking, timetable viewer, gradebook, report cards, fees and payments, notices, transport routes.
- **The Signature Suites:**
  - OmniLoop MTSS early-warning alerts and student growth index.
  - Interactive Socratic AI Tutor with real-time streaming LLM guidance via OpenRouter.
  - Smart Morning Substitute Dispatcher with constraint-based recommendations.
  - SafeRide dual-verification transport simulator (bus location + child boarding).
  - Trilingual language toggle (English, Hindi, Kannada) with instant UI adaptation.
  - Universal Command Palette (`Cmd+K`) and dark/light mode toggle.
- **Data & QA:** Realistic database seed data (schools, teachers, students, parents, grades, buses, notices) with 1-click demo login switchers.

### Post-MVP Roadmap
- Native iOS and Android React Native shells with biometric login.
- Computer-vision examination paper scanning and mark digitization.
- RFID hardware gate integration for automated campus turnstiles.
- Advanced state compliance XML export builders for international and regional boards.
