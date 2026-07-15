# Contact Recomposition

Date: 2026-07-15

## Previous state

- Sidebar-like composition.
- Administrative form feeling.
- Closing section felt too boxed and too long.

## Current state

- New editorial opening line at the top.
- Real contact details remain visible before the form.
- Form sits in normal page flow.
- Button is honestly disabled when the real endpoint is unavailable outside QA mock mode.

## Runtime rule

Displayed message:

`El formulario online estara disponible proximamente. Mientras tanto, puedes escribirnos o llamarnos directamente.`

## Files

- `src/features/contact/ContactSection.tsx`
- `src/features/contact/ContactForm.tsx`
- `src/features/contact/ContactFormFields.tsx`
- `src/features/contact/contact.css`
