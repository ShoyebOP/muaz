# Implementation Plan: Referral Code & Creator Promotion

## Phase 1: Frontend - Referral Code Input Field [checkpoint: 922cce6]

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
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Backend - Telegram Integration [checkpoint: 285d364]

- [x] Task: Update API order handler to accept referral code [2a37755]
    - [x] Add `referralCode` to request body destructuring in `api/order.ts`
    - [x] Update Telegram message template to include referral code on separate line
    - [x] Use same "Not provided" pattern as email for empty values
- [x] Task: Update form submission to send referral code [5d6066f]
    - [x] Add `referralCode` to the `JSON.stringify` payload in `handleSubmit`
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Footer Creator Promotion Update [checkpoint: dbe1e86]

- [x] Task: Update footer in `Home.tsx` [dbe1e86]
    - [x] Remove `href` and link wrapper from "made by Shoyeb Morshed" text
    - [x] Add new paragraph with "Follow me on Facebook, or order sites like this" text
    - [x] Add Facebook link with proper styling and `target="_blank" rel="noopener noreferrer"`
    - [x] Maintain existing footer styling and responsive design
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Testing & Verification [checkpoint: dbe1e86]

- [x] Task: Write unit tests for referral code functionality [dbe1e86]
    - [x] Test referral code field renders in correct position
    - [x] Test referral code value updates state correctly
    - [x] Test form submission includes referral code in payload
    - [x] Test form submission works with empty referral code
- [x] Task: Write unit tests for footer update [dbe1e86]
    - [x] Test "made by Shoyeb Morshed" is not a link
    - [x] Test new Facebook promotional link exists with correct href
- [x] Task: Manual testing checklist [dbe1e86]
    - [x] Verify referral code field styling matches other inputs
    - [x] Verify form submission with referral code sends to Telegram
    - [x] Verify form submission without referral code shows "Not provided"
    - [x] Verify footer displays correctly on mobile and desktop
    - [x] Verify dark/light theme compatibility
- [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
