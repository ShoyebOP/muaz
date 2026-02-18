# Implementation Plan: Fix Preview Images and Add Phone Validation

## Phase 1: Asset Reorganization and Preview Fix [checkpoint: a2bfb7e]
- [x] Task: Reorganize and normalize preview images fb0f1af
    - [x] Create `public/book/` if not already present (Verify: `ls public/book`)
    - [x] Rename and move `book/page 1.jpg` to `public/book/page-1.jpg`
    - [x] Rename and move `book/page 2.jpg` to `public/book/page-2.jpg`
    - [x] Rename and move `book/page 3.jpg` to `public/book/page-3.jpg`
    - [x] Rename and move `book/page 4.jpg` to `public/book/page-4.jpg`
    - [x] Move `book/book.jpg` to `public/book/book.jpg` (if not already there and correctly referenced)
- [x] Task: Update `Preview.tsx` to use new image paths 02fc463
    - [x] Update the `images` array in `src/pages/Preview.tsx` to use the normalized paths (e.g., `/book/page-1.jpg`)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Asset Reorganization' (Protocol in workflow.md)

## Phase 2: Phone Number Validation (TDD) [checkpoint: 96c317a]
- [x] Task: Write failing tests for phone number validation 96c317a
    - [x] Create a new test file or update `src/pages/Home.test.tsx` (if it exists, otherwise create it)
    - [x] Add test cases to verify that a phone number must be exactly 11 digits and contain only numbers
    - [x] Confirm tests fail (`npm test`)
- [x] Task: Implement phone number validation in `Home.tsx` 96c317a
    - [x] Add `pattern="[0-9]{11}"` and `maxLength={11}` to the phone input in `src/pages/Home.tsx`
    - [x] Add a validation check in the `handleSubmit` function to ensure exactly 11 digits before proceeding with the fetch call
    - [x] Add error messaging (Bengali) for validation failures
- [x] Task: Verify implementation and coverage 96c317a
    - [x] Run tests to confirm they pass (`npm test`)
    - [x] Check code coverage for the new validation logic (`npm run coverage`)
- [x] Task: Conductor - User Manual Verification 'Phase 2: Phone Number Validation' (Protocol in workflow.md)

## Phase 3: Final Integration and Cleanup [checkpoint: 96c317a]
- [x] Task: Final project-wide check 03ae540
    - [x] Run a full build to ensure no regression (`npm run build`)
    - [x] Check for any unused images in the old `book/` directory and remove them if safe
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Integration' (Protocol in workflow.md)
