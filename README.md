# Aetheris School OS
**The Next-Generation Adaptive School Management & Learning Intelligence Operating System**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 1. Quick Start & Prerequisites

### Environment Setup
- **Node.js:** v18+ (tested on Node v26)
- **Package Manager:** npm (v10+)
- **Database:** SQLite (local zero-dependency development via Prisma, 100% PostgreSQL schema compatible)

```bash
# 1. Install dependencies across monorepo workspaces
npm install

# 2. Generate Prisma Client & push schema to local database
npm run db:generate
npm run db:push

# 3. Seed realistic institutional dataset (7 roles, classes, grades, bus routes, syllabus)
npm run db:seed

# 4. Run automated test suite
npm test

# 5. Start development server
npm run dev
```

The web application runs at `http://localhost:3000`.

---

## 2. Environment Variables

Create `.env` inside `apps/web/.env` (or copy `.env.example`):

```ini
DATABASE_URL="file:../../packages/database/dev.db"
ENCRYPTION_SECRET_KEY="aetheris_super_secret_min_32_bytes_2026"
JWT_SECRET="aetheris_jwt_secret_token_secure_2026"
# Optional: Set OpenRouter API Key for live LLM streaming.
# If omitted or empty, Aetheris automatically runs in resilient Socratic Demo Mode.
OPENROUTER_API_KEY=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 3. Seven Demo Accounts (All Roles Pre-Configured)

All accounts share the default password: **`Aetheris@2026`**.  
*Alternatively, use the 1-click Demo Switcher in the UI to instantly jump between any role without re-typing credentials!*

| Role | Demo Email | Persona & Context |
| :--- | :--- | :--- |
| **Admin** | `admin@aetheris.edu` | **Aditi Rao** – System administration, audit logs, school settings. |
| **Principal** | `principal@aetheris.edu` | **Dr. Sunita Kulkarni** – Executive campus pulse, MTSS oversight, smart proxy substitute approvals, confidential pastoral records. |
| **Teacher** | `teacher@aetheris.edu` | **Vikram Rathore** (Math) – High-velocity attendance cockpit, gradebook entry, MTSS Tier 1/2 action cards, AI remark drafts. |
| **Student** | `student@aetheris.edu` | **Ananya Sharma** (Grade 9-A) – Daily timetable, curriculum-grounded Socratic AI Tutor, homework equilibrium, SafeRide bus tracker. |
| **Parent** | `parent@aetheris.edu` | **Meera Iyer** – Multi-child switcher (Ananya & Arjun), dual-verification SafeRide transit alerts, fee installments, trilingual notices (Kannada/Hindi/English). |
| **Accountant** | `accountant@aetheris.edu` | **Suresh Nair** – Invoicing, fee collections, respectful installment workflows, financial ledgers. |
| **Transport** | `transport@aetheris.edu` | **Ramesh Gowda** – Bus Route 4 supervisor, attendant student QR boarding manifest, live route status. |

---

## 4. Architecture & Monorepo Topology

```
f_s_2/
├── apps/
│   └── web/                   # Next.js 15 App Router application (Frontend + API Routes)
│       ├── app/               # Page routes & REST APIs
│       ├── components/        # Linear/Notion-grade UI design system components
│       ├── lib/               # Auth, JWT, session, DB client helpers
│       └── test/              # Automated test suites (Node native test runner)
├── packages/
│   ├── shared/                # Common TypeScript interfaces, DTOs, in-memory cache, encryption
│   └── database/              # Prisma ORM schema, migrations, and realistic seed data
├── docs/                      # PRD, Architecture, Design System, Implementation Plan
└── research/                  # Market gap report and competitor analyses
```

---

## 5. Security, Privacy & Minors' Data Protection
1. **Confidential Record Partitioning:** Clinical counseling notes are encrypted with **AES-256-GCM** at rest and strictly restricted to the Principal and Pastoral Counselor roles.
2. **Audit Logging:** Every read and write of sensitive records produces an immutable audit trail (`AuditLog`).
3. **No PII Sent to LLMs:** The Socratic AI Tutor scrubs student names, admission numbers, and contact details, using tokenized anonymous context (`Student_A`, `Curriculum_Topic`).
4. **Rate Limiting:** Auth endpoints (10/min) and AI Tutor queries (30/min) are actively protected by rate limiters.
