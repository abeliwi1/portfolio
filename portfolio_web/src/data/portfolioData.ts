import type { Project, TimelineEvent, TechTag } from "../types";

export const PROJECTS: Project[] = [
    {
        id: "fluxtrak",
        title: "FluxTrak",
        description:
            "A high-performance Kanban issue tracker with full drag-and-drop, built to feel like a production tool, not a toy. Includes persisted state, theming, and a normalized store designed for scale.",
        techStack: ["React", "TypeScript", "Tailwind CSS"],
        keyChallenge:
            "Eliminated an infinite re-render loop caused by a Zustand selector returning a new array reference on every call, by memoizing derived state instead of computing it inline.",
        githubUrl: "https://github.com/abeliwi1/FluxTrak-issue-tracker-app",
        liveUrl: "https://abeliwi1.github.io/FluxTrak-issue-tracker-app/",
        featured: true,
    },
    {
        id: "realtime-editor",
        title: "Realtime Collab Editor",
        description:
            "A multiplayer text editor with live cursors and conflict-free merging, built to understand operational transforms from first principles.",
        techStack: ["TypeScript", "Node.js", "WebSockets", "React"],
        keyChallenge:
            "Implemented a simplified OT algorithm to resolve concurrent edits without a CRDT library, handling out-of-order delivery via a per-client operation queue.",
        githubUrl: "https://github.com/andreb/realtime-editor",
        liveUrl: "https://realtime-editor.demo.dev",
    },
    {
        id: "query-planner",
        title: "Toy SQL Query Planner",
        description:
            "A from-scratch SQL parser and cost-based query planner for a subset of SQL, built to demystify how databases choose join orders.",
        techStack: ["Python", "PostgreSQL"],
        keyChallenge:
            "Built a recursive-descent parser and a dynamic-programming join-order optimizer, benchmarked against PostgreSQL's own EXPLAIN output for correctness.",
        githubUrl: "https://github.com/andreb/query-planner",
    },
];

export const TIMELINE: TimelineEvent[] = [
    {
        id: "university",
        type: "education",
        title: "B.S. in Computer Science",
        organization: "Your University",
        startDate: "2022-09",
        endDate: "2026-05",
        description: "Coursework focused on systems, distributed computing, and algorithms.",
        bullets: [
            "Relevant coursework: Data Structures & Algorithms, Operating Systems, Distributed Systems, Databases",
            "Teaching Assistant for Intro to Algorithms (2 semesters)",
        ],
        commitHash: "a3f9c2e",
    },
    {
        id: "internship-prev",
        type: "work",
        title: "Software Engineering Intern",
        organization: "Some Company",
        startDate: "2025-06",
        endDate: "2025-08",
        description: "Worked on the platform team building internal developer tooling.",
        bullets: [
            "Shipped a CLI tool that cut local environment setup time from 45 to 5 minutes",
            "Wrote integration tests that caught 3 production-bound regressions pre-merge",
        ],
        commitHash: "7e1d4b8",
    },
    {
        id: "oss",
        type: "opensource",
        title: "Open Source Contributor",
        organization: "some-popular-repo",
        startDate: "2024-01",
        description: "Ongoing contributions to a mid-sized OSS project's core library.",
        bullets: ["Merged 8 PRs, including a fix for a race condition in the connection pool"],
        commitHash: "c02f6a1",
    },
    {
        id: "club",
        type: "club",
        title: "Club Officer",
        organization: "Competitive Programming Club",
        startDate: "2023-09",
        endDate: "2024-05",
        description: "Organized weekly problem-solving sessions and ran the club's internal ranked ladder.",
        commitHash: "9b5e0d3",
    },
];

export const ALL_TECH_TAGS: TechTag[] = Array.from(
    new Set(PROJECTS.flatMap((p) => p.techStack))
).sort();