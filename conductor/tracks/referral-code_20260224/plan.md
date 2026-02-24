# Implementation Plan: Referral Code & Creator Promotion

## Phase 1: Frontend - Referral Code Input Field

- [x] Task: Update order form state to include referral code field [5d6066f]
    - [x] Add `referralCode` property to `formData` state in `Home.tsx`
    - [x] Update initial state reset to include empty `referralCode`
- [x] Task: Add referral code input UI in order modal [5d6066f]
    - [x] Create new form group with label "রেফারেল কোড (ঐচ্ছিক)"
    - [x] Position after email field, before billing summary
    - [x] Add input field with proper `name`, `id`, and binding to state
    - [x] Apply same styling as other form inputs
    - [x] Add `disabled={isSubmitting}` attribute
- [x] Task: Verify existing `handleInputChange` handles new field [5d6066f]
    - [x] Confirm spread operator pattern works without modification
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Backend - Telegram Integration

- [ ] Task: Update API order handler to accept referral code
    - [ ] Add `referralCode` to request body destructuring in `api/order.ts`
    - [ ] Update Telegram message template to include referral code on separate line
    - [ ] Use same "Not provided" pattern as email for empty values
- [ ] Task: Update form submission to send referral code
    - [ ] Add `referralCode` to the `JSON.stringify` payload in `handleSubmit`
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Footer Creator Promotion Update

- [ ] Task: Update footer in `Home.tsx`
    - [ ] Remove `href` and link wrapper from "made by Shoyeb Morshed" text
    - [ ] Add new paragraph with "Follow me on Facebook, or order sites like this" text
    - [ ] Add Facebook link with proper styling and `target="_blank" rel="noopener noreferrer"`
    - [ ] Maintain existing footer styling and responsive design
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Testing & Verification

- [ ] Task: Write unit tests for referral code functionality
    - [ ] Test referral code field renders in correct position
    - [ ] Test referral code value updates state correctly
    - [ ] Test form submission includes referral code in payload
    - [ ] Test form submission works with empty referral code
- [ ] Task: Write unit tests for footer update
    - [ ] Test "made by Shoyeb Morshed" is not a link
    - [ ] Test new Facebook promotional link exists with correct href
- [ ] Task: Manual testing checklist
    - [ ] Verify referral code field styling matches other inputs
    - [ ] Verify form submission with referral code sends to Telegram
    - [ ] Verify form submission without referral code shows "Not provided"
    - [ ] Verify footer displays correctly on mobile and desktop
    - [ ] Verify dark/light theme compatibility
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
