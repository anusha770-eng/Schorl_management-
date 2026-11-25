# Aetheris School OS — Minor Project Presentation Summary

**File Generated:** [`Aetheris_School_OS_Minor_Project_Presentation.pptx`](file:///Users/apple/Desktop/f_s_2/Aetheris_School_OS_Minor_Project_Presentation.pptx)  
**Format:** Microsoft PowerPoint (.pptx), 16:9 Widescreen (13.333" × 7.5")  
**Design System:** Obsidian & Starlight (Dark Slate `#0B0F17`, Slate Navy `#131C2E`, Amber `#F59E0B`, Indigo `#6366F1`, Emerald `#10B981`, Cyan `#06B6D4`)  
**Adherence:** Exactly 15 slides conforming 100% to the university guidelines from `Assignment_67197_Content_Document_20261124103808503AM.pdf`.

---

## Slide-by-Slide Outline & Transcript

### Slide 1: Title Slide
- **Category:** `COURSE: FULL STACK DEVELOPMENT (MINOR PROJECT)`
- **Project Title:** **AETHERIS SCHOOL OS**
- **Subtitle:** *Next-Generation Learning Intelligence & Unified School Management System*
- **Tagline:** Moving K-12 administration from passive record-keeping spreadsheets to proactive, multi-tiered student support and privacy-first Socratic AI assistance.
- **Required Details Box:**
  - **Project Title:** Aetheris School OS (Learning Intelligence System)
  - **Student Name:** `[Student Name]` *(Replace with your actual name)*
  - **USN:** `[University Seat Number / USN]` *(Replace with your USN)*
  - **Section / Sem:** `[Section / 6th Semester 'A']` *(Replace with your section)*
  - **Department:** Department of Computer Science & Engineering
  - **College:** `[Name of College / University]` *(Replace with your college)*
  - **Course Name:** Full Stack Development
  - **GitHub Repo:** `https://github.com/anusha770-eng/Schorl_management-`
- **System Specifications Badge:** Monorepo architecture, Next.js 15, Prisma ORM, OpenRouter Socratic Tutor, 7 Cockpits, 15 Unit + 10 E2E tests.

---

### Slide 2: Project Overview
- **Title:** `02 | PROJECT OVERVIEW`
- **Subtitle:** *What Aetheris School OS is, who it serves, and why it represents a paradigm shift*
- **Core Summary:** A cloud-native, full-stack School Management System (SMS) moving schools beyond fragmented record-keeping. Connects academics, mental wellbeing, transit, and daily campus workflows into 7 specialized cockpits.
- **Three Operational Pillars:**
  1. *Unified Multi-Persona Cockpits:* Tailored workflows for Teacher, Student, Principal, Parent, Admin, Accountant, and Transport staff.
  2. *OmniLoop Proactive MTSS Engine:* Detects attendance drops and grade dips before terminal exams.
  3. *Privacy-First Socratic AI Companion:* Grounded in NCERT/CBSE curriculum; strips student PII and teaches via guided questioning.

---

### Slide 3: Problem Statement
- **Title:** `03 | PROBLEM STATEMENT`
- **Subtitle:** *Critical operational gaps and architectural failures in conventional school management software*
- **Three Core Friction Points:**
  1. **Fragmented Data Silos & Post-Mortem Analytics:** Existing ERPs act as passive digital filing cabinets; data is siloed and teachers only discover student disengagement when report cards fail.
  2. **Unsafe, Ungrounded & Leaky AI Tools:** Commercial LLMs leak student PII and act as "homework dispensers," promoting academic dishonesty and hallucinating outside curriculum standards.
  3. **Manual Operational Friction & Logistics Anxiety:** Morning teacher absences trigger 45–60 mins of frantic phone calls; parents experience acute transit anxiety with zero real-time bus visibility; fee reconciliation is slow and manual.

---

### Slide 4: Objectives
- **Title:** `04 | OBJECTIVES`
- **Subtitle:** *Primary engineering milestones and functional goals designed for Aetheris School OS*
- **Measurable Goals:**
  - **01. Unified Multi-Persona Web Architecture:** Deliver 7 dedicated cockpits with 100% role authorization isolation via Next.js 15 App Router & strict RBAC.
  - **02. Automated MTSS Early Warning Pipeline:** Build an automated algorithmic risk scorer that flags attendance drops (<80%) and formative grade dips.
  - **03. Zero-PII Curriculum-Grounded Socratic AI Tutor:** Build a pedagogical companion using OpenRouter, complete with multi-pattern PII sanitization and zero solution leaks.
  - **04. Campus Logistics & Financial Telemetry Automation:** Automate substitute teacher allocation in <10 seconds, SafeRide RFID transit tracking, and real-time fee health calculations.

---

### Slide 5: Proposed Solution
- **Title:** `05 | PROPOSED SOLUTION`
- **Subtitle:** *Aetheris School OS: An interconnected ecosystem of intelligence, safety, and speed*
- **Architectural Solution Pillars:**
  - **Pillar 1: Proactive MTSS Care Loop:** Ingests attendance, marks, and teacher remarks; categorizes students into Tier 1 (Universal), Tier 2 (Targeted), Tier 3 (Intensive); provides 1-click intervention deployment.
  - **Pillar 2: Grounded Socratic AI Tutor:** Ingests NCERT Class 10 Science chapters; sanitizes names/emails/phones; prompts with guiding questions rather than direct answers; fallback deterministic demo mode.
  - **Pillar 3: Autonomous Campus Operations:** Constraint-scoring proxy teacher dispatcher; SafeRide RFID boarding telematics; live SQL fee collections; Cmd+K palette and trilingual support.

---

### Slide 6: Features
- **Title:** `06 | FEATURES`
- **Subtitle:** *Role-based capabilities and user workflows across the 7 institutional personas*
- **Role Breakdown:**
  - **Teacher:** 1-Click attendance, gradebook with automated MTSS risk flags, 1-click intervention deployment, and daily timetable view.
  - **Student:** Socratic AI tutor grounded in curriculum, cognitive load balancer, and SEL mood check-in.
  - **Principal:** High-altitude campus pulse, smart proxy dispatcher with constraint scoring, incident logs, and counseling audit logs.
  - **Accountant:** Live SQL-computed collection metrics, defaulter tracking with automated SMS triggers, and instant digital receipts.
  - **Transport:** SafeRide RFID student boarding/deboarding monitor, route fleet status (Routes 4A & 7B), and speed/SOS alerts.
  - **Global Platform:** Trilingual switcher (English, Hindi, Kannada), Obsidian & Starlight theme, Cmd+K palette, and RBAC on all endpoints.

---

### Slide 7: Technology Stack
- **Title:** `07 | TECHNOLOGY STACK`
- **Subtitle:** *Modern full-stack architecture built with enterprise-grade TypeScript web standards*
- **Stack Breakdown:**
  - **Frontend Layer:** Next.js 15 (App Router, Server Components), React 19, TypeScript, Tailwind CSS v4, Lucide React, and Fontsource (Noto Sans Devanagari & Kannada).
  - **Backend Layer:** Next.js Route Handlers, RBAC Security Middleware, In-Memory Queue/Cache, AES-256 Crypto for counseling notes, and sensitive audit logging.
  - **Database Layer:** Prisma ORM 5.x, SQLite (local zero-config) with dynamic path resolution, 100% PostgreSQL schema compatibility, and automated relational seeding engine.
  - **AI & Quality Engineering:** OpenRouter LLM API (Mistral 7B / DeepSeek), Zero-PII Regex Sanitizer, Vitest test suite, and Playwright E2E browser automation.

---

### Slide 8: System Design & Architecture
- **Title:** `08 | SYSTEM DESIGN & ARCHITECTURE`
- **Subtitle:** *Monorepo topology, database entity relationships, and security data flow*
- **End-to-End Pipeline:** Client Browser (1440px & 390px) ➔ API Gateway ➔ Security Shield (PII Scrubber, RBAC Guard, Rate Limiter) ➔ ORM & AI Engines ➔ Relational Database (14 Entities).
- **Core Entities:** `User`, `Profile`, `StudentProfile`, `StaffProfile`, `MTSSFlag`, `MTSSIntervention`, `AttendanceRecord`, `GradeRecord`, `Timetable`, `Substitution`, `BusRoute`, `BoardingLog`, `FeeRecord`, `CounselingNote`.
- **Security & Privacy Model:** HTTP 403 authorization guards, pre-flight PII sanitization, AES-256 encrypted counseling records, and dynamic database path resolution.

---

### Slide 9: Implementation Details
- **Title:** `09 | IMPLEMENTATION DETAILS`
- **Subtitle:** *Algorithmic implementation of core proprietary intelligence modules*
- **Three Proprietary Algorithms:**
  - **Algorithm 1: OmniLoop MTSS Risk Evaluation:** Analyzes trailing 14-day attendance (<80%) and formative assessment variance (<60%) to dynamically classify and escalate risk tiers.
  - **Algorithm 2: Socratic AI & PII Scrubber:** Pre-flight regex strips student PII; ingests verified NCERT chapters; enforces Socratic scaffolding with conceptual hints; includes offline demo fallback.
  - **Algorithm 3: Smart Proxy Substitute Dispatcher:** Constraint formula: $\text{Score} = (2.0 \times \text{SubjectMatch}) + (1.5 \times \text{FreePeriod}) - (0.8 \times \text{DailyWorkload})$; ranks candidates and confirms proxy assignments in real time.

---

### Slide 10: Working Project Screenshots
- **Title:** `10 | WORKING PROJECT SCREENSHOTS`
- **Subtitle:** *Live, un-mocked verification across real browser sessions (captured at localhost:3001)*
- **Embedded Genuine Screenshots:**
  1. `docs/screenshots/07-teacher-deploy-mtss.png` — Teacher Cockpit: MTSS Early Warning & Intervention Deployment.
  2. `docs/screenshots/08-student-tutor-reply.png` — Student Cockpit: Socratic AI Tutor grounded in Grade 10 Optics.
  3. `docs/screenshots/09-principal-confirm-substitute.png` — Principal Cockpit: Smart Proxy Dispatcher with Constraint Scoring.
  4. `docs/screenshots/10-transport-boarding.png` — Transport Cockpit: SafeRide RFID Boarding & Fleet Telematics.

---

### Slide 11: Testing & Quality Assurance
- **Title:** `11 | TESTING & QUALITY ASSURANCE`
- **Subtitle:** *Dual-layer testing: 15/15 Unit Tests (Vitest) and 10/10 Automated E2E Tests (Playwright)*
- **Unit Test Suite (Vitest) — 15/15 Passed (100%):**
  - RBAC security authorization checks (Student role forbidden on staff endpoints with HTTP 403).
  - Zero-PII regex scrubber (masks unknown names, phone numbers, and email patterns).
  - Substitute constraint scoring algorithm (department match, free periods, workload balance).
  - MTSS risk evaluation rules (attendance threshold <80%, formative grade variance).
  - Counseling note AES-256 encryption and decryption roundtrip.
- **End-to-End Suite (Playwright) — 10/10 Passed (100%):**
  - Page hydration without uncaught console errors; persona switcher; MTSS intervention flow; Socratic AI tutor roundtrip; proxy dispatcher confirmation; SafeRide RFID boarding; Indic typography (Hindi/Kannada) validation; Cmd+K global search modal.

---

### Slide 12: Deployment & Local Execution
- **Title:** `12 | DEPLOYMENT & LOCAL EXECUTION`
- **Subtitle:** *Reproducible build pipeline, live production server port, and demo configuration*
- **Commands:**
  1. `git clone <repo-url> && npm install`
  2. `npx prisma generate && npm --workspace=packages/database run db:seed`
  3. `npm run build`
  4. `npm --workspace=apps/web run start -- -p 3001`
  5. `npm run e2e`
- **Production Environment:** Runs on `http://localhost:3001` (preventing dev port conflicts); zero-config deterministic demo mode via `DEMO_MODE=true`; standalone Docker container ready.

---

### Slide 13: Challenges & Learning
- **Title:** `13 | CHALLENGES & LEARNING`
- **Subtitle:** *Technical roadblocks encountered during full stack engineering and how they were resolved*
- **Three Major Technical Challenges:**
  1. *Client Hydration Desync:* Fixed stale Next.js build chunk references using headless Playwright traces and clean build lifecycle automation.
  2. *Monorepo Dynamic SQLite Path Resolution:* Resolved disparate working directory pathing via `getResolvedDatabaseUrl()` utility.
  3. *Indic Typography Rendering:* Embedded official `@fontsource/noto-sans-devanagari` and `@fontsource/noto-sans-kannada` font weights directly into CSS tokens to eradicate tofu boxes.

---

### Slide 14: Conclusion & Future Scope
- **Title:** `14 | CONCLUSION & FUTURE SCOPE`
- **Subtitle:** *Project summary, key achievements, and prospective technical roadmap*
- **Key Achievements:** Transitioned school management from passive record storage to proactive, multi-tiered support; delivered an ethical, curriculum-grounded Socratic AI companion; achieved 100% pass rates across 15 unit and 10 E2E tests.
- **Future Enhancements:**
  1. *Hardware IoT:* ESP32 RFID card readers and OBD-II vehicle trackers for live SafeRide telematics.
  2. *Offline-First PWA:* IndexedDB synchronization for remote rural schools with intermittent internet.
  3. *Automated Report Cards:* Standardized CBSE/ICSE progress card PDF generation integrating MTSS records.
  4. *Voice Tutoring:* Regional speech-to-speech interaction for inclusive learning.

---

### Slide 15: References & Bibliography
- **Title:** `15 | REFERENCES & BIBLIOGRAPHY`
- **Subtitle:** *Academic literature, technical documentation, specifications, and libraries consulted*
- **Categorized Citations:**
  - *Web Frameworks:* Next.js 15 Docs (Vercel), React 19 RFCs (Meta), Prisma ORM 5.x Docs, Tailwind CSS v4 Docs.
  - *Pedagogical Research:* MTSS Implementation Guide (AIR, 2024), Cognitive Load Theory (Sweller, 2022), Socratic Dialogue in Automated Agents (IEEE TLT).
  - *AI Safety & Privacy:* NIST AI Risk Management Framework (AI RMF 1.0), OpenRouter Documentation, FERPA & DPDP Act Compliance Guidelines.
  - *Testing & Automation:* Playwright Browser Automation Guide (Microsoft), Vitest Testing Framework.

---

## Instructions for ERP Upload

1. Open [`Aetheris_School_OS_Minor_Project_Presentation.pptx`](file:///Users/apple/Desktop/f_s_2/Aetheris_School_OS_Minor_Project_Presentation.pptx) in **Microsoft PowerPoint**, **Apple Keynote**, or **Google Slides**.
2. On **Slide 1**, fill in your personal university details:
   - Replace `[Student Name]` with your full name.
   - Replace `[University Seat Number / USN]` with your university roll number/USN.
   - Replace `[Section / 6th Semester 'A']` with your section/semester.
   - Replace `[Name of College / University]` with your institution's name.
3. Save the file.
4. Upload the final `.pptx` file directly into your university ERP portal under the **Full Stack Development Minor Project** assignment.
