# AI Healthcare

> **Secure Emergency Health Identity, Longitudinal Medical Records & Explainable AI Clinical Decision Support**
> 
> Academic Title: *Leveraging AI-Healthcare: Leveraging Artificial Intelligence for Reliable Medical Information Access within a Secure Healthcare Framework*

---

## 1. Executive Summary

**AI Healthcare** is a modern, high-integrity medical identity and healthcare platform designed to bridge emergency responsiveness with comprehensive longitudinal care. A patient owns a portable, digital and printable **Health Card** with an opaque QR code and unique **Health ID** (e.g., `AHC-26-84X71K`). 

In non-urgent settings, verified clinicians request scoped access requiring explicit patient consent. In life-threatening emergencies where the patient is unconscious or unable to communicate, authorized doctors can initiate an audited **Emergency Break-Glass Access** workflow, unlocking short-lived, scoped access to critical life-saving information (allergies, chronic conditions, current medications, emergency contacts) with mandatory auditing and post-event patient notification.

The platform further provides **AI Clinical Decision Support** on diagnostic imaging (starting with a Chest X-Ray classification MVP) paired with Grad-CAM explainability heatmaps. AI findings are strictly framed as advisory decision support and never as definitive diagnosis or autonomous treatment directives.

---

## 2. Core Architectural Pillars

```
                     ┌──────────────────────────────────────────────────┐
                     │               Patient Health Card                │
                     │          (Health ID & Opaque QR Token)           │
                     └────────────────────────┬─────────────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │                                               │
             Normal Clinical Flow                            Emergency Scenario
                      │                                               │
          Doctor requests record access                   Patient unconscious / unable
                      │                                               │
          Patient approves consent                       Doctor triggers Break-Glass
                      │                                  (Mandatory justification)
                      │                                               │
                      ▼                                               ▼
         Full Authorized History                           Critical Profile Summary
         (Encounters, Labs, Imaging)                     (Allergies, Meds, Conditions)
                      │                                               │
                      └───────────────────────┬───────────────────────┘
                                              │
                                              ▼
                             Immutable Audit Event Logging
```

1. **Emergency Health Identity / Health Card**: Portable, secure, and privacy-preserving. Raw medical records are never embedded in the QR code or accessible without authentication.
2. **Longitudinal Patient Records**: Seamless continuity of care across disparate encounters and facilities.
3. **Dual Access Model**: Patient-approved consent for standard clinical workflows; time-limited, audited break-glass protocols for critical emergencies.
4. **Encounter Management**: Immutable clinical encounters recorded by authenticated clinicians with observational notes and report attachments.
5. **Explainable AI Decision Support**: Model inference accompanied by confidence metrics, explainability visualizations (Grad-CAM), and clinical consistency cross-checking ("review recommended" flags).
6. **Zero-Trust Security & Auditing**: End-to-end accountability for every record read, consent event, and emergency break-glass action.

---

## 3. Platform Roles & Surfaces

The repository organizes four core domain roles across three independent client frontends and shared backend services:

| Role | Client Application | Key Capabilities |
| :--- | :--- | :--- |
| **`PATIENT`** | [`patient/`](file:///c:/games/AI-Healthcare/patient) *(Flutter Mobile)* | Access digital Health Card & QR, manage medical profile, review longitudinal timeline, upload reports, approve/reject consent requests, inspect complete access and emergency audit history. |
| **`DOCTOR`** | [`hospital/`](file:///c:/games/AI-Healthcare/hospital) *(Next.js Portal)* | Scan Health Card QR / lookup Health ID, request consent, trigger logged emergency break-glass access, view longitudinal histories, record encounters, evaluate AI decision-support findings. |
| **`HOSPITAL_ADMIN`** | [`hospital/`](file:///c:/games/AI-Healthcare/hospital) *(Next.js Portal)* | Manage hospital profile and department hierarchies, verify and manage clinician accounts, review institutional access logs and emergency break-glass events. |
| **`SYSTEM_ADMIN`** | [`system-admin/`](file:///c:/games/AI-Healthcare/system-admin) *(Next.js Portal)* | Review and verify hospital registrations, monitor platform-wide security and emergency access patterns, audit system health and oversee AI model registry. |

---

## 4. Repository Structure

The workspace follows a strict top-level separation of concerns:

```text
c:\games\AI-Healthcare\
├── patient/                         # Flutter mobile application (Android & iOS)
│   ├── android/                     # Android native configuration
│   ├── ios/                         # iOS native configuration
│   ├── lib/                         # Application source code (Riverpod + GoRouter)
│   ├── test/                        # Unit and widget tests
│   └── pubspec.yaml                 # Flutter dependencies and assets
│
├── hospital/                        # Next.js web application (Doctor + Hospital Admin)
│   ├── src/app/                     # Next.js App Router (role-based routes)
│   ├── public/                      # Static web assets
│   ├── package.json                 # Next.js, React, Tailwind CSS, TypeScript
│   └── tsconfig.json                # TypeScript project configuration
│
├── system-admin/                    # Separate Next.js web application (System Admin)
│   ├── src/app/                     # Next.js App Router (platform governance)
│   ├── public/                      # Static web assets
│   ├── package.json                 # Next.js, React, Tailwind CSS, TypeScript
│   └── tsconfig.json                # TypeScript project configuration
│
├── backend/                         # Backend services (LOCKED until frontend approval)
│   ├── api/                         # Node.js + Express + TypeScript + PostgreSQL + Prisma
│   │   └── README.md                # Service specification & placeholder
│   └── ai/                          # Python + FastAPI + PyTorch + Grad-CAM
│       └── README.md                # Service specification & placeholder
│
├── design-references/               # UI visual design source-of-truth mockups
│   ├── shared/                      # Global theme and design tokens
│   ├── patient/                     # Patient mobile UI mockups
│   ├── hospital/                    # Hospital web UI mockups
│   │   ├── doctor/                  # Doctor portal mockups
│   │   └── hospital-admin/          # Hospital admin portal mockups
│   └── system-admin/                # System admin portal mockups
│
├── docs/                            # Architectural, security, and integration documentation
│   ├── architecture/                # System diagrams and domain data models
│   ├── api/                         # REST / OpenAPI contracts
│   ├── security/                    # RBAC, break-glass protocol, and privacy specs
│   ├── ai/                          # Model specifications, validation, and explainability
│   └── demo/                        # Synthetic demo patient profiles & test scenarios
│
├── AGENTS.md                        # Autonomous agent execution contract and phase plan
├── FINAL.md                         # Product definition, boundaries, and acceptance criteria
├── CURRENT.md                       # Real-time project implementation and verification status
└── README.md                        # Root project overview (this document)
```

---

## 5. Technology Stack

### Mobile Application (`patient/`)
- **Framework**: Flutter 3.44 (targeting Android and iOS)
- **Language**: Dart 3.12
- **State Management**: Riverpod
- **Routing**: GoRouter
- **Networking**: Dio (for future API integration)
- **Secure Storage**: `flutter_secure_storage`
- **QR Utilities**: `qr_flutter`

### Hospital Web Application (`hospital/`)
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Motion & 3D**: Framer Motion, selective Three.js (React Three Fiber + Drei)
- **Data & Forms**: TanStack Query, React Hook Form, Zod
- **Icons & Charts**: Lucide Icons, Recharts

### System Admin Portal (`system-admin/`)
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Data & Forms**: TanStack Query, React Hook Form, Zod

### Server & AI Services (`backend/` — Planned for Phase 8+)
- **Backend API**: Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, OpenAPI/Swagger
- **AI Service**: Python, FastAPI, PyTorch, OpenCV, Grad-CAM

---

## 6. Health Card & Emergency Access Model

### Health ID and QR Token Principles
- Every patient is assigned a random, non-sensitive identifier (e.g., `AHC-26-84X71K`).
- **No Aadhaar or National ID numbers** are used as platform identifiers.
- The QR code contains an opaque, cryptographically verifiable, and revocable server-resolvable token.
- Scanning the QR code by an unauthenticated party reveals **no medical records**.

### Normal Access Workflow
1. Doctor scans patient's QR code or enters Health ID.
2. Doctor authenticates under a verified hospital credential.
3. Doctor initiates a consent request specifying the required record scope and duration.
4. Patient receives an instant consent notification on the mobile app.
5. Patient approves or rejects the request.
6. If approved, the doctor receives authorized access, and the transaction is logged to the patient's access history.

### Emergency Break-Glass Workflow
1. When a patient is unconscious or unable to communicate, an authenticated doctor selects **Emergency Break-Glass Access**.
2. Doctor selects a clinical justification (e.g., *Unconscious patient*, *Acute trauma*, *Severe anaphylaxis*) and optional notes.
3. System grants immediate, short-lived, read-only access limited to critical life-saving profile elements (blood group, allergies, chronic conditions, current medications, emergency contacts).
4. A high-priority audit event is created, triggering hospital-level logging and a notification sent to the patient for review when recovered.

---

## 7. Explainable AI Clinical Decision Support

1. **Advisory Role**: AI serves exclusively as a clinical decision-support tool. It **never** provides autonomous diagnoses or prescriptions.
2. **Transparent Confidence**: Model output displays uncertainty intervals and calibrated confidence percentages.
3. **Explainability**: Integrated Grad-CAM heatmaps highlight spatial regions of interest within diagnostic images (e.g., Chest X-Rays) to assist clinician evaluation.
4. **Clinical Cross-Checking**: If model output diverges from an existing clinician observation, the interface flags a non-accusatory warning:
   > *“Potential inconsistency detected — review recommended.”*
5. **Mandatory Disclaimers**:
   > *AI-generated decision support. Not a final diagnosis. Clinical interpretation and treatment decisions must be made by a qualified healthcare professional.*

---

## 8. Frontend-First Development Strategy

This project enforces a **Frontend-First Gate** as defined in [`AGENTS.md`](file:///c:/games/AI-Healthcare/AGENTS.md):
- **Phases 0 through 7** focus on delivering complete, interactive frontend user journeys for all roles using typed mock fixtures.
- Backend and AI production implementations remain strictly locked until `FRONTEND_APPROVED: true` is set in [`CURRENT.md`](file:///c:/games/AI-Healthcare/CURRENT.md).
- This ensures clinical usability, component ergonomics, responsive layouts, and accessibility are validated before server-side commitments are locked.

---

## 9. Current Phase Status

| Phase | Description | Status |
| :--- | :--- | :--- |
| **Phase 0** | Workspace Bootstrap & State Audit | **COMPLETE_VERIFIED** |
| **Phase 1** | Global Product Design Foundation | **Next in Queue** |
| **Phase 2** | Patient Flutter App Frontend | Pending |
| **Phase 3** | Hospital Web Auth & Public Pages | Pending |
| **Phase 4** | Doctor Portal Frontend | Pending |
| **Phase 5** | Hospital Admin Frontend | Pending |
| **Phase 6** | System Admin Frontend | Pending |
| **Phase 7** | Frontend Quality Gate & User Approval | Pending (`FRONTEND_APPROVED: false`) |
| **Phases 8–11** | Production Backend API & Security | **LOCKED** |
| **Phases 12–14**| Production AI Service & Explainability | **LOCKED** |
| **Phase 15** | Final End-to-End System Demo | Pending |

For live task progression, open risks, and verification logs, consult [`CURRENT.md`](file:///c:/games/AI-Healthcare/CURRENT.md).
