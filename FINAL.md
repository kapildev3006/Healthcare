# FINAL.md — Final Product Definition

> This file defines what the project must ultimately become.
> It is the target state for Antigravity.
> Do not change it unless the user explicitly changes the project idea.

---

# 1. Project Working Title

**AI Healthcare — Secure Emergency Health Identity, Longitudinal Medical Records & Explainable AI Clinical Decision Support**

Academic title may remain:

**Leveraging AI-Healthcare: Leveraging Artificial Intelligence for Reliable Medical Information Access within a Secure Healthcare Framework**

---

# 2. Final Vision

Build a secure healthcare platform where a patient owns a portable **Health Card / Health ID** that can be carried like an identity card and used anywhere during an emergency.

The card must not expose raw medical history by itself.

A verified doctor/hospital can scan the card or enter the Health ID, authenticate, and obtain properly authorized medical information.

The system must support two access pathways:

1. **Normal patient-approved access**
2. **Emergency break-glass access** when the patient cannot provide consent

Every access must be auditable.

The platform must maintain a longitudinal medical history so that future doctors can understand important past conditions, medications, allergies, reports, and treatment encounters.

Medical reports may be analyzed by AI. AI must function as a **clinical decision-support tool**, not as an autonomous diagnostic authority.

---

# 3. Final User Surfaces

## 3.1 Patient Mobile App — Flutter

Primary patient experience.

The patient can:
- register/login;
- maintain profile;
- see Health ID;
- see digital Health Card;
- display QR code;
- view medical history;
- view past encounters;
- view medical reports;
- upload supported reports;
- view AI analysis results;
- receive access requests;
- approve/reject normal access;
- revoke access where applicable;
- receive emergency-access alerts;
- inspect access history;
- manage emergency contact and medical profile;
- manage account/privacy/notification settings.

---

## 3.2 Hospital Web Application — Next.js

Doctors can:
- authenticate under a verified hospital;
- scan Health Card QR;
- search by Health ID;
- request patient access;
- enter emergency break-glass mode when justified;
- view critical medical summary;
- view authorized longitudinal history;
- inspect reports;
- inspect AI findings and explainability;
- compare AI finding with available clinician observation;
- create a new medical encounter;
- attach notes/reports according to permission;
- see active access scope/session.

---

## 3.3 Hospital Admin Experience — inside the `hospital/` application

Hospital administrators can:
- maintain hospital profile;
- see verification status;
- manage doctor accounts;
- organize departments;
- activate/deactivate doctors;
- review hospital access logs;
- review emergency break-glass events;
- manage operational settings.

---

## 3.4 System Admin Web — separate `system-admin/` application

System administrators can:
- review hospital registrations;
- approve/reject/request more information;
- manage platform account status;
- review system-level audit/security events;
- monitor emergency-access patterns;
- see system health;
- see AI model service status/versions.

System admins should not be given broad casual access to patient medical content.

---


# 4. Canonical Project Folder Structure

The final repository must keep the major applications separated:

```text
/
├── patient/          # Flutter patient mobile app
├── hospital/         # Next.js doctor + hospital-admin portal
├── system-admin/     # Separate Next.js system-admin portal
├── backend/
│   ├── api/          # Node.js + Express + PostgreSQL + Prisma
│   └── ai/           # Python + FastAPI + PyTorch + Grad-CAM
├── design-references/
├── docs/
├── AGENTS.md
├── FINAL.md
└── CURRENT.md
```

Rules:

- `patient/` is only for the patient Flutter application.
- `hospital/` contains both Doctor and Hospital Admin experiences with role-based routes.
- `system-admin/` is a separate web application and must not be merged into the hospital portal.
- `backend/` contains server-side services only.
- All three frontend applications communicate with the shared backend API.
- AI stays under `backend/ai/` as a separate Python service.
- UI reference images must be organized using the same patient/hospital/system-admin separation.

---

# 5. Final Technology Direction

## Patient
- Flutter
- Dart
- Riverpod
- GoRouter
- Dio
- flutter_secure_storage
- Firebase Messaging later
- QR display/scanning packages as needed

## Hospital Web (`hospital/`)
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion / Motion for React
- React Three Fiber + Drei + Three.js for selective 3D
- TanStack Query
- React Hook Form
- Zod
- Lucide
- Recharts where useful

## System Admin Web (`system-admin/`)
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion / Motion for React
- TanStack Query
- React Hook Form
- Zod

## Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma
- JWT/session strategy
- RBAC/permission policies
- OpenAPI

## AI
- Python
- FastAPI
- PyTorch
- OpenCV
- Grad-CAM

## Infrastructure
- private S3-compatible report storage
- Firebase Cloud Messaging
- HTTPS
- appropriate cloud deployment

---

# 6. Health Identity / Health Card

Every registered patient receives a unique platform-generated Health ID, for example:

```text
AHC-26-84X71K
```

The patient also receives a QR-based Health Card.

The Health Card should feel portable like an identity card:
- available digitally;
- designed for printing;
- easy to display during emergency;
- QR scannable.

The project must **not use Aadhaar number as its patient identifier**.

QR must not contain the patient's full medical history.

QR should resolve through an opaque/revocable identifier or token.

---

# 7. Access Model

## 6.1 Normal Access

Typical flow:

```text
Doctor scans Health Card / enters Health ID
        ↓
Doctor is authenticated
        ↓
Patient is identified
        ↓
Doctor requests defined record access
        ↓
Patient receives consent request
        ↓
Patient approves or rejects
        ↓
Authorized records become available
        ↓
Access is logged
```

Consent should have scope/expiry where appropriate.

---

## 6.2 Emergency Break-Glass Access

Used when normal consent is not reasonably available, for example:
- unconscious patient;
- unable to communicate;
- life-threatening situation;
- emergency where delay could materially hinder care.

Flow:

```text
Doctor authenticates
        ↓
Scans/enters Health ID
        ↓
Selects Emergency Access
        ↓
Provides reason
        ↓
System grants short-lived scoped access
        ↓
Doctor views relevant medical history
        ↓
Audit event is recorded
        ↓
Patient is notified later when possible
```

Emergency access is not a universal bypass.

---

# 8. Information Available to an Authorized Doctor

Depending on access scope:

## Critical profile
- patient identity summary;
- blood group (historic/stored value);
- allergies;
- chronic conditions;
- current medications;
- relevant previous surgeries;
- emergency contacts;
- critical alerts.

## Longitudinal history
- hospital encounters;
- clinician-entered observations/diagnoses;
- tests;
- medications;
- reports;
- dates;
- provider/hospital;
- attached documents.

Important safety rule:
Historic stored medical information can support care but must not be presented as replacing current clinical verification where such verification is required.

---

# 9. Medical Encounter Model

After treating a patient, an authorized doctor can create a new encounter containing appropriate fields such as:

- date/time;
- hospital;
- doctor;
- reason for visit;
- observations;
- assessment/diagnosis field;
- medications;
- tests;
- notes;
- report attachments.

Finalized historical records should not be silently rewritten. Corrections should be modeled as amendments/versioned changes later if implemented.

The new encounter becomes part of the patient's longitudinal history.

---

# 10. Medical Reports

Planned categories may include:

- X-Ray
- ECG
- MRI
- CT
- Blood Report
- Ultrasound
- Histopathology
- Prescription
- Other supported documents

The platform UI may support categorizing these records, but AI implementation does not need to support every category in the MVP.

Medical files must be private.

---

# 11. AI Clinical Decision Support

AI is the major innovation but must be implemented credibly.

Initial final-project requirement:
- at least **one genuinely functioning medical-report AI pathway**;
- actual model inference;
- model version recorded;
- confidence/score output as appropriate;
- error state;
- explainability for supported image models.

Preferred MVP demonstration:
- Chest X-Ray classification / abnormality support with Grad-CAM.

Future modalities can be documented but must not be faked.

---

# 12. AI/Doctor Consistency Support

If an existing clinician observation and AI finding materially differ, the system may flag:

> **Potential inconsistency detected — review recommended.**

The system must not say:
- “The doctor is wrong.”
- “AI diagnosis is final.”
- “Take this treatment.”
- “You definitely have X” based solely on the AI component.

Final clinical interpretation stays with qualified healthcare professionals.

---

# 13. Explainable AI

For supported image models:
- show AI finding;
- show confidence/score appropriately;
- show Grad-CAM or equivalent explainability visualization;
- show model/analysis status;
- show limitations/disclaimer.

The explanation should support human review, not imply certainty.

---

# 14. Auditability

Audit logging is a core feature.

Important events include:
- normal medical record access;
- emergency access;
- consent approved/rejected/revoked;
- report read/access where practical;
- encounter creation/finalization;
- sensitive administrative actions;
- doctor account changes;
- hospital verification changes.

Patient should have a readable access-history experience for relevant events.

---

# 15. Security Requirements

The final project should demonstrate:

- authenticated access;
- role-based/permission-based access;
- verified hospital/doctor relationships;
- object-level authorization;
- protected private report storage;
- secure password handling;
- HTTPS in deployed environment;
- safe token/session design;
- emergency session expiry;
- QR token safety;
- audit logs;
- no secrets committed;
- no real patient data used for development/demo;
- safe error/logging practices.

Encryption at rest/in transit should be described accurately according to actual infrastructure; do not claim cryptographic controls that were not implemented.

---

# 16. Design / UX Target

Visual style:
- modern;
- premium;
- trustworthy;
- clinical;
- calm;
- readable;
- responsive;
- professional enough for a final-year demonstration.

Web uses:
- Tailwind
- shadcn/ui
- Framer Motion
- selective Three.js

Patient app uses:
- Flutter custom widget styling.

Generated reference images from ChatGPT will be used to refine individual pages.

Critical clinical information takes priority over decorative visuals.

---

# 17. Frontend-First Delivery Goal

Before production backend/AI work begins, the project should contain a complete mocked frontend:

## Patient
- auth;
- home;
- Health Card;
- medical profile;
- history timeline;
- encounter detail;
- reports;
- upload;
- AI result;
- consent requests;
- access history;
- notifications;
- profile/settings.

## Doctor
- login;
- dashboard;
- QR/Health ID lookup;
- consent request;
- emergency-access modal;
- patient record;
- report viewer;
- AI result;
- AI/doctor comparison;
- new encounter;
- profile/settings.

## Hospital Admin
- dashboard;
- doctor management;
- departments;
- verification status;
- access logs;
- emergency logs;
- settings/profile.

## System Admin
- dashboard;
- hospital verification;
- hospital detail;
- account status management;
- audit/security monitoring;
- emergency-access oversight;
- AI-model status placeholder;
- system health/settings.

All important screens must include realistic loading, empty, error and success states.

---

# 18. Final End-to-End Demo Scenario

The final project is successful when this demo works using synthetic data:

### Scenario A — Normal access

1. Patient logs into Flutter app.
2. Patient opens Health Card.
3. Doctor logs into verified hospital account.
4. Doctor scans QR or enters Health ID.
5. Doctor requests medical-record access.
6. Patient receives request.
7. Patient approves.
8. Doctor sees authorized medical history.
9. Access is audited.
10. Patient can later see the access event.

### Scenario B — Emergency access

1. Demo patient cannot provide consent.
2. Doctor scans/enters Health ID.
3. Doctor selects Emergency Access.
4. Doctor provides reason.
5. System grants time-limited scoped access.
6. Doctor sees critical history.
7. Emergency event is audited.
8. Patient sees/receives alert later.

### Scenario C — Treatment continuity

1. Doctor reviews history.
2. Doctor creates a new encounter.
3. New encounter is saved.
4. Patient sees it in medical timeline.
5. Another authorized doctor can later see the encounter.

### Scenario D — AI support

1. Supported report is uploaded.
2. AI analysis runs.
3. Result displays actual model output.
4. Confidence/score is shown appropriately.
5. Explainability image is shown where supported.
6. If AI finding and clinician observation differ, system displays “review recommended.”
7. UI clearly says AI is not the final diagnosis.

---

# 19. MVP Non-Goals

Not required for final MVP:

- integration with Aadhaar;
- replacing ABHA/ABDM;
- nationwide hospital interoperability;
- real insurance claim processing;
- ambulance dispatch;
- pharmacy marketplace;
- telemedicine video platform;
- every medical imaging modality;
- autonomous prescriptions;
- autonomous diagnosis;
- blockchain;
- real clinical deployment.

These can be future-scope topics only.

---

# 20. Final Acceptance Criteria

The product target is achieved only if:

- [ ] Patient Flutter app is complete and polished.
- [ ] Doctor web is complete and polished.
- [ ] Hospital Admin web is complete.
- [ ] System Admin web is complete.
- [ ] Health ID + QR flow works.
- [ ] QR does not expose raw medical data.
- [ ] Normal patient-consent access works.
- [ ] Emergency break-glass access works.
- [ ] Emergency access is short-lived/scoped and audited.
- [ ] Longitudinal patient history works.
- [ ] Doctor can create new medical encounters.
- [ ] Patient sees new encounters.
- [ ] Medical reports are private.
- [ ] At least one AI analysis pathway genuinely works.
- [ ] Explainability is shown for the supported image model.
- [ ] AI result is framed as decision support.
- [ ] AI/clinician mismatch can trigger review recommendation.
- [ ] Access history is visible to patient.
- [ ] Hospital verification and doctor management work.
- [ ] Role/permission boundaries are enforced server-side.
- [ ] Critical access flows have tests.
- [ ] Demo uses synthetic/de-identified data.
- [ ] Web is responsive and accessible at a practical level.
- [ ] Flutter app works on a real/emulated phone form factor.
- [ ] Deployment/demo is reproducible.
- [ ] README, architecture, database, API, security and AI documentation are complete.

