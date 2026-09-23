# AI HEALTHCARE — PATIENT APP REMAINING FRONTEND MASTER IMPLEMENTATION PROMPT

You are implementing the **remaining Patient Flutter frontend screens and flows** of the existing **AI Healthcare** project.

This is NOT a new project.

The Patient app already contains completed frontend foundations and some completed screens. Your job is to **audit the repository and implement only the patient-side reference screens that are still missing or incomplete**.

Do not rebuild already completed screens unless they require a minimal routing/integration change.

---

# 0. READ THE PROJECT STATE FIRST

Before writing or modifying code, inspect:

- `AGENTS.md`
- `FINAL.md`
- `CURRENT.md`
- root `README.md`
- `patient/pubspec.yaml`
- `patient/lib/`
- `patient/test/`
- `design-references/patient/`

Also inspect all existing Patient app routes, widgets, themes, models, mocks, and tests.

## CRITICAL RULE

`CURRENT.md` is the implementation-state source of truth.

If a Patient screen/feature is already marked:

- `COMPLETE`
- `COMPLETE_VERIFIED`
- or clearly exists and is fully implemented

then DO NOT recreate it from scratch.

Only make the smallest integration or consistency changes needed.

The visual source of truth for missing screens is:

`design-references/patient/`

---

# 1. PROJECT BOUNDARIES

Work only inside:

`patient/`

You MAY update:

`CURRENT.md`

after verification.

Do NOT modify production code in:

- `hospital/`
- `system-admin/`
- `backend/api/`
- `backend/ai/`

Do NOT implement real backend APIs.
Do NOT implement real authentication.
Do NOT implement real AI inference.
Do NOT add real hospital integrations.

Maintain:

`FRONTEND_APPROVED: false`

Use typed mock data only.

---

# 2. TECHNOLOGY

Use the existing Flutter app.

Expected stack already includes or may include:

- Flutter 3.x
- Dart
- Material 3
- Riverpod
- GoRouter
- Dio only as a future API contract layer
- `qr_flutter` where QR display is needed

Do NOT replace the current state-management or routing architecture unless broken.

Do NOT add unnecessary dependencies.

Reuse the existing Patient design system under:

`patient/lib/app/theme/`

and reusable widgets under:

`patient/lib/core/widgets/`

---

# 3. EXISTING IMPLEMENTATION MUST BE PRESERVED

The project already contains a Patient Design Foundation and at least some implemented patient screens.

Examples that may already be complete include:

- Design System Showcase
- Patient Home Dashboard
- Digital Health Card
- Medical History Timeline

Do NOT assume this list is exhaustive.

Inspect `CURRENT.md` and existing code to determine the exact completed set.

For every already-complete screen:

- preserve behavior
- preserve styling
- preserve route contracts
- preserve mock-data consistency

Do not duplicate completed screens with alternate implementations.

---

# 4. PATIENT APP VISUAL SYSTEM — LOCKED

All newly implemented screens must match the established Patient app visual language.

Use the existing:

- clinical blue / navy palette
- medical teal accents
- semantic red / amber / green / info colors
- Material 3 typography
- spacing tokens
- radius tokens
- shadows
- buttons
- text fields
- cards
- badges
- alerts
- skeletons
- empty/error states

Do not invent a new design system.

Do not change typography/colors randomly between screens.

The reference images under:

`design-references/patient/`

are the screen-level visual source of truth.

---

# 5. PATIENT NAVIGATION MODEL

Keep navigation coherent and consistent with the existing app.

The main authenticated Patient bottom navigation should remain aligned with the existing implemented shell.

Expected high-level destinations may include:

- Home
- History
- Health Card
- Reports
- Profile / Settings

Do not add duplicate bottom-navigation destinations.

Secondary screens should push onto the current navigation stack.

---

# 6. IMPLEMENT ONLY MISSING PATIENT REFERENCES

Audit every image in:

`design-references/patient/`

Compare each reference against:

- existing routes
- existing screens
- `CURRENT.md`

Implement every reference that does NOT already have a complete implementation.

The repository may contain references similar to the following.

---

# 7. AUTHENTICATION & ONBOARDING SCREENS

Implement these only if missing.

## Splash

Possible reference:

`design-references/patient/splash.png`

Include:

- app branding
- clean loading state
- transition to onboarding/login using mocked local state

---

## Onboarding

Possible references may include:

- `onboarding-1.png`
- `onboarding-2.png`
- `onboarding-3.png`

Implement:

- PageView
- skip
- next
- back
- progress indicators
- Get Started

Use local state only.

---

## Login

Possible reference:

`login.png`

Implement:

- email / phone
- password
- show/hide password
- remember-me if shown
- forgot password
- login button
- registration navigation

Mock login only.

---

## Register / Create Account

Reference may be:

`register.png`

Implement:

- name
- email
- phone
- DOB if shown
- password
- confirm password
- terms checkbox
- mock validation
- continue to OTP

---

## OTP Verification

Reference:

`otp-verification.png`

Implement:

- segmented OTP fields
- resend countdown mock
- submit
- back navigation
- validation

---

## Forgot Password

Reference:

`forgot-password.png`

Implement:

- email/phone recovery
- send reset link
- back to login
- clean validation feedback

---

## Reset Password

Reference:

`reset-password.png`

Implement:

- new password
- confirm password
- password strength/rules
- visibility toggle
- reset action
- success flow

---

# 8. PATIENT MEDICAL PROFILE & HEALTH INFORMATION

Implement only if not already present.

Possible references may include:

- `medical-profile.png`
- `personal-information.png`
- `allergies-conditions.png`
- `medicines.png`
- `emergency-contacts.png`

Expected capabilities:

## Medical Profile

- demographics
- blood group
- chronic conditions
- allergies
- emergency contact
- medication summary
- health identifiers
- edit affordances

## Personal Information

- full name
- DOB
- gender
- contact
- address
- Health ID

## Allergies & Conditions

- allergy list
- severity
- reaction
- chronic conditions
- status
- add/edit mock interaction

## Medicines

- active medications
- dose
- frequency
- duration
- instructions
- inactive/history state if reference supports it

## Emergency Contacts

- primary contact
- secondary contact
- relation
- phone
- edit/add/remove mock actions

Use one centralized patient mock profile shared with Home and Health Card.

---

# 9. REPORTS FLOW

Implement missing report-related screens.

## Reports List

Possible reference:

`reports.png`

Include:

- list/grid of uploaded reports
- category filters
- date filters
- report type
- status
- upload action
- recent reports
- empty state

---

## Upload Report

Reference:

`upload-report.png`

Implement:

- report type
- date
- provider / diagnostic center
- file picker interaction
- mocked selected file state
- progress/loading mock state
- upload success/failure state hooks

Do not upload to real backend.

---

## Report Detail

Reference:

`report-detail.png`

Include:

- report metadata
- file preview
- patient/report context
- doctor/lab information
- findings
- AI Analysis CTA
- share/download mocked actions

---

## Share Report

Reference:

`share-report.png`

Implement:

- choose doctor/provider
- sharing duration
- scope
- reason
- send/share confirmation
- privacy explanation

No real sharing API.

---

# 10. AI ANALYSIS FLOW

Implement AI UI only.

No actual model inference.

## AI Analysis

Reference:

`ai-analysis.png`

Include:

- report context
- AI summary
- confidence
- key findings
- recommendations
- original image/report preview
- explainability action
- clear medical disclaimer

The UI must clearly state that AI output is decision support and not a final diagnosis.

---

## AI Explainability / Grad-CAM

Reference:

`ai-explainability.png`

Include:

- original image
- heatmap / highlighted attention region
- attention legend
- confidence
- detected visual patterns
- explanation
- clinical correlation note

Use static/mock assets or programmatically rendered placeholders already present in the project.

---

# 11. ACCESS REQUESTS & CONSENT FLOW

The consent direction is critical.

Correct flow:

Doctor / Hospital → sends access request → Patient approves or denies.

The Patient app is the consent authority for normal record access.

## Access Requests

Reference:

`access-requests.png`

Include:

- Pending
- Approved
- Denied
- Revoked / Expired if shown
- requester doctor
- hospital
- requested scope
- duration
- request timestamp

Pending requests should expose:

- Review
- Approve
- Deny

---

## Access Request Detail

Reference:

`access-request-detail.png`

Include:

- doctor
- specialty
- hospital
- request purpose
- access scope
- duration
- requested report/data
- privacy explanation
- approve
- deny

Approved access should be revocable where appropriate.

---

## Access History

Reference:

`access-history.png`

Include:

- approved/denied/pending/expired history
- doctor/provider
- hospital
- record/report scope
- request time
- decision time
- status
- filters

---

# 12. EMERGENCY ACCESS FLOW

Emergency access is NOT normal consent access.

It is a break-glass flow.

## Emergency Access Detail

Reference:

`emergency-access-detail.png`

Include:

- doctor
- hospital
- emergency reason
- access granted time
- expiry
- accessed information
- emergency contact notification
- activity log
- revoke action when applicable
- privacy/audit messaging

Represent emergency access as:

- temporary
- audited
- limited
- patient-notified

---

## Emergency Information

Reference:

`emergency-info.png`

Include:

- emergency contacts
- blood group
- known conditions
- allergies
- current medications
- emergency notes
- preferred hospital
- Medical ID setup
- emergency call action if shown

Do not make actual emergency phone calls during testing.

---

# 13. QR / HEALTH RECORD SHARING

## Fullscreen QR

Reference:

`fullscreen-qr.png`

Implement:

- large QR
- short expiry timer mock
- access scope
- patient identity
- Generate New QR
- Share QR
- security explanation

Never encode raw medical history directly inside the QR.

Use a non-sensitive demo token only.

---

# 14. INSURANCE

## Insurance Details

Reference:

`insurance-details.png`

Include:

- insurer
- plan
- policy number
- policyholder
- coverage type
- sum insured
- coverage dates
- active/inactive state
- cashless/network hospital affordances
- claim navigation mock
- uploaded documents
- add document action

Use fictional/demo insurance data.

---

# 15. SETTINGS & PROFILE

Implement missing profile/settings references.

## General Settings

Reference:

`settings.png`

Include the sections shown in the reference, such as:

- profile
- personal information
- privacy/security
- emergency contacts
- notifications
- language
- appearance
- units
- support
- legal/help
- logout

Do not create duplicate pages if corresponding screens already exist.

---

## Notification Settings

Reference:

`notification-settings.png`

Include:

- master notifications switch
- appointments
- lab results
- medications
- health alerts
- wellness/offers
- push/email/SMS
- quiet hours
- critical-alert exception messaging

---

## Privacy & Security

Reference:

`privacy-security.png`

Include:

- biometric login mock
- 2FA mock
- app lock
- login alerts
- data sharing preferences
- access permissions
- download my data
- privacy policy link placeholder
- change password
- active sessions/devices
- delete account confirmation

Do not actually delete local project data.

---

# 16. OPTIONAL / SUPPORTING STATES

Reference collage:

`optional-supporting-screens.png`

Do NOT implement all optional states as standalone routes unless useful.

Instead, create reusable components/dialogs/pages for the following states where relevant:

- Password Reset Success
- Upload Success
- Upload Failure
- No Internet
- Session Expired
- Permission Denied
- Delete Account Confirmation
- Logout Confirmation
- Report Share Success
- Reports Empty State
- Appointments Empty State
- Notifications Empty State
- Generic Error State
- Maintenance Mode
- Location Permission
- Camera Permission
- Unsupported File Type
- Storage Limit Reached

Use them to make existing flows complete.

---

# 17. MOCK DATA ARCHITECTURE

Do not scatter mock data across widgets.

Create typed models and fixtures.

Suggested structure:

```text
patient/lib/shared/models/
patient/lib/shared/mocks/

patient/lib/features/auth/models/
patient/lib/features/reports/models/
patient/lib/features/access_requests/models/
patient/lib/features/ai_analysis/models/
patient/lib/features/profile/models/
```

Reuse a canonical mock patient across the app.

Patient identity should remain consistent across screens.

Examples of fields that must not contradict each other:

- name
- Health ID
- DOB
- gender
- blood group
- allergies
- conditions
- emergency contact
- medication list

Do not invent different identities on different pages unless intentionally modeling another patient.

---

# 18. INTERACTIONS MUST WORK

The Patient app must not be static screenshots.

Implement frontend-only interactions for:

- navigation
- bottom navigation
- tabs
- search
- filters
- forms
- OTP
- password visibility
- report upload mock
- file selection mock
- access approve/deny
- access revoke
- QR refresh
- notification toggles
- quiet hours
- settings
- logout confirmation
- delete-account confirmation
- success/error dialogs
- retry flows
- snackbars/toasts
- empty states

If a button points to a not-yet-existing feature, show a clean placeholder dialog/snackbar rather than leaving it broken.

---

# 19. ROUTING

Use the existing GoRouter architecture.

Add routes only where needed.

Possible route structure:

```text
/
/showcase

/splash
/onboarding
/login
/register
/otp-verification
/forgot-password
/reset-password

/home
/health-card
/health-card/qr

/medical-profile
/personal-information
/allergies-conditions
/medicines
/emergency-contacts

/medical-history

/reports
/reports/upload
/reports/:reportId
/reports/:reportId/share

/ai-analysis/:reportId
/ai-analysis/:reportId/explainability

/access-requests
/access-requests/:requestId
/access-history
/emergency-access/:accessId

/emergency-info
/insurance

/settings
/settings/notifications
/settings/privacy-security
```

Adapt routes to the current architecture instead of blindly replacing working routes.

---

# 20. CODE QUALITY

Requirements:

- Dart analyzer clean
- avoid giant monolithic widget files
- split screens into reusable feature widgets
- reuse design tokens
- use typed models
- avoid duplicated fixtures
- avoid dead routes
- avoid broken buttons
- avoid layout overflow
- avoid unnecessary rebuilds
- keep null safety
- preserve current Riverpod architecture
- use semantic names
- keep widgets testable

---

# 21. RESPONSIVENESS

Primary target:

mobile phones.

Also support:

- small Android devices
- common iPhone-like viewport sizes
- larger phones
- basic tablet scaling where practical

Avoid:

- RenderFlex overflow
- hard-coded widths that break
- clipped buttons
- truncated medical labels where avoidable

Use:

- LayoutBuilder
- Wrap
- Flexible
- Expanded
- responsive padding
- scrollable sections

as needed.

---

# 22. ACCESSIBILITY

Implement:

- semantic labels
- accessible button text
- sufficient contrast
- large enough touch targets
- proper form labels
- keyboard-safe text inputs
- screen-reader-friendly status messaging

Do not rely on color alone to communicate clinical status.

---

# 23. CLINICAL & PRIVACY UI RULES

AI:

- always label as AI-generated
- always show decision-support disclaimer
- never present as final diagnosis

Patient consent:

- patient explicitly approves or denies normal record access

Emergency access:

- separate break-glass flow
- clearly temporary
- audited
- limited
- patient notified

QR:

- no raw medical history embedded

Mock data:

- never present as real patient data

---

# 24. BUILD ORDER

First audit which screens are already implemented.

Then implement only missing features in this order.

## Stage 1 — Auth Completion

- Splash
- Onboarding
- Login
- Register
- OTP
- Forgot Password
- Reset Password

Skip any already-complete screens.

## Stage 2 — Medical Profile

- Medical Profile
- Personal Information
- Allergies & Conditions
- Medicines
- Emergency Contacts

## Stage 3 — Reports

- Reports list
- Upload Report
- Report Detail
- Share Report

## Stage 4 — AI

- AI Analysis
- AI Explainability

## Stage 5 — Consent & Access

- Access Requests
- Access Request Detail
- Access History

## Stage 6 — Emergency

- Emergency Access Detail
- Emergency Information
- Fullscreen QR

## Stage 7 — Insurance & Settings

- Insurance Details
- Settings
- Notification Settings
- Privacy & Security

## Stage 8 — Supporting States

- success
- error
- permission
- confirmation
- empty states

Do not stop after every stage to ask for approval.

Complete the remaining Patient frontend implementation in one run.

---

# 25. VERIFICATION — IMPORTANT USER PREFERENCE

DO NOT launch an Android Emulator.

DO NOT run `flutter run` on an emulator.

The user specifically does not want emulator verification because it causes excessive lag.

Use automated verification only.

Run inside `patient/`:

```bash
dart format --output=none --set-exit-if-changed lib test
flutter analyze
flutter test
```

If formatting fails because files need formatting:

```bash
dart format lib test
```

Then rerun the strict format check.

Fix all analyzer and test issues.

If a web target is already available and a very lightweight browser check is useful, only use it when it does not introduce heavy runtime overhead.

Do not claim emulator verification.

---

# 26. TESTS

Update or add widget tests for major new flows.

At minimum verify:

- app still boots
- existing Home screen still renders
- existing Health Card still renders
- auth navigation
- Reports screen
- Report Detail
- AI Analysis
- Access Requests
- Access Request Detail
- Access History
- Emergency Info
- Insurance
- Notification Settings
- Privacy & Security

Test high-value interactions such as:

- access approve/deny
- filter update
- OTP validation
- password form
- QR route
- notification toggles

Do not overbuild brittle golden tests unless already used by the project.

---

# 27. CURRENT.md UPDATE

After all missing Patient frontend work is complete and automated verification passes, update:

`CURRENT.md`

Record:

- completed patient screens
- routes
- reusable widgets
- models/mocks added
- dependencies added
- format result
- analyzer result
- test result
- known limitations
- remaining Hospital Doctor/Admin/System Admin work
- `FRONTEND_APPROVED: false`

Do NOT globally approve the frontend.

---

# 28. WALKTHROUGH

Create or update Patient walkthrough documentation.

Document:

- implemented routes
- reference → screen mapping
- which screens were already complete and preserved
- newly implemented screens
- access-consent flow
- emergency break-glass flow
- report/AI flow
- QR privacy model
- mock-data architecture
- verification results
- known limitations

---

# 29. DO NOT DO THESE

Do NOT:

- rebuild completed Home screen unnecessarily
- rebuild completed Health Card unnecessarily
- rebuild completed Medical History if already complete
- modify Hospital portal
- modify System Admin portal
- implement backend
- implement Prisma
- implement PostgreSQL
- implement Firebase production integration
- implement real AI inference
- implement real authentication
- embed real medical history in QR
- launch Android Emulator
- run heavy device verification
- create random screens not represented by references or product flow
- add another design system
- duplicate routes
- hardcode all mock data inside widgets
- stop midway for approval
- claim tests passed unless actually executed

---

# 30. DEFINITION OF DONE

The remaining Patient frontend is complete when:

- all Patient references have been audited
- screens already implemented are preserved
- every missing major reference screen is implemented
- navigation is connected
- interactions work with mock data
- consent direction is correct
- emergency access is properly separated
- AI is clearly advisory
- reports flow is connected
- QR sharing uses non-sensitive demo tokens
- settings flows work
- optional support states are reused where appropriate
- no major overflow issues exist
- `dart format --output=none --set-exit-if-changed lib test` passes
- `flutter analyze` reports zero issues
- `flutter test` passes
- `CURRENT.md` is updated
- no backend production work is performed

At completion provide one concise report containing:

1. Already-existing screens preserved
2. New screens implemented
3. Routes added
4. Components/models created
5. Interactions completed
6. Automated verification results
7. Known limitations
8. Exact recommended next task: **Hospital Doctor Portal or Hospital Admin Portal implementation, depending on project state**

Start by auditing `CURRENT.md`, `patient/lib/`, and every file under `design-references/patient/`. Implement only what is genuinely missing.
