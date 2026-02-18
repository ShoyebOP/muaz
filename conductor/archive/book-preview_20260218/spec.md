# Specification: Book Preview and Footer Link

## Overview
This track involves adding a "Pore Dekhun" (Read More) button to the main landing page that navigates users to a dedicated preview page showcasing four sample pages of the book. Additionally, a footer attribution link will be added to credit the developer.

## Functional Requirements
- **Main Page:**
    - Add a button with the Bangla text "পড়ে দেখুন" in a prominent CTA section near the "Order" button.
    - Clicking the button must navigate the user to a new route `/preview`.
- **Preview Page (`/preview`):**
    - Implement a horizontal image slider/carousel displaying the four preview images from the `/book` folder (`page 1.jpg`, `page 2.jpg`, `page 3.jpg`, `page 4.jpg`).
    - On large screens, the active page must be centered with empty space on either side.
    - Provide a way to navigate back to the main landing page.
- **Footer:**
    - Add the text "made by Shoyeb Morshed" to the footer.
    - The text must be a link to `https://www.facebook.com/shoyeb.morshed.3`.
    - The link must open in a new browser tab (`target="_blank"`).

## Non-Functional Requirements
- **Responsiveness:** The image slider must be touch-friendly for mobile users and properly centered on desktops.
- **Design:** The new elements must match the existing "professional" and "elegant" design aesthetic of the site.

## Acceptance Criteria
- [ ] "Pore Dekhun" button is visible and styled correctly near the order button.
- [ ] Clicking the button navigates to `/preview`.
- [ ] `/preview` page renders a centered carousel with the four images.
- [ ] Footer link exists, is styled appropriately, and opens the correct Facebook profile in a new tab.
- [ ] Navigation back from `/preview` to the home page works correctly.

## Out of Scope
- Adding a shopping cart or complex state management.
- Backend integration for image uploading (images are static in the `/book` folder).
