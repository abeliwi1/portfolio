/**
 * Central type definitions for the portfolio.
 *
 * Everything rendered on the page is derived from data typed here and
 * declared in `src/data/portfolioData.ts`. Components never hard-code copy.
 */

/** Closed set of technologies so a typo in one project can't silently create a new filter chip. */
export type TechTag =
    | "TypeScript"
    | "JavaScript"
    | "React"
    | "Next.js"
    | "Node.js"
    | "Go"
    | "Python"
    | "Rust"
    | "PostgreSQL"
    | "Redis"
    | "Docker"
    | "GraphQL"
    | "WebSockets"
    | "Tailwind CSS";

export interface Project {
    /** Stable slug. Used as the React key and as the anchor id (`#project-<id>`). */
    id: string;
    title: string;
    /** Two sentences max — cards are scanned, not read. */
    description: string;
    techStack: readonly TechTag[];
    /** The single "Key Engineering Challenge Solved" bullet shown on the card. */
    keyChallenge: string;
    githubUrl: string;
    liveUrl?: string;
    /** Featured projects are sorted first and may span two grid columns. */
    featured?: boolean;
}

export type TimelineEventType = "education" | "work" | "opensource" | "club";

export interface TimelineEvent {
    id: string;
    type: TimelineEventType;
    title: string;
    organization: string;
    /** ISO year-month, e.g. "2024-09". Rendered git-log style in Step 3. */
    startDate: string;
    /** Omitted while the event is ongoing (rendered as "present"). */
    endDate?: string;
    description: string;
    bullets?: readonly string[];
    /** Short hex-like id rendered like a commit hash in Step 3, e.g. "a3f9c2e". Purely cosmetic. */
    commitHash: string;
}

/** Anchors that exist on the single page. The union keeps nav links and section ids in sync. */
export type SectionId = "hero" | "projects" | "timeline";

export interface NavItem {
    id: SectionId;
    label: string;
}

export interface SocialLinks {
    github: string;
    linkedin: string;
    /** Path to the PDF under `public/`, e.g. "/resume.pdf". */
    resume: string;
    email?: string;
}

export interface Profile {
    name: string;
    /** Bold headline role, e.g. "Software Engineering Student". */
    role: string;
    /** Two-sentence value proposition for the hero. */
    tagline: string;
    /** Short status line shown in the navbar, e.g. "open to SWE internships · Summer 2027". */
    availability: string;
    location: string;
    links: SocialLinks;
}
