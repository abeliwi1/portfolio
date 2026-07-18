/**
 * Central type definitions for the portfolio.
 */

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
    id: string;
    title: string;
    description: string;
    techStack: TechTag[];
    keyChallenge: string;
    githubUrl: string;
    liveUrl?: string;
    featured?: boolean;
}

export type TimelineEventType = "education" | "work" | "opensource" | "club";

export interface TimelineEvent {
    id: string;
    type: TimelineEventType;
    title: string;
    organization: string;
    /** ISO strings, e.g. "2024-09" — doubles as a git-log-style date in Step 3. */
    startDate: string;
    endDate?: string;
    description: string;
    bullets?: string[];
    /** Short hex-like id rendered like a commit hash in Step 3, e.g. "a3f9c2e". Purely cosmetic. */
    commitHash: string;
}