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
│   └── Resume_Andrew_Beliwine_2026_2027.pdf
└── src/
    ├── main.tsx
    ├── App.tsx                        Composes the shell; sections slot in here
    ├── index.css                      Tailwind layers, caret + ruled-background utilities
    ├── types/index.ts                 Project, TimelineEvent, Profile, NavItem, SectionId
    ├── data/portfolioData.ts          All copy and mock data — the only file to edit for content
    ├── hooks/useActiveSection.ts      IntersectionObserver → active nav item
    ├── lib/motion.ts                  Shared Framer Motion variants (fadeUp, stagger)
    └── components/
        ├── layout/
        │   ├── EditorTab.tsx          Sticky glass navbar (tab strip, outline, resume, mobile menu)
        │   ├── PageWrapper.tsx        Responsive column + left gutter rule
        │   ├── Section.tsx            Anchor + "// 02  Title" header frame
        │   └── StatusBar.tsx          Footer as editor status bar
        └── ui/
            ├── BrandIcons.tsx         GitHub / LinkedIn marks (dropped from Lucide v1)
            └── ExternalLink.tsx       Anchor with target/rel handling
```

## Roadmap

- [x] Step 1 — types, data, layout shell
- [ ] Step 2 — Hero + interactive projects grid with tag filtering
- [ ] Step 3 — Experience timeline + inverse-kinematics robotic arm easter egg
