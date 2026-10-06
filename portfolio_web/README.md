# portfolio_web

Single-page software engineering portfolio. React 19 + TypeScript (strict) + Vite, styled with Tailwind CSS, animated with Framer Motion, icons from Lucide.

The page is presented as a source file open in an editor: the navbar is the tab strip, sections are numbered like a symbol outline, the footer is the status bar, and the palette is named after syntax tokens (`keyword` accent, `comment` muted text, `string` highlight).

## Scripts

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # tsc -b && vite build
pnpm lint
```

## Structure

```
portfolio_web/
├── index.html                         Fonts (IBM Plex Sans, JetBrains Mono), meta
├── tailwind.config.ts                 Design tokens
├── public/
│   ├── favicon.svg
│   └── Andrew_Beliwine_Resume.pdf
└── src/
    ├── main.tsx
    ├── App.tsx                        Composes the shell; sections slot in here
    ├── index.css                      Tailwind layers, caret + ruled-background utilities
    ├── types/index.ts                 Project, TimelineEvent, Profile, NavItem, SectionId
    ├── data/portfolioData.ts          All copy and mock data — the only file to edit for content
    ├── hooks/useActiveSection.ts      Scroll-spy → active nav item
    ├── lib/
    │   ├── motion.ts                  Shared Framer Motion variants (fadeUp, stagger)
    │   ├── kinematics.ts              Pure two-link inverse/forward kinematics
    │   └── date.ts                    Month formatting, newest-first sort
    └── components/
        ├── layout/
        │   ├── EditorTab.tsx          Sticky glass navbar (tab strip, outline, resume, mobile menu)
        │   ├── PageWrapper.tsx        Responsive column + left gutter rule
        │   ├── Section.tsx            Anchor + "// 02  Title" header frame
        │   └── StatusBar.tsx          Footer as editor status bar
        ├── sections/
        │   ├── Hero.tsx               Headline, value prop, CTA buttons, profile.json panel
        │   ├── Projects.tsx           Filter state + animated grid
        │   ├── TagFilter.tsx          "$ filter --tag" chip row
        │   ├── ProjectCard.tsx        Repo card
        │   ├── Timeline.tsx           git-log style experience list
        │   └── TimelineItem.tsx       One commit
        ├── easter-egg/
        │   └── RoboticArm.tsx         Cursor-tracking IK arm, fixed bottom-right (mouse + ≥ md only)
        └── ui/
            ├── BrandIcons.tsx         GitHub / LinkedIn marks (dropped from Lucide v1)
            ├── ExternalLink.tsx       Anchor with target/rel handling
            ├── LinkButton.tsx         Primary / ghost call-to-action
            └── TechBadge.tsx          Monospace tech chip (clickable when filtering)
```

## Editing content

Everything on the page comes from `src/data/portfolioData.ts`. Replace the placeholder LinkedIn URL and email in `PROFILE.links`, swap the `TIMELINE` entries for real ones, and drop the resume PDF into `public/`. Adding a technology means adding it to the `TechTag` union in `src/types/index.ts` first; the compiler then keeps every project and filter chip in sync.

## Roadmap

- [x] Step 1 — types, data, layout shell
- [x] Step 2 — Hero + interactive projects grid with tag filtering
- [x] Step 3 — Experience timeline + inverse-kinematics robotic arm easter egg
