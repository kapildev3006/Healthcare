# AGENTS.md — AI Healthcare Project Execution Contract

> This file is the primary execution guide for Google Antigravity (or any coding agent) working in this repository.
> The project must be built incrementally, verified after every meaningful task, and kept aligned with `FINAL.md` and `CURRENT.md`.

---

## 0. Mission

Build a production-style final-year project called **AI Healthcare**: a secure health identity and longitudinal medical record platform with emergency access and AI-assisted medical report analysis.

The product combines:

1. **Emergency Health Identity / Health Card**
2. **Longitudinal Patient Medical Records**
3. **Patient Consent + Emergency Break-Glass Access**
4. **Hospital / Doctor Access**
5. **Medical Encounter History**
6. **AI Clinical Decision Support**
7. **Explainable AI**
8. **Auditability and Security**

AI is **decision support, not decision replacement**. The product must never present AI output as a final diagnosis or treatment instruction.

---

# 1. Source of Truth Files

Before doing ANY work, read these files in this exact order:

1. `FINAL.md`
2. `CURRENT.md`
3. `AGENTS.md`
4. Any referenced UI images inside `design-references/`

### `FINAL.md`
Defines the target product and final acceptance criteria.

Rules:
- Treat `FINAL.md` as the product contract.
- Do not silently change product scope.
- Only update it when the user explicitly changes the final idea.
- If implementation and `FINAL.md` conflict, stop the conflicting implementation and align with `FINAL.md`.

### `CURRENT.md`
Defines the live project state.

Rules:
- Update it after every meaningful completed task.
- Keep completed, in-progress, blocked, next task, test state, and known issues accurate.
- Never mark work complete without verification.
- Use it to resume work after a new Antigravity conversation.
- If the repository state differs from `CURRENT.md`, inspect the code and correct `CURRENT.md`.

### UI reference images
The user will obtain/generated UI reference images from ChatGPT.

Expected folder convention:

```text
design-references/
├── shared/
├── patient/
├── doctor/
├── hospital-admin/
└── system-admin/
```

Example:

```text
design-references/patient/home.png
design-references/doctor/patient-record.png
```

When a reference image exists, it is the visual source of truth for that screen.

---

# 2. Mandatory Work Protocol

At the beginning of every Antigravity task:

1. Read `FINAL.md`.
2. Read `CURRENT.md`.
3. Inspect the relevant files in the repository.
4. State internally what exact task is being completed.
5. Change only what is required for the current task.
6. Run formatter/linter/type checks/tests relevant to the change.
7. For web UI, launch and verify the screen in the browser.
8. For Flutter UI, run analyzer/tests and launch on an available emulator/device when possible.
9. Fix regressions before moving forward.
10. Update `CURRENT.md`.
11. Do not start the next major phase until the current phase gate passes.

Never claim a feature is complete because files were created. A feature is complete only after it has been exercised and verified.

---

# 3. FRONTEND-FIRST HARD RULE

**The first implementation priority is the complete frontend experience.**

Do NOT begin production backend, database, or AI integration until the frontend approval gate has passed.

During frontend phases:

- Use typed mock data / fixtures.
- Use mocked repositories/services.
- Make every intended flow clickable.
- Implement loading, empty, error, success, warning, permission, and confirmation states.
- Do not hard-code API implementation details into UI components.
- Create interfaces/contracts that can later be wired to real APIs.

Backend implementation may begin only when `CURRENT.md` contains:

```text
FRONTEND_APPROVED: true
```

Until then:
- Backend folders may contain placeholders/contracts only.
- No time should be spent building full CRUD APIs.
- No AI model training/inference integration should distract from frontend completion.

---

# 4. Technology Stack

## 4.1 Patient Mobile App

Use:

- Flutter
- Dart
- Material 3 as a base, with custom widgets/theme
- Riverpod for application state
- GoRouter for routing
- Dio for future HTTP integration
- `flutter_secure_storage` for future token/session storage
- `qr_flutter` for Health Card QR display
- `mobile_scanner` only where patient-side scanning is useful
- Firebase Messaging later for push notifications
- File/image picker packages for report uploads
- Freezed/json_serializable only if they materially improve model quality

The Flutter app is primarily for **patients**.

---

## 4.2 Web Application

Use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion / Motion for React
- Three.js through React Three Fiber + Drei where useful
- TanStack Query for future server-state integration
- React Hook Form + Zod for forms
- Lucide icons
- Recharts where analytics charts are genuinely useful

The web app serves:

- Doctor
- Hospital Admin
- System Admin
- Public/marketing/authentication pages

Doctor, Hospital Admin, and System Admin should share the same Next.js codebase with role-based routing/layouts unless there is a compelling architectural reason not to.

---

## 4.3 Backend — only after frontend approval

- Node.js
- Express.js
- TypeScript
- Zod
- PostgreSQL
- Prisma ORM
- JWT access tokens + refresh token strategy
- RBAC and policy/permission checks
- Audit logging
- OpenAPI/Swagger

---

## 4.4 AI Service — later phase

- Python
- FastAPI
- PyTorch
- OpenCV
- Grad-CAM
- Appropriate model serving/preprocessing utilities

Initial AI MVP:
- Prefer a single well-defined report type.
- Default planned demonstration: **Chest X-Ray → Normal vs suspected abnormality / pneumonia-style classification**, subject to dataset/model validation.
- AI output must include confidence/uncertainty and an explainability artifact where supported.
- AI findings must never be labeled as definitive diagnosis.

---

## 4.5 Storage / notifications / deployment — later phase

- Private S3-compatible object storage for medical files
- Firebase Cloud Messaging for patient notifications
- Vercel for Next.js web where suitable
- Suitable container/PaaS for Node/FastAPI
- Managed PostgreSQL
- HTTPS everywhere

---

# 5. Repository Architecture

Use **separate top-level folders** for the patient app, hospital portal, system admin portal, and backend.

Canonical structure:

```text
/
├── AGENTS.md
├── FINAL.md
├── CURRENT.md
├── README.md
│
├── patient/                         # Flutter mobile app
│   ├── lib/
│   ├── test/
│   ├── assets/
│   ├── pubspec.yaml
│   └── ...
│
├── hospital/                        # Next.js hospital web portal
│   ├── src/
│   │   ├── app/
│   │   │   ├── doctor/
│   │   │   ├── hospital-admin/
│   │   │   ├── auth/
│   │   │   └── ...
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── system-admin/                    # Separate Next.js admin portal
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/                         # All backend services
│   ├── api/                         # Node.js + Express + TypeScript
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── ai/                          # Python + FastAPI AI service
│   │   ├── app/
│   │   ├── models/
│   │   ├── tests/
│   │   └── requirements.txt
│   │
│   └── README.md
│
├── design-references/
│   ├── shared/
│   ├── patient/
│   ├── hospital/
│   │   ├── doctor/
│   │   └── hospital-admin/
│   └── system-admin/
│
└── docs/
    ├── architecture/
    ├── api/
    ├── security/
    ├── ai/
    └── demo/
```

## Folder ownership rules

### `patient/`
Contains only the Flutter patient application.

### `hospital/`
Contains the hospital-facing Next.js web application.
It supports two role experiences:
- `DOCTOR`
- `HOSPITAL_ADMIN`

Doctor and Hospital Admin share the same hospital web codebase, design system, authentication shell, and hospital context, but have separate routes, layouts, navigation, permissions, and feature modules.

### `system-admin/`
Contains a completely separate Next.js application for platform/system administrators.

It must not share hospital portal routes or expose patient medical content by default.

### `backend/`
Contains backend services only:
- `backend/api/` → Node.js/Express/PostgreSQL/Prisma
- `backend/ai/` → Python/FastAPI/PyTorch/OpenCV/Grad-CAM

The patient, hospital, and system-admin frontends all consume the same backend API.

Do not merge the three frontend applications into one workspace application later unless the user explicitly requests that architecture change.


# 6. UI Implementation Rules

## 6.1 Reference-image workflow

For each page:

1. Check whether a reference image exists.
2. If it exists:
   - study hierarchy, spacing, typography, components, color usage, cards, navigation, responsiveness and states;
   - implement the page closely;
   - preserve accessibility and functional correctness even if the image omits them.
3. If it does not exist:
   - build a clean functional skeleton using the global design system;
   - mark the page `AWAITING_UI_REFERENCE` in `CURRENT.md`;
   - do not spend excessive time inventing decorative details.
4. After implementation:
   - render it;
   - inspect it in the browser/emulator;
   - compare with the reference;
   - fix obvious visual mismatches;
   - record the verification in `CURRENT.md`.

Never embed the reference screenshot itself as the page.

---

## 6.2 Design language baseline

Unless a supplied reference overrides it:

- Healthcare-professional, calm, clean, trustworthy.
- High readability.
- Clear distinction between normal information, warnings, critical alerts and AI-generated findings.
- Generous whitespace.
- Avoid excessive gradients, glassmorphism or neon.
- Use motion deliberately, never on critical medical data in a distracting way.
- Accessible focus states.
- Responsive layouts.
- Prefer readable data density over decorative visuals.

---

## 6.3 Framer Motion

Use for:
- page/section transitions;
- drawers/sheets;
- modals;
- notification panels;
- health-card reveal;
- non-critical onboarding;
- subtle loading/entry transitions.

Do not animate medical values in a way that could imply changing clinical data.

Respect reduced-motion settings.

---

## 6.4 Three.js

Three.js is optional enhancement, not a dependency for core workflows.

Allowed uses:
- Public landing-page 3D medical/anatomy visual.
- Optional anatomical visualization.
- Optional future body-region highlighting.

Rules:
- Lazy-load.
- Provide static fallback.
- Never block doctor workflow.
- Never reduce accessibility.
- Never use it just to make dashboards flashy.
- Do not implement 3D until the ordinary UI is stable.

---

# 7. Domain Roles

The product has four application roles:

```text
PATIENT
DOCTOR
HOSPITAL_ADMIN
SYSTEM_ADMIN
```

### PATIENT
Can:
- manage own profile;
- view Health Card;
- view QR/Health ID;
- maintain appropriate self-entered medical profile data;
- upload reports;
- view medical history;
- receive access requests;
- approve/reject/revoke normal access;
- see access history;
- see emergency-access alerts;
- view AI result summaries with strong disclaimers.

### DOCTOR
Can:
- authenticate under a verified hospital;
- scan/search a Health ID;
- request normal access;
- initiate logged emergency break-glass access when justified;
- view authorized medical history;
- view reports;
- view AI decision-support output;
- create a new medical encounter;
- attach observations/reports according to permissions.

Cannot:
- silently edit historical records;
- delete patient identity/history;
- bypass auditing.

### HOSPITAL_ADMIN
Can:
- manage hospital profile;
- manage hospital doctor accounts;
- assign departments/roles;
- review hospital-level access logs;
- review emergency-access events;
- manage operational configuration.

### SYSTEM_ADMIN
Can:
- review/verify hospital registrations;
- manage platform-level account/status issues;
- review security and audit events;
- monitor system health;
- manage AI model registry/status at an administrative level later.

System Admin should not casually browse patient medical content. Administrative visibility must follow least privilege.

---

# 8. Core Health Card / Emergency Access Rules

The patient gets a platform Health ID such as:

```text
AHC-26-84X71K
```

and a QR code.

Do NOT:
- use Aadhaar number as the system's patient identifier;
- store raw medical history directly inside the QR;
- expose private medical data to an unauthenticated scanner.

QR should contain a non-sensitive, revocable server-resolvable token/URL.

Example concept:

```text
https://app.example.com/e/<opaque-random-token>
```

Unauthenticated users should see no medical record.

Verified doctor flow:

```text
Scan QR / Enter Health ID
        ↓
Identify patient
        ↓
Normal access OR Emergency access
        ↓
Authorization policy
        ↓
Read-only / scoped medical record
        ↓
Audit event
```

### Normal access
Prefer patient consent.

### Emergency break-glass access
For cases such as:
- patient unconscious;
- unable to communicate;
- life-threatening emergency;
- consent cannot reasonably be obtained.

Must require:
- authenticated doctor;
- verified hospital relationship;
- reason selection + optional note;
- short-lived/scoped access;
- prominent audit logging;
- patient notification later when possible.

Do not let emergency mode become a universal bypass.

---

# 9. Medical Safety and Privacy Rules

This is a student/research system, not a certified medical device unless separately validated.

Always show AI wording such as:

> AI-generated decision support. Not a final diagnosis. Clinical interpretation and treatment decisions must be made by a qualified healthcare professional.

For development/demo:
- Use synthetic/de-identified demo patient data.
- Do not commit real patient data.
- Do not commit credentials or secrets.
- Do not place sensitive fields in client logs.
- Do not expose private object-storage URLs permanently.
- Never infer treatment from AI model output in code.

Stored blood group/history may be useful context, but UI wording must not imply that historic stored information replaces current clinical verification required by medical practice.

---

# 10. PHASED EXECUTION PLAN

---

## PHASE 0 — Workspace Bootstrap and State Audit

### Goal
Create or inspect the repository without starting feature implementation blindly.

### Steps
1. Read `FINAL.md` and `CURRENT.md`.
2. Scan existing repository.
3. Determine whether web/mobile apps already exist.
4. Correct `CURRENT.md` if its state differs from the repository.
5. Create missing top-level structure only as needed.
6. Configure Git ignore rules for:
   - `.env*`
   - node build outputs;
   - Flutter build outputs;
   - local model files if large;
   - IDE/private artifacts.
7. Create `design-references/` directories.
8. Establish formatting/linting.
9. Make sure `patient/`, `hospital/`, and `system-admin/` frontend projects boot independently.

### Gate
- `hospital/` Next.js dev server runs.
- `system-admin/` Next.js dev server runs.
- `patient/` Flutter project analyzes/runs at least to starter screen.
- `CURRENT.md` reflects reality.

---

# FRONTEND PROGRAM

Backend/AI production implementation is forbidden until the frontend approval gate.

---

## PHASE 1 — Global Product Design Foundation

### Web
Build:
- global font/typography;
- spacing and radius tokens;
- neutral + clinical semantic colors;
- dark mode only if intentionally approved;
- shared app shell;
- sidebar;
- topbar;
- page container;
- cards;
- data badges;
- empty/error/loading components;
- alert styles;
- confirmation dialog patterns;
- table patterns;
- accessible forms.

Use shadcn/ui as a base and customize it rather than wrapping everything unnecessarily.

### Flutter
Build:
- app theme;
- typography;
- semantic colors;
- spacing/radius constants;
- primary buttons;
- input fields;
- health metric cards;
- alert/warning cards;
- skeleton/loading states;
- common page scaffold;
- bottom navigation shell.

### Deliverables
- component showcase / dev page on web;
- widget showcase screen on Flutter during development.

### Gate
Visual primitives are reusable and no page duplicates core styling logic.

---

## PHASE 2 — Patient Flutter App: Complete Mocked Frontend

### 2.1 App entry
Build:
- splash screen;
- optional onboarding;
- sign in;
- register;
- OTP/verification UI;
- forgot/reset credential UI where applicable.

### 2.2 Patient home
Include:
- greeting;
- critical medical summary;
- Health Card shortcut;
- recent medical encounter;
- reports shortcut;
- pending access request;
- emergency access notification;
- AI analysis shortcut.

### 2.3 Health Card
Build:
- digital card;
- patient photo placeholder;
- Health ID;
- QR;
- emergency badge;
- download/share/print affordances as UI;
- card information/help page.

Do not place full medical history in the QR.

### 2.4 Medical Profile
Screens/forms for:
- demographics;
- blood group;
- allergies;
- chronic diseases;
- current medications;
- previous surgeries;
- emergency contacts;
- insurance basics if retained in scope.

### 2.5 Medical History Timeline
Build:
- chronological encounters;
- filter by hospital/date/type;
- encounter detail;
- doctor/hospital metadata;
- diagnosis/observation section;
- attached reports.

### 2.6 Reports
Build:
- report list/grid;
- filters;
- upload flow;
- report-type selector;
- upload progress UI;
- report detail;
- report viewer placeholder;
- AI-analysis state.

### 2.7 AI Results
Build:
- analyzed/not-analyzed state;
- finding summary;
- confidence/uncertainty presentation;
- explainability image/heatmap placeholder;
- “potential inconsistency” warning state;
- strong decision-support disclaimer;
- “discuss/review with doctor” wording without treatment advice.

### 2.8 Consent / Access Requests
Build:
- request list;
- doctor/hospital identity;
- requested scope;
- expiry;
- approve;
- reject;
- optional scope selector;
- success/failure states.

### 2.9 Access History
Build:
- normal access events;
- emergency events;
- who/where/when/reason;
- details;
- security-report UI placeholder.

### 2.10 Notifications
Build:
- access request;
- emergency access alert;
- new encounter;
- report analyzed;
- system/security alert.

### 2.11 Profile and settings
Build:
- account/profile;
- privacy settings;
- notification settings;
- consent defaults where appropriate;
- logout;
- help/about.

### Gate
All patient screens are navigable with mock data and all important states exist.

---

## PHASE 3 — Hospital Web: Public, Authentication and Role Routing

Build:
- public landing page;
- product explanation;
- emergency Health Card explanation;
- AI decision-support explanation;
- security/privacy explanation;
- login;
- hospital registration;
- doctor login entry;
- verification-pending UI;
- unauthorized/forbidden pages;
- role-aware redirect system.

Optional after core UI:
- Three.js visual in landing hero;
- must be lazy-loaded and non-blocking.

### Gate
Every role can enter the correct mocked dashboard path and invalid role access is rejected client-side.

---

## PHASE 4 — Doctor Portal Frontend

### 4.1 Doctor dashboard
Build:
- shift/status header if useful;
- patient lookup;
- scan Health Card CTA;
- recent patients;
- pending/active access sessions;
- recent AI analyses;
- quick “new encounter” action.

### 4.2 QR scan / Health ID lookup
Build:
- camera scanner UI;
- manual Health ID field;
- invalid/expired token state;
- patient-found preview that does not overexpose data before authorization.

### 4.3 Access decision
Build:
- request patient consent;
- waiting state;
- granted/denied state;
- emergency break-glass modal;
- emergency reason selection;
- policy warning;
- temporary session indicator.

### 4.4 Patient record workspace
This is a core page.

Include:
- patient header;
- critical alerts;
- allergies;
- chronic conditions;
- current medications;
- surgeries;
- emergency contact;
- timeline;
- reports;
- encounters;
- access-scope indicator.

Use tabs/sections carefully so critical information is not buried.

### 4.5 Report viewer
Build:
- metadata;
- image/PDF placeholder/viewer area;
- previous report navigation;
- AI analysis side panel;
- explainability display;
- AI disclaimer.

### 4.6 AI vs existing observation comparison
Build:
- doctor's recorded observation;
- AI finding;
- confidence;
- mismatch flag;
- “review recommended” state;
- no language claiming the AI has proven the doctor wrong.

### 4.7 New medical encounter
Form:
- reason for visit;
- observations;
- diagnosis/assessment field;
- medications;
- tests;
- notes;
- attachments;
- save draft/submit UX.

Historical encounters should appear immutable in ordinary UI after finalization, with corrections handled as amendments later.

### 4.8 Doctor profile/settings
Build:
- profile;
- hospital/department;
- session/security UI;
- notification preferences.

### Gate
A complete demo can be performed with mock data:
scan/search → access → view history → view report/AI → add encounter.

---

## PHASE 5 — Hospital Admin Frontend

Build:
- hospital dashboard;
- hospital profile;
- verification status;
- doctor directory;
- add/invite doctor;
- doctor detail;
- activate/deactivate doctor;
- departments;
- role/permission UI;
- patient-access logs;
- emergency-access logs;
- filters/export UI placeholder;
- audit-event details;
- hospital settings.

### Gate
Hospital administration flows are clickable using mock data.

---

## PHASE 6 — Separate System Admin Frontend

Build:
- platform overview;
- hospital verification queue;
- hospital verification detail;
- approve/reject/request-more-info UI;
- hospital directory;
- user status management UI;
- system audit log;
- emergency-access monitoring;
- security-alert queue;
- AI-model status/registry UI placeholder;
- system health page placeholder;
- administrative settings.

Avoid putting unnecessary medical-record browsing into system-admin screens.

### Gate
Platform administration can be demonstrated using mock data.

---

## PHASE 7 — Frontend Quality, Responsiveness and Approval Gate

### Required work
1. Replace inconsistent mock objects with centralized typed fixtures.
2. Verify every route.
3. Verify loading/empty/error/success states.
4. Verify keyboard navigation on web.
5. Check contrast and basic accessibility.
6. Test responsive breakpoints:
   - laptop/desktop;
   - tablet;
   - narrow mobile web where applicable.
7. Test Flutter on at least one realistic phone viewport.
8. Remove placeholder lorem ipsum.
9. Ensure no fake functionality appears to save real server state.
10. Compare all pages that have UI reference images.
11. Record unresolved visual deviations in `CURRENT.md`.
12. Run:
   - web lint/type/build;
   - Flutter analyze/test.

### Approval gate
Do not proceed to backend until the user approves the frontend.

Then set in `CURRENT.md`:

```text
FRONTEND_APPROVED: true
```

---

# BACKEND PROGRAM — ONLY AFTER FRONTEND APPROVAL

---

## PHASE 8 — Backend Foundation

Build:
- Express TypeScript service;
- environment validation;
- error handling;
- request IDs;
- structured logging;
- health endpoint;
- OpenAPI foundation;
- PostgreSQL/Prisma setup;
- migrations;
- test database strategy.

Define domain entities based on `FINAL.md`, not whatever is easiest for a screen.

Likely entities:
- User
- Patient
- Hospital
- Doctor
- HospitalMembership
- EmergencyContact
- Allergy
- Condition
- Medication
- Surgery
- MedicalEncounter
- MedicalReport
- ConsentGrant
- AccessRequest
- AccessSession
- EmergencyAccessEvent
- AuditEvent
- AIAnalysis
- Notification

Normalize where appropriate. Avoid blindly putting the entire medical record in one JSON blob.

---

## PHASE 9 — Authentication, RBAC and Hospital Verification

Build:
- password hashing using a modern secure approach;
- login;
- refresh/session handling;
- logout/revocation;
- roles;
- permission middleware;
- hospital registration;
- hospital verification states;
- doctor membership under hospital;
- doctor activation/deactivation.

Test unauthorized, forbidden and revoked states.

---

## PHASE 10 — Patient Medical Record + Consent + Emergency Access

Build:
- patient profile APIs;
- medical-profile APIs;
- Health ID generation;
- opaque QR token generation/rotation;
- patient lookup after authorization checks;
- consent request workflow;
- scoped grants;
- grant expiry/revocation;
- emergency break-glass workflow;
- time-limited emergency access;
- mandatory reason;
- auditing;
- patient notification event.

Security tests are mandatory.

---

## PHASE 11 — Encounters, Reports and Private File Storage

Build:
- create/finalize medical encounter;
- encounter history;
- append/amendment strategy;
- private upload flow;
- file metadata;
- short-lived signed read URLs;
- report categories;
- report ownership/authorization;
- audit access to sensitive report files.

Do not make report storage public.

---

# AI PROGRAM

---

## PHASE 12 — AI Service MVP

### First goal
One credible, demonstrable AI pathway is better than many fake pathways.

Build:
- FastAPI service;
- model health/version endpoint;
- preprocessing;
- inference;
- confidence/score output;
- explainability output where supported;
- model metadata/version;
- error handling.

Initial demonstration target:
- Chest X-Ray image classifier, with clearly documented limitations.

### Output contract concept

```json
{
  "status": "completed",
  "model_version": "xray-demo-v1",
  "finding": "possible_abnormality",
  "confidence": 0.87,
  "explanation_asset": "signed-or-internal-reference",
  "limitations": ["research/demo decision support only"]
}
```

Do not fabricate confidence. Use actual model output and calibrate/interpret carefully.

---

## PHASE 13 — AI Integration and Explainability

Build:
- API → AI service integration;
- job/status handling if inference is slow;
- AIAnalysis persistence;
- UI states for processing/completed/failed;
- Grad-CAM image persistence or secure rendering;
- comparison between recorded clinician observation and AI finding.

Mismatch logic should be conservative and transparent.

Example UI concept:
- “Potential inconsistency detected — review recommended.”
Not:
- “Doctor diagnosis is wrong.”

---

# HARDENING PROGRAM

---

## PHASE 14 — Security, Privacy and Audit Hardening

Review:
- RBAC;
- object-level authorization;
- IDOR risks;
- token expiry;
- refresh-token revocation;
- QR token rotation;
- brute-force/rate limiting;
- file upload type/size controls;
- signed URLs;
- CORS;
- security headers;
- secrets;
- PII logging;
- audit completeness;
- emergency access misuse;
- patient consent revoke behavior.

Add tests for critical authorization paths.

Use synthetic/de-identified data only in repository/demo seed data.

---

## PHASE 15 — End-to-End Integration Tests

Test the final demo scenario:

1. Patient registers.
2. Patient completes medical profile.
3. Patient sees Health Card + QR.
4. Hospital/doctor account is verified.
5. Doctor scans/searches patient.
6. Normal consent request works.
7. Patient approves and doctor sees authorized history.
8. Emergency break-glass path also works for a separate demo case.
9. Every access creates an audit event.
10. Patient can see who accessed the record.
11. Doctor creates a new encounter.
12. Encounter appears in patient timeline.
13. Report is uploaded privately.
14. AI analysis runs for supported report.
15. Explainability result displays.
16. Potential mismatch produces review recommendation.
17. No AI screen presents itself as final diagnosis.

Use browser automation where practical.

---

## PHASE 16 — Performance and UX Polish

Web:
- loading performance;
- bundle analysis;
- lazy-load Three.js/heavy viewers;
- optimized images;
- pagination/virtualization for long logs;
- no layout shifts.

Flutter:
- image/file memory behavior;
- list performance;
- offline-friendly cached read state where appropriate;
- safe retry UX.

Both:
- understandable errors;
- no dead-end flows;
- accessible terminology.

---

## PHASE 17 — Deployment

Prepare:
- environment matrices;
- database migrations;
- seed demo data;
- object storage;
- web deployment;
- API deployment;
- AI service deployment;
- app build;
- HTTPS;
- production CORS;
- secrets;
- observability basics.

Never deploy development secrets.

---

## PHASE 18 — Final Documentation and Viva/Demo Package

Create/update:
- README;
- architecture diagram;
- ER diagram;
- sequence diagram for normal access;
- sequence diagram for emergency break-glass;
- AI flow diagram;
- security model;
- API docs;
- demo credentials using synthetic data;
- installation instructions;
- deployment instructions;
- known limitations;
- future scope;
- final screenshots;
- 5–10 minute demo script;
- viva talking points.

---

# 11. Coding Standards

## Web
- TypeScript strict mode.
- Avoid `any` unless justified.
- Prefer server/client component boundaries intentionally.
- Keep domain logic out of visual components.
- Use feature-oriented structure where it improves clarity.
- No giant 1,000-line dashboard component.
- Use Zod for user-entered form schemas.
- Centralize API client once backend arrives.
- Never trust client-side role checks as security; backend enforces later.

## Flutter
- Null safety.
- Reusable theme/components.
- Keep network/data repositories separate from widgets.
- Feature-oriented structure.
- Avoid deeply nested mega widgets.
- Use Riverpod providers deliberately, not globally for every local field.

## Backend
- Explicit authorization checks.
- Service/domain layer for critical access policy.
- Transactions where multi-record consistency matters.
- Migrations committed.
- No secrets in repo.

## AI
- Version models.
- Document dataset/model source and limitations.
- Separate preprocessing from API transport.
- Deterministic evaluation where possible.
- Never silently swap model meaning while keeping same version.

---

# 12. Verification Requirements

After every web feature:
- lint;
- type-check;
- render in browser;
- click through changed flow;
- verify responsive state if UI changed.

After every Flutter feature:
- format;
- analyze;
- tests if applicable;
- run screen/flow when environment supports it.

After backend changes:
- type-check;
- tests;
- relevant API integration test;
- authorization negative test.

After AI changes:
- service test;
- known sample inference;
- malformed input test;
- output-schema test.

---

# 13. CURRENT.md Update Format

After a task, update at least:

```text
Last updated:
Current phase:
Current task:
Completed:
In progress:
Blocked:
Verification:
Known issues:
Next exact task:
UI references used:
FRONTEND_APPROVED:
```

For page tracking use:

```text
[ ] NOT_STARTED
[~] IN_PROGRESS
[x] COMPLETE_VERIFIED
[!] BLOCKED
[?] AWAITING_UI_REFERENCE
```

Do not inflate completion percentages.

---

# 14. Stop Conditions / Ask User Only When Necessary

Do not ask trivial implementation questions.

Make reasonable engineering decisions consistent with `FINAL.md`.

Stop and request user direction when:
- a requested change conflicts with `FINAL.md`;
- an essential UI reference is expected and the visual decision is subjective/high-impact;
- a change would materially alter healthcare/privacy behavior;
- credentials/third-party configuration are required and unavailable;
- the user must explicitly approve frontend before backend begins.

If a UI reference is missing, build the functional skeleton and mark it `AWAITING_UI_REFERENCE` instead of blocking all progress.

---

# 15. Non-Goals for the MVP

Do not expand scope into:
- full national health network integration;
- real insurance claims processing;
- pharmacy commerce;
- ambulance dispatch;
- telemedicine video calling;
- autonomous medical diagnosis;
- autonomous prescriptions;
- replacing hospital EHR/HIS;
- all MRI/CT/ECG/X-Ray/blood modalities at once;
- blockchain unless explicitly required.

---

# 16. Definition of Done

The project is done only when:

- Frontends are complete and responsive.
- Patient Health Card flow works.
- Normal consent access works.
- Emergency break-glass access works and is audited.
- Longitudinal medical history works.
- Doctor can add a new encounter.
- Private report upload/access works.
- At least one genuine AI analysis pathway works end-to-end.
- Explainability is shown where technically supported.
- AI is clearly decision support.
- Patient access history works.
- Hospital verification/doctor management works.
- System admin oversight works without violating least privilege.
- Critical authorization/security tests pass.
- Final demo is reproducible with synthetic data.
- Documentation and diagrams are complete.
- `FINAL.md` acceptance criteria are satisfied.
- `CURRENT.md` accurately reports 100% verified implementation, not merely planned files.

