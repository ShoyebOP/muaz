# Implementation Plan: Fix Preview Images and Add Phone Validation

## Phase 1: Asset Reorganization and Preview Fix
- [ ] Task: Reorganize and normalize preview images
    - [ ] Create `public/book/` if not already present (Verify: `ls public/book`)
    - [ ] Rename and move `book/page 1.jpg` to `public/book/page-1.jpg`
    - [ ] Rename and move `book/page 2.jpg` to `public/book/page-2.jpg`
    - [ ] Rename and move `book/page 3.jpg` to `public/book/page-3.jpg`
    - [ ] Rename and move `book/page 4.jpg` to `public/book/page-4.jpg`
    - [ ] Move `book/book.jpg` to `public/book/book.jpg` (if not already there and correctly referenced)
- [ ] Task: Update `Preview.tsx` to use new image paths
    - [ ] Update the `images` array in `src/pages/Preview.tsx` to use the normalized paths (e.g., `/book/page-1.jpg`)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Asset Reorganization' (Protocol in workflow.md)

## Phase 2: Phone Number Validation (TDD)
- [ ] Task: Write failing tests for phone number validation
    - [ ] Create a new test file or update `src/pages/Home.test.tsx` (if it exists, otherwise create it)
    - [ ] Add test cases to verify that a phone number must be exactly 11 digits and contain only numbers
    - [ ] Confirm tests fail (`npm test`)
- [ ] Task: Implement phone number validation in `Home.tsx`
    - [ ] Add `pattern="[0-9]{11}"` and `maxLength={11}` to the phone input in `src/pages/Home.tsx`
    - [ ] Add a validation check in the `handleSubmit` function to ensure exactly 11 digits before proceeding with the fetch call
    - [ ] Add error messaging (Bengali) for validation failures
- [ ] Task: Verify implementation and coverage
    - [ ] Run tests to confirm they pass (`npm test`)
    - [ ] Check code coverage for the new validation logic (`npm run coverage`)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Phone Number Validation' (Protocol in workflow.md)

## Phase 3: Final Integration and Cleanup
- [ ] Task: Final project-wide check
    - [ ] Run a full build to ensure no regression (`npm run build`)
    - [ ] Check for any unused images in the old `book/` directory and remove them if safe
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Integration' (Protocol in workflow.md)
