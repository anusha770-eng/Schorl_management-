# Design System & UI Specification: "Aetheris"
**Crafting an Institutional OS with the Precision of Linear, the Polish of Stripe, and the Clarity of Notion**

---

## 1. Design Philosophy & Core Tenets

Traditional school management software feels like an administrative punishment: cluttered data tables, 1990s bevels, harsh primary blues, and slow page reloads.

**Aetheris** redefines enterprise educational software around four core design principles:
1. **Calm Authority & Emotional Restraint:** School life is stressful enough for teachers, parents, and students. The interface uses muted neutral foundations, deep obsidian dark modes, soft luminous accents, and generous whitespace to create a calm, focused workspace.
2. **Keyboard-First Ergonomics:** Inspired by Linear, power users (teachers taking roll call, administrators finding students) should never be forced to reach for the mouse. Global shortcut palette (`Cmd+K`), rapid keybindings (`P` for present, `A` for absent, `Esc` to dismiss), and instant typeahead navigation.
3. **Role-Specific Density:** Dashboards are purpose-built for their human contexts:
   - *Teacher Cockpit:* High-velocity, tabular, density-optimized with inline actions.
   - *Student Portal:* Inspiring, low-stress, distraction-free with clear learning paths and playful micro-animations.
   - *Parent Mobile Hub:* Glanceable, high-reassurance cards, large touch targets, bilingual legibility.
   - *Principal Executive Suite:* Executive analytical narratives, sparklines, and metric summaries.
4. **Delight in the Micro-Details:** Fluid spring animations (Framer Motion), subtle border glows, tactile button presses, smooth skeleton loaders, and thoughtful empty states.

---

## 2. Color System & Semantic Tokens

Aetheris features an ultra-refined, dual-mode color architecture with high-contrast accessibility (exceeding WCAG 2.1 AA 4.5:1 ratios).

### Light Mode ("Parchment & Slate")
- **Canvas / Background:** `#F9FAFB` (Subtle off-white zinc, reducing eye strain)
- **Surface / Card Background:** `#FFFFFF` (Pure white with 1px border `#E5E7EB`)
- **Card Subdued:** `#F3F4F6`
- **Text Primary:** `#111827` (Deep graphite)
- **Text Secondary:** `#4B5563` (Muted slate)
- **Text Muted:** `#9CA3AF`
- **Brand Primary Accent:** `#4F46E5` (Indigo-600: authoritative, intellectual)
- **Brand Primary Lighter:** `#EEF2FF` (Indigo-50)
- **Success / Present:** `#059669` (Emerald-600) / Background `#ECFDF5`
- **Warning / Tier 2 MTSS:** `#D97706` (Amber-600) / Background `#FFFBEB`
- **Critical / Tier 3 / Absent:** `#E11D48` (Rose-600) / Background `#FFF1F2`
- **Border Subtle:** `#E5E7EB`
- **Border Focus:** `#4F46E5` with `0 0 0 3px rgba(79, 70, 229, 0.15)`

### Dark Mode ("Obsidian & Starlight")
- **Canvas / Background:** `#090A0F` (True deep space obsidian)
- **Surface / Card Background:** `#12141C` (Layered dark slate with 1px border `#1F2433`)
- **Card Subdued:** `#181B26`
- **Text Primary:** `#F9FAFB` (Crisp cool white)
- **Text Secondary:** `#94A3B8` (Soft lavender zinc)
- **Text Muted:** `#64748B`
- **Brand Primary Accent:** `#6366F1` (Indigo-500)
- **Brand Primary Glow:** `rgba(99, 102, 241, 0.15)`
- **Success / Present:** `#10B981` (Emerald-500) / Background `rgba(16, 185, 129, 0.1)`
- **Warning / Tier 2 MTSS:** `#F59E0B` (Amber-500) / Background `rgba(245, 158, 11, 0.1)`
- **Critical / Tier 3 / Absent:** `#F43F5E` (Rose-500) / Background `rgba(244, 63, 94, 0.1)`
- **Border Subtle:** `#1F2433`
- **Border Focus:** `#6366F1` with `0 0 0 3px rgba(99, 102, 241, 0.25)`

---

## 3. Typography Scale & Hierarchy

Aetheris uses modern, highly legible variable typefaces with native multilingual rendering:
- **Primary Latin Font:** `Inter` or `Geist Sans` (ultra-clean grotesque, optimized for data-dense interfaces).
- **Display / Brand Font:** `Plus Jakarta Sans` or `Cal Sans` (for executive dashboards, welcome headers).
- **Indic Script Support:** Native fallback to `Noto Sans Devanagari` (Hindi) and `Noto Sans Kannada` (Kannada), calibrated for x-height alignment.
- **Monospace Font:** `JetBrains Mono` or `Geist Mono` (for roll numbers, bus tracking IDs, timestamps, and fee currency figures).

### Typographic Scale
- **Display 1 (Dashboard Greeting):** `32px` (`2rem`), Line-height `1.2`, Weight `700`, Tracking `-0.025em`
- **Heading 1 (Page Title):** `24px` (`1.5rem`), Line-height `1.3`, Weight `600`, Tracking `-0.02em`
- **Heading 2 (Card Header):** `18px` (`1.125rem`), Line-height `1.4`, Weight `600`, Tracking `-0.01em`
- **Heading 3 (Section Header):** `15px` (`0.9375rem`), Line-height `1.4`, Weight `600`
- **Body Regular (Standard):** `14px` (`0.875rem`), Line-height `1.5`, Weight `400`
- **Body Medium (Interactive):** `14px` (`0.875rem`), Line-height `1.5`, Weight `500`
- **Caption / Meta:** `12px` (`0.75rem`), Line-height `1.4`, Weight `400` / `500`
- **Badge / Micro-label:** `11px` (`0.6875rem`), Line-height `1.2`, Weight `600`, Uppercase, Tracking `0.05em`

---

## 4. Spacing, Elevation & Component Geometry

- **Base Unit:** 4px grid system (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `64px`).
- **Corner Radii:**
  - Micro (Badges, tags): `6px` (`rounded-md`)
  - Inputs, Buttons: `8px` (`rounded-lg`)
  - Cards, Modals, Popovers: `12px` (`rounded-xl`)
  - Outer app containers, Large banners: `16px` (`rounded-2xl`)
  - Avatars, Pill status chips: `9999px` (`rounded-full`)
- **Elevation Shadows:**
  - *Flat / Level 0:* `box-shadow: none; border: 1px solid var(--border-subtle)`
  - *Level 1 (Card Hover / Dropdown):* `0 2px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`
  - *Level 2 (Popovers, Flyouts):* `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05)`
  - *Level 3 (Modal / Command Palette):* `0 25px 50px -12px rgba(0,0,0,0.25)`

---

## 5. Motion Rules & Micro-Interactions (Framer Motion)

Motion in Aetheris is functional, snappy, and communicative:
- **Button Click / Tap:** `scale: 0.98` with spring physics `transition: { type: "spring", stiffness: 500, damping: 30 }`
- **Modal & Popover Entrance:** Spring scale from `0.95` to `1.0`, opacity from `0` to `1` (duration `180ms`).
- **List / Table Row Stagger:** Staggered entrance for search results and student lists (`staggerChildren: 0.03`).
- **Tab Transitions:** Layout animation (`layoutId="activeTabPill"`) sliding smoothly under active navigation items.
- **Skeleton Shimmer:** Subtle 1.5s infinite linear gradient wave over `#1E2230` (dark) or `#E5E7EB` (light).

---

## 6. The Command Palette (`Cmd+K`) & Keyboard Shortcuts

Pressing `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) invokes the **Aetheris Omnibox**:
- **Search Scope:** Instant fuzzy search across:
  - Students (by name or roll number, e.g. "Ananya Sharma")
  - Staff (by subject or employee ID, e.g. "Vikram Rathore - Math")
  - Navigation links (e.g. "Take Attendance", "Generate Report Cards", "Transport Map")
  - Quick Actions (e.g. "Toggle Dark Mode", "Switch Language to Kannada", "Create Substitute Proxy")
- **Global Keybindings:**
  - `?`: Toggle Keyboard Shortcuts Cheatsheet
  - `g h`: Go Home (Dashboard)
  - `g a`: Go to Attendance
  - `g t`: Go to Timetable
  - `g m`: Go to MTSS / Early Warning
  - `g s`: Go to Socratic Tutor
  - `Esc`: Close open modal or flyout

---

## 7. Multilingual Architecture & Localization Tokens

The UI supports dynamic trilingual localization (English, Hindi, Kannada) without requiring a browser refresh.
Every text string is mapped to centralized localization dictionaries:
- English: `"Take Attendance"`, `"Holistic Growth Index"`, `"Boarded Safe"`
- Hindi: `"उपस्थिति दर्ज करें"`, `"समग्र विकास सूचकांक"`, `"सुरक्षित सवार"`
- Kannada: `"ಹಾಜರಾತಿ ದಾಖಲಿಸಿ"`, `"ಸಮಗ್ರ ಬೆಳವಣಿಗೆ ಸೂಚ್ಯಂಕ"`, `"ಸುರಕ್ಷಿತವಾಗಿ ಹತ್ತಿದ್ದಾರೆ"`

Typography styles automatically adjust line-height (`+15%` for Kannada and Devanagari scripts) to maintain vertical optical balance.

---

## 8. Role-Specific UX Architecture

### 1. Teacher Cockpit
- **Hero Unit:** "Good morning, Vikram. You have 4 classes today. 1 substitute proxy pending review."
- **Rapid Attendance Matrix:** Interactive table with inline keyboard navigation. Mark 35 students in under 10 seconds.
- **MTSS Early Warning Cards:** Highlights students experiencing conceptual dips with a 1-click button to trigger Socratic Remediation.

### 2. Student Learning Hub
- **Hero Unit:** "Welcome back, Ananya! Today’s Focus: Quadratic Equations in Math."
- **Homework Load Balancer:** Clean timeline bar showing evening workload (e.g., "Tonight's Estimate: 45 mins - Balanced").
- **Socratic AI Tutor Floating Dock:** Persistent conversational tutor ready to guide through homework questions.
- **2-Second SEL Mood Check:** Quick emoji/energy selector logging emotional wellness.

### 3. Parent Mobile Hub
- **Child Switcher:** Smooth sliding toggle between children ("Ananya - 9th Grade", "Arjun - 4th Grade").
- **Transit SafeRide Status:** Visual bus route card with real-time ETA, stop progress, and verified child boarding confirmation badge.
- **Triaged School Feed:** "Action Required" cards (Permission slips, fee receipts) pinned prominently over routine circulars.

### 4. Principal Executive Suite
- **Campus Health Pulse:** Macro indicators: Attendance Rate (96.4%), MTSS Alert Count (12 students in Tier 2), Faculty Workload Index.
- **Morning Substitute Dispatcher:** Visual split-screen showing absent faculty and recommended proxy teachers with constraint satisfaction scores.

### 5. Transport Fleet Command
- **Live Fleet Map & Attendant Manifest:** Dual-pane interface showing bus GPS positions alongside real-time passenger manifest check-ins.
