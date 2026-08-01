# Résumé single source of truth + timeline animation — Design

- **Date:** 2026-07-30
- **Status:** SUPERSEDED — simplified per user ("i want simple so i can easily update")
- **Owner:** Harsh Saw

> **Revision (final, approved): Simple approach.** The LaTeX generator, GitHub Actions,
> and Google Drive / service-account pieces below are **dropped**. Instead:
> `src/data/resume.ts` is the single source of truth; `Career.tsx` renders the timeline
> from it (typing effect → GSAP fade + slide-up); a new print-styled **`/resume` page**
> (`src/components/Resume.tsx`) renders the same data — reachable with no router
> (path check in `App.tsx`; `vercel.json` already rewrites all paths to the SPA).
> The "Download Résumé" links point to `/resume` (view online, or Cmd/Ctrl-P → PDF).
> No CI, no Google Cloud, no LaTeX. Edit one file → site timeline **and** résumé update.
> The sections below are kept for history only.

## Problem

Experience/résumé content lives in **three places that drift apart**:

1. The LaTeX résumé (`\documentclass{resume}`) the user types (currently not in this repo).
2. A Google Drive PDF (manual export) linked from the site — `Contact.tsx:25`, `SocialIcons.tsx:71`.
3. A hardcoded `careerEntries` array in `src/components/Career.tsx` that renders the site timeline.

They are already out of sync (site lists MoreThinks/Fanciti + Freelancer; résumé lists Darwin X and does not). Every update means editing multiple copies by hand.

Separately, the site's experience descriptions animate with a character-by-character **typing effect** (`TypingText` in `Career.tsx`) that reads as gimmicky; the user wants a more professional reveal.

## Goal

Edit **one file** and have both the website timeline and the downloadable PDF update. Replace the typing effect with a professional scroll reveal.

## Locked decisions

| Decision | Choice |
|---|---|
| Single source of truth | `src/data/resume.ts` (typed) |
| PDF delivery | **Google Drive** — CI overwrites the existing Drive file *in place* (same file ID → existing link always serves the latest) |
| Site-only entries | MoreThinks/Fanciti + Freelancer kept via a `websiteOnly` flag (render on site, excluded from generated résumé) |
| Ommuse title | Software Engineer |
| Timeline animation | GSAP ScrollTrigger fade + 24px slide-up, staggered, respects `prefers-reduced-motion` |

## Architecture

### 1. `src/data/resume.ts` — the source of truth

Typed structure holding everything the résumé needs so it can drive both surfaces:

```ts
export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  date: string;          // display string, e.g. "Jul 2026 – Present"
  sortKey: string;       // ISO-ish start date for ordering, e.g. "2026-07"
  blurb: string;         // concise one-paragraph text for the site timeline
  bullets: string[];     // detailed bullets for the LaTeX résumé
  websiteOnly?: boolean; // true → shown on site, omitted from résumé
}

export interface ResumeData {
  basics: { name; phone; location; email; links: {label; url}[]; summary };
  education: { degree; school; date }[];
  experience: ExperienceEntry[];
  projects: { name; stack; liveUrl?; repoUrl?; bullets: string[] }[];
  skills: { category; items: string[] }[];
  achievements: string[];
}

export const resume: ResumeData = { /* ... */ };
```

### 2. `Career.tsx` — reads from the data

- Import `resume.experience`, render the timeline from it.
- Delete the `TypingText` component and its CSS (`career-typed*`, `career-caret`).
- Add a GSAP ScrollTrigger reveal: each `.career-info-box` animates `opacity 0→1`, `y +24px→0`, 0.6s ease-out, staggered ~0.12s down the timeline, fired once when the section enters view. Guard with `prefers-reduced-motion` → no transform, instant show.
- Follow the existing GSAP pattern in `src/components/utils/` (registration/context/cleanup).

### 3. `scripts/build-resume.mjs` — LaTeX generator

- Reads `resume.ts`, renders `resume/resume.tex` from a template.
- Skips entries flagged `websiteOnly`.
- Escapes LaTeX special characters in data-derived text.
- Requires `resume/resume.cls` (the class defining `\job`, `jobitems`, `rSection`, `\name`, `\address`) committed to the repo. **Input needed from user** (or reconstruct).

### 4. `.github/workflows/resume.yml` — CI

Triggered on push to `main` touching `src/data/resume.ts`, `scripts/build-resume.mjs`, or `resume/**`:

1. Checkout + Node setup.
2. `node scripts/build-resume.mjs` → `resume/resume.tex`.
3. Compile with `xu-cheng/latex-action` → `resume.pdf`.
4. `node scripts/upload-to-drive.mjs` → **update** the Drive file's media in place (keep file ID).

No PDF is committed to the repo; the artifact of record lives in Drive.

### 5. `scripts/upload-to-drive.mjs` — Drive updater

- Uses `googleapis` (added as a devDependency; not bundled into the site).
- Auth: service-account JSON from secret `GDRIVE_SA_JSON`, scope `https://www.googleapis.com/auth/drive`.
- `drive.files.update({ fileId: GDRIVE_FILE_ID, media: resume.pdf })` — replaces contents, keeps the ID and share link.

### 6. Site links — unchanged

`Contact.tsx` + `SocialIcons.tsx` keep pointing at the existing Drive URL (file ID `1HbAjcmj3HiaGQHnin8Fgr4x6JFxQfnxo`). Because CI updates that file in place, the link always shows the latest.

## Data flow

```
edit src/data/resume.ts → git push
   ├─ Vercel rebuilds site → new timeline (Career.tsx)
   └─ GitHub Action → generate .tex → compile PDF → update Drive file in place
```

One edit, everywhere.

## Content plan (experience list)

Site renders all; résumé excludes `websiteOnly`. Order = most recent start first.

| Role | Company | Date | On résumé? |
|---|---|---|---|
| AI Automation Engineer | Okanagan College | Jul 2026 – Present | ✅ (from LMS-migration facts) |
| Software Engineer | Ommuse | Nov 2025 – Present | ✅ |
| Software Engineer *(was Teaching Assistant)* | Okanagan College | **[dates needed]** | ✅ |
| Full-Stack ML Engineer (Contract) | Darwin X | Apr 2026 – Jul 2026 | ✅ |
| Full-Stack Developer Intern | MoreThinks (Fanciti) | 2025 | ❌ websiteOnly |
| Software Engineer Intern | Bwisher | Dec 2024 – Jun 2025 | ✅ |
| Full-Stack Developer | Freelancer (Top 2%) | 2023 – | ❌ websiteOnly (also appears in résumé Achievements) |
| Full-Stack Developer Intern | Jythu | Jan 2024 – Dec 2024 | ✅ |

The **AI Automation Engineer** bullets are drawn from the existing résumé Achievement: the sole-developer LMS migration platform (Moodle→Brightspace, 1,500+ staff/instructors, guided workflows, real-time notifications/chat, AI-powered templating). That achievement bullet is then removed from `achievements` to avoid duplication.

## Required inputs from the user

1. **`resume.cls`** — paste or commit it (needed for CI compile). Fallback: reconstruct a matching class.
2. **Software Engineer @ Okanagan (ex-TA) dates.**
3. **Google Cloud / Drive setup** (one-time, only the user can do this):
   1. Google Cloud Console → create/select a project.
   2. Enable **Google Drive API**.
   3. Create a **Service Account** → create a **JSON key** → download.
   4. In Google Drive, share the résumé file (`1HbAjcmj3HiaGQHnin8Fgr4x6JFxQfnxo`) with the service-account email as **Editor**.
   5. GitHub repo → Settings → Secrets and variables → Actions:
      - Secret `GDRIVE_SA_JSON` = the JSON key contents.
      - Variable `GDRIVE_FILE_ID` = `1HbAjcmj3HiaGQHnin8Fgr4x6JFxQfnxo`.

Code is built so that once the secret/variable exist, the pipeline works; nothing else is blocked in the meantime.

## Out of scope (for now)

- Migrating `Work.tsx` (projects) and `TechStack.tsx` to read from `resume.ts` — the structure supports it later.
- Auto-compiling the PDF inside Vercel's build (Vercel lacks a TeX toolchain; CI is the right place).

## Risks / trade-offs

- **Drive automation needs credentials** the user must provision (service account); if the key is revoked/expired the upload step fails loudly in CI (visible, not silent).
- Service account updates a **user-owned file shared as Editor**, so it does not consume the SA's (zero) storage quota; scope `drive` is required because `drive.file` won't see a pre-existing file.
- A data change triggers a site deploy and a separate Drive upload; they are independently eventually-consistent.

## Verification

- `resume.ts` type-checks (`tsc -b`) and site builds (`npm run build`).
- `Career.tsx` renders every entry; reveal works and is disabled under reduced-motion.
- `node scripts/build-resume.mjs` produces valid `resume.tex`; local `latexmk`/`xu-cheng` compile yields a PDF matching the current layout.
- Dry-run the Drive update against a throwaway file before pointing at the real one.
