# Legacy 3D Reference Notes

## Summary
The `3d-ref/` directory appears to be an older or reference portfolio implementation. It should not be merged directly into the main profile archive because it contains content that conflicts with the active portfolio data in `src/data`.

## Why It Is Separated
- The career history in `3d-ref/src/components/Career.tsx` refers to a different professional background, including Adobe, Genpact Headstrong, and Infogain.
- The active profile in `src/data/profile.ts` identifies the portfolio owner as Harsh Kumar Saw with a different work timeline.
- The work samples in `3d-ref/src/components/Work.tsx` include projects such as CallHQ, WhatsApp Automation, Broki, and Orrdr, which are not part of the active project list in `src/data/projects.ts`.

## Relevant Legacy Items Found

### Legacy Career Content
- Co-Founder, CallHQ.ai
- Adobe experience from 2017 to 2024
- Consultant at Genpact Headstrong
- Software engineering role at Infogain

### Legacy Project Carousel
- CallHQ
- Whatsapp Automation
- Broki
- Orrdr.com

### Legacy Tech Visuals
The 3D reference app includes a floating visual stack of:
- React
- Next.js
- Node.js
- Express
- MongoDB
- MySQL
- TypeScript
- JavaScript

## Recommendation
Use `src/data/*` as the authoritative content source for the current portfolio. Keep `3d-ref/` only as:
- design inspiration
- legacy reference
- optional source for visuals or interaction ideas

## Source Notes
- Reviewed from:
  - `3d-ref/src/components/Career.tsx`
  - `3d-ref/src/components/Work.tsx`
  - `3d-ref/src/components/TechStack.tsx`
