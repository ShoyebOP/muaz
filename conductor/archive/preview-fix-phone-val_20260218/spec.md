# Track Specification: Fix Preview Images and Add Phone Validation

## Overview
This track addresses two issues:
1.  **Bug Fix:** Preview images are not loading on the deployed Vercel site due to incorrect file location and spaces in filenames.
2.  **Feature:** Implement a 11-digit phone number validator in the order form to ensure valid customer contact details.

## Functional Requirements

### 1. Preview Images Fix
-   **Asset Location:** Move preview images from the root `book/` directory to `public/book/` to ensure they are correctly served as static assets by Vite and Vercel.
-   **Filename Normalization:** Rename image files to remove spaces (e.g., `page 1.jpg` -> `page-1.jpg`) to improve compatibility across different environments.
-   **Code Update:** Update `src/pages/Preview.tsx` to reference the new filenames.

### 2. Phone Number Validation
-   **Length Requirement:** The phone number input in the order form must accept exactly 11 digits.
-   **Character Restriction:** Only numeric digits (0-9) should be allowed.
-   **User Feedback:** 
    -   Use HTML5 `pattern` attribute for immediate browser-level validation.
    -   Add a custom validation check in the `handleSubmit` function in `src/pages/Home.tsx` to prevent submission if the number is invalid.
    -   Display an appropriate error message to the user if the validation fails.

## Non-Functional Requirements
-   **Maintainability:** Use consistent naming conventions for assets.
-   **User Experience:** Ensure the validation message is clear and helpful (in Bengali, matching the site's language).

## Acceptance Criteria
- [ ] Preview images load correctly on the local development server.
- [ ] Preview images load correctly on the deployed Vercel site.
- [ ] Order form prevents submission if the phone number is not exactly 11 digits.
- [ ] Order form allows submission when a valid 11-digit phone number is provided.
- [ ] Error message appears for invalid phone numbers.

## Out of Scope
-   Changing the overall design of the order form or preview page.
-   Implementing server-side validation (this track focuses on client-side).
