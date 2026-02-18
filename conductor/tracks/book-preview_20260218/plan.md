# Implementation Plan: Book Preview and Footer Link

This plan outlines the steps to add a "Pore Dekhun" button, a dedicated preview page with an image carousel, and a footer attribution link, following the project's TDD workflow.

## Phase 1: Environment & Routing Setup [checkpoint: 9243443]
- [x] Task: Install dependencies (`react-router-dom`, `vitest`, `@testing-library/react`, `jsdom`, `@testing-library/jest-dom`) 1daa649
- [x] Task: Configure `vitest` in `vite.config.ts` and add `test` script to `package.json` 869513a
- [x] Task: Implement basic routing in `main.tsx` and `App.tsx` (Home and `/preview` routes) 742cc30
- [x] Task: Create a placeholder `Preview` component in `src/Preview.tsx` fa0b0ac
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) 9243443

## Phase 2: Main Page & Footer Enhancements [checkpoint: 1968ffe]
- [x] Task: Write tests for "Pore Dekhun" button and footer link in `App.test.tsx` 539b484
- [x] Task: Implement "Pore Dekhun" button in `App.tsx` (Bangla: "পড়ে দেখুন") near the order button 6a05c36
- [x] Task: Implement footer attribution link "made by Shoyeb Morshed" linking to Facebook in `App.tsx` 6a05c36
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) 1968ffe

## Phase 3: Preview Page Implementation
- [x] Task: Write tests for `Preview` component (image rendering, navigation back) in `Preview.test.tsx` 209f37e
- [x] Task: Implement `Preview` component with a horizontal carousel for images in `/book/page 1-4.jpg` f058883
- [x] Task: Style the carousel to be centered with empty sides on large screens and touch-friendly on mobile f058883
- [ ] Task: Add a "Back" button to the `Preview` page to return to the landing page
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Final Polish & Quality Assurance
- [ ] Task: Perform responsive testing on mobile and desktop views
- [ ] Task: Run full test suite and ensure >80% code coverage for new components
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
