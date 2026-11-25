# Aetheris School OS — Project Presentation (SmartStay Format)

**File Generated:** [`Aetheris_School_OS_Project_Presentation.pptx`](file:///Users/apple/Desktop/f_s_2/Aetheris_School_OS_Project_Presentation.pptx)  
*(Note: The previous file `Aetheris_School_OS_Minor_Project_Presentation.pptx` has been left completely untouched).*

**Format:** Microsoft PowerPoint (.pptx), 16:9 Widescreen (13.333" × 7.5")  
**Design Theme:** Obsidian & Starlight (Deep Slate `#0B0F17`, Navy `#131C2E`, Amber `#F59E0B`, Indigo `#6366F1`, Emerald `#10B981`, Cyan `#06B6D4`)  
**Guidelines Followed:** Project Presentation Instructions (SmartStay Format & Structure):
- Relevant project details & candidate information
- Comprehensive methodology (Agile Scrum & vertical slice engineering)
- Clear architectural diagrams (System Architecture, ER Diagram, Data Flow Diagrams)
- Concrete implementation formulas and algorithms
- High-resolution real-world working project screenshots
- Experimental results and dual-layer testing (15/15 Unit + 10/10 E2E)
- **Prominently featured GitHub repository link** across Title, Footer, and dedicated Source Code slides
- Conclusion, future scope, faculty acknowledgments, and Q&A slide

---

## Complete Slide Structure & Transcript (16 Slides)

### Slide 1: Title Slide
- **Banner:** `FULL STACK DEVELOPMENT PROJECT PRESENTATION`
- **Project Title:** **AETHERIS SCHOOL OS**
- **Subtitle:** *Next-Generation Learning Intelligence & Unified School Management System*
- **Left Details Card:**
  - Project Title: Aetheris School OS
  - Student Name: `[Student Name]` *(Update with your name)*
  - USN: `[University Seat Number / USN]` *(Update with your USN)*
  - Section / Sem: `[Section / 6th Semester 'A']` *(Update with your section)*
  - Department: Department of Computer Science & Engineering
  - College: `[College / University Name]` *(Update with your college)*
  - Project Guide: `[Faculty Guide / Mentor Name]` *(Update with your mentor)*
- **Right Details Card (GitHub & Specs):**
  - **GitHub Repository Link:** `https://github.com/anusha770-eng/Schorl_management-`
  - Architecture: Monorepo (Next.js 15, Prisma ORM, TypeScript)
  - AI Layer: Grounded OpenRouter Socratic Tutor + Zero-PII Scrubber
  - Personas: 7 Role-Tailored Operational Cockpits
  - Quality: 15/15 Unit Tests + 10/10 Playwright E2E Tests (100% Pass)
  - Verification: Live Production Build on Port 3001

---

### Slide 2: Project Overview & Introduction
- **Domain Background:** Analysis of traditional school software (PowerSchool, Fedena, Entab) functioning merely as passive digital filing cabinets.
- **Project Motivation:** Shifting educational technology from documenting student failure post-hoc to early intervention.
- **Core Pillars:**
  1. *7 Role-Tailored Operational Cockpits:* Dedicated workspaces for Teacher, Student, Principal, Parent, Admin, Accountant, Transport.
  2. *OmniLoop Proactive MTSS Engine:* Real-time risk evaluation of attendance drops (<80%) and formative grade dips.
  3. *Grounded Zero-PII Socratic AI:* OpenRouter LLM assistant grounded in Grade 10 curriculum with PII masking.

---

### Slide 3: Problem Statement
- **Finding 1: Data Silos & Post-Mortem Academic Failure:** 85% of school ERPs store records in disconnected tables; teachers discover failure only on term-end report cards; subtle warning signs go unnoticed.
- **Finding 2: Unsafe, Leaky & Ungrounded AI Tools:** Ad-hoc use of commercial LLMs exposes student PII; models act as "homework dispensers" without curriculum alignment or safety guardrails.
- **Finding 3: Administrative Friction & Transit Anxiety:** Morning teacher absenteeism triggers 45–60 mins of chaotic phone calls; parents face transit anxiety due to missing live bus telemetry; fee reconciliation is slow and manual.

---

### Slide 4: Objectives of the Project
- **01. Unified Multi-Persona Web Architecture:** 7 responsive cockpits with 100% RBAC isolation on Next.js 15 App Router.
- **02. Automated MTSS Early Warning Pipeline:** Algorithmic risk evaluation flagging attendance and grade drop-offs 4–6 weeks before exams.
- **03. Curriculum-Grounded Zero-PII Socratic AI:** Privacy-preserving tutor enforcing Socratic inquiry without direct homework solutions.
- **04. Campus Operational Automation & Localization:** Proxy teacher dispatching in <10s, SafeRide RFID telematics, live fee collection SQL, and trilingual i18n (EN, HI, KN).

---

### Slide 5: Existing System vs. Proposed System (Comparative Analysis)
- **Structured Matrix across 6 Dimensions:**
  1. *Core Architecture:* Monolithic legacy PHP/.NET vs. Modular TypeScript monorepo with Next.js 15 & Prisma.
  2. *Academic Risk Tracking:* Post-mortem failure reports vs. Real-time OmniLoop MTSS early warning engine.
  3. *AI Integration & Safety:* Ungoverned public LLMs leaking PII vs. Grounded Socratic AI with regex PII scrubber.
  4. *Substitute Allocation:* 45–60 min manual telephone chaos vs. Smart Proxy Dispatcher constraint scoring in <10s.
  5. *Transit Safety:* Static spreadsheets vs. SafeRide live RFID boarding timestamps and fleet telematics.
  6. *User Experience & i18n:* Clunky desktop-only tables vs. Obsidian & Starlight design system, 390px/1440px viewports, and trilingual i18n.

---

### Slide 6: Development Methodology
- **Agile Scrum & Vertical Slice Engineering:** Shipped complete functional slices (DB schema + API + UI) per sprint.
- **Sprint Breakdown:**
  - *Sprint 1:* Foundations & Auth (pnpm monorepo, Prisma schema, SQLite/PostgreSQL compatibility, RBAC session middleware).
  - *Sprint 2:* Signature Core (OmniLoop MTSS rules, OpenRouter AI, curriculum grounding, regex PII scrubber).
  - *Sprint 3:* Baseline Modules (1-click attendance, gradebook, timetable scheduling, AES-256 encrypted counseling vault).
  - *Sprint 4:* Logistics & Fees (Smart proxy dispatcher, SafeRide RFID telematics, real-time fee SQL).
  - *Sprint 5:* Testing & Polish (15 Vitest tests, 10 Playwright E2E tests, trilingual i18n, production deployment).

---

### Slide 7: System Architecture Diagram
- **Visual 4-Tier Enterprise Topology:**
  - *Tier 1: Presentation & Client Layer:* Next.js 15 App Router, React 19, Tailwind v4, 7 Role Cockpits (1440px & 390px).
  - *Tier 2: API Gateway & Security Enforcement:* Route Handlers, session auth, RBAC guard (HTTP 403), two-stage PII scrubber, rate limiter, audit logger.
  - *Tier 3: Core Intelligence & Business Logic:* OmniLoop MTSS engine, Socratic prompt scaffolding, proxy constraint scorer, SafeRide telematics, fee aggregation SQL.
  - *Tier 4: Data Persistence & External AI:* Prisma ORM 5.x, SQLite (dynamic path resolver), PostgreSQL-ready dialect, AES-256 encrypted vault, OpenRouter cloud LLM API.

---

### Slide 8: Database Design & Entity-Relationship (ER) Diagram
- **Prisma Relational Schema Topology (14 Core Entities):**
  - `User` 1:1 `Profile`
  - `Profile` 1:1 `StudentProfile` / `StaffProfile`
  - `StudentProfile` 1:N `MTSSFlag`, `AttendanceRecord`, `GradeRecord`, `FeeRecord`, `BoardingLog`
  - `StaffProfile` 1:N `Timetable`, `Substitution`
  - `BusRoute` 1:N `BoardingLog`
  - `CounselingNote` encrypted via AES-256 with immutable audit trails.
- **Data Integrity Highlights:** Foreign-key cascade rules, automated relational seeding, dynamic SQLite path resolution (`getResolvedDatabaseUrl`).

---

### Slide 9: Data Flow & System Workflows (DFD)
- **Workflow A: OmniLoop MTSS Early Warning Pipeline:**
  1. Attendance (<80%) & Formative Marks (<60%) ingested daily.
  2. Evaluator engine computes composite risk score.
  3. Automated tier escalation: Tier 1 (Universal), Tier 2 (Targeted), Tier 3 (Intensive).
  4. 1-Click intervention plan deployed by teacher with parent notification.
  5. Encrypted audit log committed to database.
- **Workflow B: Zero-PII Socratic AI Query Flow:**
  1. Student submits Grade 10 Science question.
  2. Regex PII scrubber masks names, emails, and phone numbers into pseudo-tokens.
  3. Grounding engine injects official NCERT textbook chapter context.
  4. System prompt enforces Socratic scaffolding (guiding questions, no direct answers).
  5. Step-by-step guidance returned to student client.

---

### Slide 10: Implementation: Key Modules & Algorithms
- **Algorithm 1: OmniLoop MTSS Risk Scoring:**
  - $\text{Risk} = w_{\text{att}} \times (100 - \text{AttRate}) + w_{\text{grade}} \times (100 - \text{AvgGrade}) + w_{\text{trend}} \times \Delta$
  - Weights: $w_{\text{att}} = 0.45, w_{\text{grade}} = 0.35, w_{\text{trend}} = 0.20$.
  - Thresholds: Tier 1 ($<30$), Tier 2 ($30 \le R < 65$), Tier 3 ($\ge 65$).
- **Algorithm 2: Smart Proxy Substitute Dispatcher:**
  - $\text{Score} = (2.0 \times \text{SubjectMatch}) + (1.5 \times \text{FreePeriod}) - (0.8 \times \text{CurrentDailyLoad})$.
  - Sorts candidates descending; top match dispatched in $<10$ seconds.
- **Algorithm 3: Two-Stage Zero-PII Regex Scrubber:**
  - Multi-pattern regex for emails, phone numbers, and named student roll tokens.
  - Guarantees zero sensitive pupil PII is transmitted to third-party model providers.

---

### Slide 11: System Demonstration & Screenshots (Part 1)
- **Embedded Screenshot 1:** `docs/screenshots/07-teacher-deploy-mtss.png`
  - Teacher Cockpit: OmniLoop MTSS Early Warning & 1-Click Intervention Deployment.
- **Embedded Screenshot 2:** `docs/screenshots/08-student-tutor-reply.png`
  - Student Cockpit: Curriculum-Grounded Socratic AI Study Companion (Grade 10 Physics: Snell's Law).

---

### Slide 12: System Demonstration & Screenshots (Part 2)
- **Embedded Screenshot 1:** `docs/screenshots/09-principal-confirm-substitute.png`
  - Principal Cockpit: Smart Proxy Dispatcher with Live Constraint Scoring.
- **Embedded Screenshot 2:** `docs/screenshots/10-transport-boarding.png`
  - Transport Cockpit: SafeRide RFID Student Transit & Fleet Telematics.

---

### Slide 13: Testing Methodology & Experimental Results
- **Unit & Logic Tests (Vitest) — 15/15 Passed (100%):**
  - RBAC security authorization checks (HTTP 403 on forbidden student calls).
  - PII scrubber regex validation (masks unknown names, phone numbers, emails).
  - Substitute constraint scoring and workload balancing.
  - MTSS risk evaluation rules (attendance <80% and grade drop).
  - Counseling note AES-256 encryption and decryption roundtrip.
- **Browser E2E Automation (Playwright) — 10/10 Verified (100%):**
  - Page hydration, persona switcher, MTSS deployment, Socratic AI reply, proxy confirmation, SafeRide boarding, Indic typography (Hindi/Kannada), Cmd+K palette.

---

### Slide 14: GitHub Repository & Source Code Structure
- **Public / University Repository Link:** `https://github.com/anusha770-eng/Schorl_management-`
- **Reproducible Commands:**
  - `git clone <repo-url> && npm install`
  - `npx prisma generate && npm --workspace=packages/database run db:seed`
  - `npm run build && npm --workspace=apps/web run start -- -p 3001`
  - `npm test && npm run e2e`
- **Monorepo Directory Tree:** Visual tree showing `apps/web`, `packages/database`, `packages/shared`, `packages/ui`, `docs`, and `scripts`.

---

### Slide 15: Conclusion & Future Scope
- **Key Achievements:** Transitioned school management from passive record storage to proactive, multi-tiered support; delivered an ethical, curriculum-grounded Socratic AI companion; achieved 100% pass rates across unit and E2E tests.
- **Technical Roadmap:**
  1. *Hardware IoT & CAN-Bus Telematics:* ESP32 RFID card readers and OBD-II vehicle trackers for live SafeRide telematics.
  2. *Offline-First PWA:* IndexedDB synchronization for remote rural schools with intermittent internet.
  3. *Automated Report Cards:* Standardized CBSE/ICSE progress card PDF generation integrating MTSS records.
  4. *Multi-Modal Audio & Voice Tutoring:* Regional speech-to-speech interaction for inclusive learning.

---

### Slide 16: References, Guide Acknowledgments & Thank You
- **Technical Citations:** Next.js 15, React 19, Prisma ORM, AIR MTSS Guidelines, NIST AI RMF, Playwright.
- **Faculty Acknowledgments:** Gratitude to the Project Guide and CSE Department faculty.
- **Closing Banner:** "THANK YOU! Questions & Answers | Prepared to Present and Demonstrate Live at localhost:3001".
