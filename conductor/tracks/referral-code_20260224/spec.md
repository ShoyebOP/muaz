# Track Specification: Referral Code & Creator Promotion

## Overview
This track adds an optional referral code input field to the order form and updates the footer to include a call-to-action for the creator's Facebook profile and services.

## Functional Requirements

### 1. Referral Code Input Field
- **FR-1.1:** Add a new optional input field labeled "রেফারেল কোড (ঐচ্ছিক)" in the order form
- **FR-1.2:** Position the field immediately after the email input field, before the billing summary
- **FR-1.3:** No validation required - accept any text input (letters, numbers, symbols, empty)
- **FR-1.4:** Field should be styled consistently with other form inputs
- **FR-1.5:** Field should be disabled during form submission (like other fields)

### 2. Telegram Message Integration
- **FR-2.1:** Capture the referral code value from the form
- **FR-2.2:** Send referral code to the Telegram API in the order payload
- **FR-2.3:** Display referral code on a separate line in the Telegram message
- **FR-2.4:** If referral code is empty, display "Not provided" (same pattern as email field)
- **FR-2.5:** Telegram message format update:
  ```
  📚 *New Order Received!*
  -----------------------
  *Book:* ${bookName}
  *Customer:* ${name}
  *Phone:* ${phone}
  *Address:* ${address}
  *Email:* ${email || 'Not provided'}
  *Referral Code:* ${referralCode || 'Not provided'}
  *Total Amount:* ${totalAmount} TK
  -----------------------
  ```

### 3. Footer Creator Promotion Update
- **FR-3.1:** Keep the existing line "made by Shoyeb Morshed" as plain text (remove the hyperlink to Facebook)
- **FR-3.2:** Add a new separate line below it: "Follow me on Facebook, or order sites like this" with the Facebook link (https://www.facebook.com/shoyeb.morshed.3)
- **FR-3.3:** The new link should use the same styling as existing footer links (gold accent color, `target="_blank" rel="noopener noreferrer"`)
- **FR-3.4:** Maintain the same font size and opacity as existing footer text

## Non-Functional Requirements
- **NFR-1:** Maintain existing form validation behavior
- **NFR-2:** No breaking changes to existing order API schema (referral code is additive)
- **NFR-3:** Preserve existing theme (light/dark mode) compatibility
- **NFR-4:** Maintain mobile-first responsive design
- **NFR-5:** Footer changes must be responsive and maintain visual hierarchy

## Acceptance Criteria
1. ✅ Referral code field appears after email field in order modal
2. ✅ Referral code accepts any input (or empty) without validation errors
3. ✅ Referral code is sent to Telegram API and appears on separate line
4. ✅ Empty referral code displays as "Not provided" in Telegram message
5. ✅ "made by Shoyeb Morshed" is now plain text (no hyperlink)
6. ✅ New promotional line with Facebook link added to footer
7. ✅ All existing tests continue to pass
8. ✅ Form submission works correctly with and without referral code
9. ✅ Mobile responsive design is preserved

## Out of Scope
- Referral code validation or discount logic
- Referral tracking or analytics system
- Complex referral program functionality
