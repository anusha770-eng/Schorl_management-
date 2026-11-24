# Implementation Plan & Engineering Milestones
## Project: Aetheris School OS

---

## 1. Engineering Team Roles & Distribution

To maintain extreme velocity, architectural integrity, and uncompromising UI quality, work is divided across 4 specialized agent disciplines:

| Agent Role | Primary Focus & Domain Ownership |
| :--- | :--- |
| **Architect & Backend Engineer** | Monorepo structure, database schemas (Prisma), PostgreSQL persistence, REST/tRPC APIs, JWT/session RBAC, OpenRouter LLM streaming pipelines, seed datasets. |
| **Frontend & Design Specialist** | Linear/Notion-grade UI design system, Tailwind tokens, Framer Motion transitions, responsive layouts, 7 role-specific dashboards, Command Palette (`Cmd+K`), trilingual localization. |
| **Full-Stack Feature Engineer** | Implementing the core baseline modules (Admissions, Attendance, Timetable, Exams, Fees, Transport, Library) and the signature innovations (OmniLoop MTSS, Socratic Tutor, Smart Proxy, SafeRide). |
| **QA, Testing & Verification Specialist** | Automated API tests, critical flow validation, visual regression testing via browser screenshots at desktop & mobile viewports, WCAG AA accessibility audit. |

---

## 2. Phase 3 Milestones & Deliverables

### Milestone 1: Monorepo & Environment Foundations
- Set up monorepo workspace (`/apps/web`, `/packages/shared`, `/packages/database` or unified high-performance Next.js 15 App Router architecture with modular domains).
- Configure Tailwind CSS, Lucide icons, Framer Motion, Radix UI primitives, font configurations (Inter, Plus Jakarta Sans, JetBrains Mono, Noto Sans Indic).
- Initialize Prisma schema with all 16 relational entities, PostgreSQL connection (or resilient SQLite fallback for instant zero-dependency execution and reproducibility).
- Create comprehensive seed script with rich, realistic institutional data (school profiles, 7 role accounts, classes, timetables, real syllabus topics, student grades, fee invoices, bus routes).

### Milestone 2: Core Baseline Modules (Engineered to Excellence)
- **Authentication & RBAC:** Multi-role login with 1-click demo switcher between all 7 roles (Admin, Principal, Teacher, Student, Parent, Accountant, Transport).
- **Attendance Cockpit:** Lightning-fast keyboard-first attendance taking with optimistic UI updates.
- **Dynamic Timetable Matrix:** Visual class and teacher schedule view with period conflict detection.
- **Examinations & Gradebook:** Configurable assessment scales, marks entry, and automated calculation of GPA and percentages.
- **Fee Management & Invoicing:** Detailed fee breakdowns, payment status, receipts, and split-payment installment requests.
- **Transport Hub:** Bus routes, stops, and driver assignments.
- **Notices & Communication:** Priority-categorized school circulars with trilingual translations.

### Milestone 3: The Unique Signature Innovation Suite (Fully Working)
1. **OmniLoop MTSS & Early Warning Engine:**
   - Multi-factor Holistic Growth Index calculation.
   - Interactive Tier 1/2/3 intervention cards with recommended remedial actions.
2. **Syllabus-Grounded Socratic AI Tutor ("Aetheris Mentor"):**
   - Active curriculum-anchored conversational interface with step-by-step guidance.
   - Live streaming response integration via OpenRouter LLM API with intelligent fallback.
3. **Autonomous Morning Substitute Dispatcher ("Smart Proxy"):**
   - Constraint-satisfaction matching engine evaluating free periods, subject competency, and workload balance.
   - 1-click proxy assignment with instant timetable updates.
4. **Dual-Verification Safe Transport Ecosystem ("SafeRide"):**
   - Real-time bus telemetry simulator with interactive route map.
   - Attendant boarding manifest with child tap-in verification and instant parent safety pings.
5. **Universal Command Palette (`Cmd+K`):**
   - Instant search across students, staff, navigation links, and quick actions.
6. **Native Trilingual Engine:**
   - Seamless one-click switching between English, Hindi, and Kannada.

### Milestone 4: Verification, Visual QA & Final Polish
- Unit and integration tests for critical business flows (attendance calculation, MTSS risk scoring, substitution constraints, fee balances).
- Visual browser verification: launch browser at desktop (1440x900) and mobile (390x844) viewports.
- Capture screenshots across all 7 role dashboards and signature features.
- Inspect and fix any visual defects, padding misalignments, or contrast issues.
- Package `README.md` with complete installation, environment configuration, and execution instructions.
