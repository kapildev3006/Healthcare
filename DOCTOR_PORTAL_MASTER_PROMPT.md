# AI HEALTHCARE — DOCTOR PORTAL MASTER IMPLEMENTATION PROMPT

You are implementing the complete **Doctor Portal frontend** of the existing **AI Healthcare** project.

This is not a new project. Before changing anything, read and follow the existing project documentation and current repository state.

## 0. SOURCE OF TRUTH — READ FIRST

Before writing code, inspect these files:

- `AGENTS.md`
- `FINAL.md`
- `CURRENT.md`
- root `README.md`

Also inspect:

- `hospital/`
- `design-references/hospital/doctor/`
- existing theme/configuration/components
- existing package dependencies

Do not assume the project structure from memory.

The visual source of truth is:

`design-references/hospital/doctor/`

Every reference image in this folder must be inspected before implementing its corresponding page.

---

# 1. IMPORTANT PROJECT BOUNDARIES

## Frontend only

Implement only:

`hospital/`

Do NOT implement or modify production backend or AI services.

Do NOT modify:

- `patient/`
- `system-admin/`
- `backend/api/`
- `backend/ai/`

unless a small shared documentation update is explicitly required.

Maintain:

`FRONTEND_APPROVED: false`

Backend and AI production integration remain locked.

Use realistic typed mock data for all frontend flows.

---

# 2. DOCTOR PORTAL TECHNOLOGY

The Doctor Portal is a **desktop-first responsive web application**, NOT a mobile application.

Use the existing `hospital/` Next.js project.

Preferred stack:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Radix UI where useful
- Lucide icons
- Framer Motion for subtle purposeful interaction
- Recharts for dashboard visualizations if charts are required
- React Hook Form + Zod if form handling is needed

Do not add unnecessary libraries.
Do not introduce another CSS framework.

---

# 3. VISUAL RULE — EXTREMELY IMPORTANT

The existing Doctor Portal visual language is now **LOCKED**.

All pages must look like they belong to the exact same product.

Never redesign individual pages independently.

Use the Doctor Dashboard / Patient Search references as the primary shell reference.

Maintain consistently:

- MediLink branding
- same sidebar width
- same top header height
- same page content spacing
- same blue/white medical palette
- same typography hierarchy
- same border radius
- same shadows
- same card treatment
- same table styling
- same icon style
- same status badge styles
- same search bar
- same doctor account header
- same hospital identity block
- same responsive breakpoints

Do not change the theme from page to page.

---

# 4. LOCKED DOCTOR SIDEBAR

This navigation is final.

Use this exact order on every Doctor Portal page:

## MAIN

1. Dashboard
2. Patient Search
3. Emergency Lookup
4. My Patients

## CLINICAL

5. Encounters
6. Reports
7. AI Analysis

## ACCESS & ACTIVITY

8. Access Requests
9. Notifications

## ACCOUNT

10. Profile & Settings

Rules:

- Do not add random top-level sidebar pages.
- Do not rename items.
- Do not change their order.
- Only the current page should be highlighted.
- Use consistent icons across all pages.
- `Appointments`, `Lab Reports`, `Radiology`, `Prescriptions`, etc. are NOT separate top-level sidebar items.

Those features should exist inside the relevant clinical workflows.

---

# 5. GLOBAL DOCTOR PORTAL SHELL

Create reusable components rather than duplicating layout code.

Suggested architecture:

```text
hospital/src/
├── app/
│   └── doctor/
├── components/
│   ├── doctor/
│   │   ├── doctor-sidebar.tsx
│   │   ├── doctor-header.tsx
│   │   ├── doctor-shell.tsx
│   │   ├── patient-summary-card.tsx
│   │   ├── status-badge.tsx
│   │   ├── page-header.tsx
│   │   ├── data-table.tsx
│   │   ├── empty-state.tsx
│   │   ├── loading-state.tsx
│   │   └── ...
├── features/
│   └── doctor/
│       ├── dashboard/
│       ├── patients/
│       ├── emergency/
│       ├── encounters/
│       ├── reports/
│       ├── ai/
│       ├── access/
│       ├── notifications/
│       └── profile/
├── lib/
├── mocks/
└── types/
```

You may adapt this structure if the current repository already has a good architecture.
Do not restructure working code unnecessarily.

---

# 6. REFERENCE SCREENS TO IMPLEMENT

Inspect the actual files inside:

`design-references/hospital/doctor/`

Implement every available Doctor Portal reference.

Canonical screens include:

- `login.png`
- `dashboard.png`
- `patient-search.png`
- `emergency-lookup.png`
- `my-patients.png`
- `encounters.png`
- `encounter-detail.png`
- `patient-medical-profile.png`
- `patient-medical-history.png`
- `create-new-encounter.png`
- `doctor-diagnosis-entry.png`
- `ai-vs-doctor-comparison.png`
- `orders-prescriptions.png`
- `reports.png`
- `report-detail.png`
- `ai-analysis.png`
- `ai-explainability.png`
- `access-requests.png`
- `emergency-break-glass.png`
- `notifications.png`
- `profile-settings.png`

## Screen requirements

### Login
Doctor authentication UI only. No real auth backend.

### Dashboard
Include doctor greeting, hospital info, patient metrics, appointments, emergency cases, pending reports, quick actions, emergency alerts, AI insights, charts, and recent activity.

### Patient Search
Include search by name/UHID/Health ID/phone, advanced filters, result table, access-state badges, recent searches, emergency lookup shortcut, and access-request shortcut.

### Emergency Lookup
Include patient lookup, QR where referenced, identity verification, blood group, allergies, conditions, medications, recent encounters/reports, emergency-only warnings, and audit messaging.

### My Patients
Include authorized/assigned patients, filters, condition summaries, follow-up state, and view-patient actions.

### Encounters
Include all encounters, time filters, encounter type, department, status, diagnosis/reason, pagination, recent encounters, upcoming encounters, and New Encounter.

### Encounter Detail
Include patient header, encounter metadata, chief complaint, HPI, medical/social/family history, exam findings, and tabs for vitals, diagnosis, meds, reports, notes, and attachments.

### Patient Medical Profile
Include demographics, emergency contact, clinical summary, conditions, vitals, meds, allergies, lifestyle, family history, recent encounters/reports, and AI risk insight.

### Patient Medical History
Include chronological timeline, filters, encounters/tests/admissions/emergencies, conditions, allergies, and quick record access.

### Create New Encounter
Implement multi-step frontend workflow:
1. Encounter Details
2. Clinical Assessment
3. Diagnosis & Plan
4. Review & Save

Allow Save Draft, Next, Previous, Review, and mock final save.

### Doctor Diagnosis Entry
Include primary/secondary diagnosis, diagnosis type, treatment plan, follow-up, AI suggestions, and clinical guideline support.

AI is advisory only and must never auto-override the doctor.

### AI vs Doctor Comparison
Include AI suggestions, doctor diagnosis, confidence, inconsistency alerts, differential suggestion, Add to Diagnosis, Dismiss, and reasoning/evidence.

### Orders & Prescriptions
Include labs, imaging, procedures where shown, prescriptions, dosage, frequency, duration, selected orders, AI suggestions, and workflow navigation.

### Reports
Include counts, categories, filters, report table, insights, recent uploads, and quick actions.

### Report Detail
Include patient info, report metadata, report viewer, results, key findings, related encounter/history, AI Analysis CTA, download/share/print actions.

### AI Analysis
Include medical image/report, AI findings, confidence, impression, recommendations, model metadata, patient/report context, and Explainability CTA.

AI output must be labeled as decision support, not final diagnosis.

### AI Explainability / Grad-CAM
Include original image, heatmap, legend, highlighted region, prediction, confidence, region insights, model explanation, visual patterns, and clinical-correlation note.

### Access Requests
IMPORTANT: this is the doctor version.

Correct consent flow:

Doctor → sends request → Patient approves/denies → Doctor sees status.

Doctor does NOT approve or deny the patient’s consent request.

Include:
- New Access Request
- patient selector
- scope
- purpose/reason
- duration
- Send Request
- Pending
- Approved
- Denied
- Expired/Revoked
- sent/response/expiry timestamps
- View Patient only when access is valid

### Emergency Break-Glass
Separate this from normal consent.

Include:
- emergency warning
- patient lookup
- reason
- scope
- duration
- optional details
- mandatory emergency confirmation
- Request Emergency Access
- recent emergency access logs
- audit notice
- patient notification notice

Emergency access must be temporary, limited, logged, audited, and patient-notified.

### Notifications
Include events such as patient approval/denial, pending/expiring access, lab results, AI alerts, patient updates, and system updates.

### Profile & Settings
Include doctor profile, professional details, medical council ID, specialization, hospital/department, availability, preferences, security, integrations, notifications, data/privacy, password, 2FA, devices, and logout.

---

# 7. MOCK DATA ARCHITECTURE

Do not hardcode large mock objects directly inside page components.

Suggested files:

```text
hospital/src/mocks/doctor.ts
hospital/src/mocks/patients.ts
hospital/src/mocks/encounters.ts
hospital/src/mocks/reports.ts
hospital/src/mocks/access-requests.ts
hospital/src/mocks/notifications.ts
hospital/src/mocks/ai-analysis.ts
```

Create typed models for:

- Doctor
- Hospital
- Patient
- Encounter
- Diagnosis
- Prescription
- LabOrder
- ImagingOrder
- MedicalReport
- AccessRequest
- EmergencyAccess
- Notification
- AIAnalysis
- AIExplainabilityResult

Keep identities and medical data consistent across all screens.

---

# 8. INTERACTIONS MUST WORK

Do not build static screenshot pages only.

Implement frontend interactions for:

- sidebar navigation
- search
- filters
- tabs
- pagination
- dropdowns
- forms
- New Encounter
- Save Draft
- access-request creation
- emergency confirmation
- notifications
- profile/settings
- AI tabs
- report navigation
- dialogs/modals
- toast/snackbar feedback

If a destination screen does not exist, use a clean modal/toast instead of a broken link.

---

# 9. ROUTING

Use clean routes such as:

```text
/doctor/login
/doctor/dashboard
/doctor/patients/search
/doctor/patients
/doctor/patients/[patientId]
/doctor/patients/[patientId]/history
/doctor/emergency
/doctor/encounters
/doctor/encounters/new
/doctor/encounters/[encounterId]
/doctor/encounters/[encounterId]/diagnosis
/doctor/encounters/[encounterId]/comparison
/doctor/encounters/[encounterId]/orders
/doctor/reports
/doctor/reports/[reportId]
/doctor/ai-analysis/[reportId]
/doctor/ai-analysis/[reportId]/explainability
/doctor/access-requests
/doctor/notifications
/doctor/settings
```

You may adjust exact URLs to fit the existing architecture, but keep them consistent and logical.

---

# 10. RESPONSIVENESS

Primary target: desktop/laptop hospital workstation.

Also support 1440px+, 1280px, 1024px, and reasonable tablet widths.

On smaller widths:
- collapse sidebar
- preserve table usability
- allow horizontal scrolling where necessary
- prevent overflow

---

# 11. ACCESSIBILITY

Implement keyboard navigation, visible focus, semantic HTML, labels, adequate contrast, alt text, and correct ARIA usage.

Do not rely on color alone for clinical status.

---

# 12. CLINICAL SAFETY UI RULES

Clearly distinguish doctor-entered information from AI-generated decision support.

Use explicit labels such as:
- AI Suggestion
- AI Analysis
- Decision Support
- Confidence
- Requires Clinical Review

Never imply AI independently diagnosed or prescribed treatment.
Final clinical decisions belong to the doctor.

Emergency actions must always show warning/audit messaging.

---

# 13. CODE QUALITY

Requirements:

- strict TypeScript
- reusable components
- no giant monolithic page files
- no duplicated shell code
- no duplicated mock datasets
- no console errors
- no hydration warnings
- no broken imports
- no dead navigation
- avoid `any`
- readable naming
- modular feature structure

---

# 14. BUILD ORDER

Implement in this order:

### Stage 1 — Shared Shell
Theme, layout, sidebar, header, common cards, tables, badges, empty/loading/error states.

### Stage 2 — Core Navigation
Login, Dashboard, Patient Search, My Patients.

### Stage 3 — Patient Clinical View
Patient Profile, Medical History, Emergency Lookup.

### Stage 4 — Encounters
Encounters, Encounter Detail, Create Encounter, Diagnosis Entry, AI vs Doctor Comparison, Orders & Prescriptions.

### Stage 5 — Reports + AI
Reports, Report Detail, AI Analysis, Explainability.

### Stage 6 — Consent & Emergency
Access Requests, Emergency Break-Glass.

### Stage 7 — Doctor Account
Notifications, Profile & Settings.

### Stage 8 — Polish
Responsive, empty/loading/error states, interaction refinement.

Do not stop after each stage to ask for approval.
Complete the whole Doctor Portal frontend in one implementation run.

---

# 15. VERIFICATION

Do NOT launch Android Emulator.
This is a web portal.

After implementation run:

```bash
cd hospital
npm run lint
npm run build
```

Also run any existing test suite if configured.

Fix all TypeScript, lint, build, import, and hydration errors.

---

# 16. VISUAL VERIFICATION

Run the Hospital Portal locally and inspect representative pages.

At minimum verify:

- Dashboard
- Patient Search
- Patient Profile
- Encounter Detail
- Reports
- AI Analysis
- Access Requests
- Emergency Break-Glass
- Notifications
- Profile & Settings

Compare against corresponding files in:

`design-references/hospital/doctor/`

Correct obvious mismatches in sidebar, widths, spacing, cards, typography, buttons, tables, badges, header, and colors.

Do not claim pixel-perfect unless actually verified.

---

# 17. CURRENT.md UPDATE

When complete, update `CURRENT.md` with:

- implementation date
- completed screens
- routes
- reusable components
- dependencies added
- build result
- lint result
- known limitations
- remaining Hospital Admin work
- `FRONTEND_APPROVED: false`

Do not mark frontend globally approved unless explicitly approved by the user.

---

# 18. WALKTHROUGH

Create/update walkthrough documentation covering:

- implemented routes
- page-to-reference mapping
- important interactions
- mock-data strategy
- access-request consent flow
- emergency break-glass flow
- AI/doctor responsibility boundaries
- verification results

---

# 19. DO NOT DO THESE

Do NOT:

- implement backend APIs
- implement PostgreSQL
- implement Prisma production models
- implement real authentication
- implement real AI inference
- modify Patient Flutter app
- modify System Admin portal
- change the locked sidebar
- create random top-level routes
- redesign away from references
- regenerate reference images
- introduce a second design system
- use fake remote APIs
- hardcode everything in one file
- stop midway waiting for approval
- run Android Emulator
- claim tests passed unless actually run

---

# 20. DEFINITION OF DONE

Doctor Portal frontend is complete when:

- every Doctor Portal reference screen is implemented
- routes are connected
- locked sidebar is consistent
- shared shell is reused
- interactions work with mock data
- access-request flow is logically correct
- emergency break-glass flow is clearly separated
- AI outputs are clearly advisory
- layouts are responsive
- no major overflow issues exist
- `npm run lint` passes
- `npm run build` passes
- `CURRENT.md` is updated
- no backend/AI production work was performed

At completion, provide one concise implementation report containing:

1. Screens implemented
2. Routes created
3. Components created
4. Interactions implemented
5. Validation/build results
6. Remaining known limitations
7. Exact recommended next task: **Hospital Admin Portal reference-driven implementation**

Start by auditing the current repository and all Doctor Portal reference images, then implement the entire Doctor Portal frontend from start to finish.
