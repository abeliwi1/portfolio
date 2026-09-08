import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ALL_TECH_TAGS, PROJECTS } from "../../data/portfolioData";
import { fadeUp, transition } from "../../lib/motion";
import type { Project, TechTag } from "../../types";
import { ProjectCard } from "./ProjectCard";
import { TagFilter } from "./TagFilter";

/** Featured projects first; otherwise keep the order declared in the data file. */
function sortProjects(projects: readonly Project[]): Project[] {
    return [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

function countTags(projects: readonly Project[]): Map<TechTag, number> {
    const counts = new Map<TechTag, number>();
    for (const project of projects) {
        for (const tag of project.techStack) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }
    return counts;
}

/**
 * Filterable project grid. Filtering is a single active tag: it's the
 * fastest mental model for a scanning recruiter and never produces an
 * empty AND-intersection. Cards animate position when the set changes.
 */
export function Projects() {
    const [activeTag, setActiveTag] = useState<TechTag | null>(null);

    const sorted = useMemo(() => sortProjects(PROJECTS), []);
    const counts = useMemo(() => countTags(PROJECTS), []);
    const visible = useMemo(
        () => (activeTag ? sorted.filter((p) => p.techStack.includes(activeTag)) : sorted),
        [sorted, activeTag],
    );

    const toggleTag = (tag: TechTag) => setActiveTag((current) => (current === tag ? null : tag));

    return (
        <div className="space-y-8">
            <TagFilter
                tags={ALL_TECH_TAGS}
                counts={counts}
                active={activeTag}
                onChange={setActiveTag}
                shown={visible.length}
                total={PROJECTS.length}
            />

            <LayoutGroup>
                <motion.ul layout className="grid gap-4 md:grid-cols-2" aria-live="polite">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((project) => (
                            <motion.li
                                key={project.id}
                                layout
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.98, transition: transition.fast }}
                                transition={transition.base}
                                className={`flex ${project.featured ? "md:col-span-2" : ""}`}
                            >
                                <ProjectCard project={project} activeTag={activeTag} onTagClick={toggleTag} />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </LayoutGroup>

            <AnimatePresence>
                {visible.length === 0 && (
                    <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={transition.fast}
                        className="rounded-md border border-dashed border-ink-border px-4 py-10 text-center font-mono text-xs text-text-comment"
                    >
                        {`// no projects tagged "${activeTag}" — `}
                        <button
                            type="button"
                            onClick={() => setActiveTag(null)}
                            className="text-keyword-hover underline decoration-keyword/40 underline-offset-2 hover:decoration-keyword"
                        >
                            clear filter
                        </button>
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
