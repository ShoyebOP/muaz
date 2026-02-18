# Implementation Plan: Book Preview and Footer Link

This plan outlines the steps to add a "Pore Dekhun" button, a dedicated preview page with an image carousel, and a footer attribution link, following the project's TDD workflow.

## Phase 1: Environment & Routing Setup
- [x] Task: Install dependencies (`react-router-dom`, `vitest`, `@testing-library/react`, `jsdom`, `@testing-library/jest-dom`) 1daa649
- [ ] Task: Configure `vitest` in `vite.config.ts` and add `test` script to `package.json`
- [ ] Task: Implement basic routing in `main.tsx` and `App.tsx` (Home and `/preview` routes)
- [ ] Task: Create a placeholder `Preview` component in `src/Preview.tsx`
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Main Page & Footer Enhancements
- [ ] Task: Write tests for "Pore Dekhun" button and footer link in `App.test.tsx`
- [ ] Task: Implement "Pore Dekhun" button in `App.tsx` (Bangla: "পড়ে দেখুন") near the order button
- [ ] Task: Implement footer attribution link "made by Shoyeb Morshed" linking to Facebook in `App.tsx`
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Preview Page Implementation
- [ ] Task: Write tests for `Preview` component (image rendering, navigation back) in `Preview.test.tsx`
- [ ] Task: Implement `Preview` component with a horizontal carousel for images in `/book/page 1-4.jpg`
- [ ] Task: Style the carousel to be centered with empty sides on large screens and touch-friendly on mobile
- [ ] Task: Add a "Back" button to the `Preview` page to return to the landing page
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Final Polish & Quality Assurance
- [ ] Task: Perform responsive testing on mobile and desktop views
- [ ] Task: Run full test suite and ensure >80% code coverage for new components
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
