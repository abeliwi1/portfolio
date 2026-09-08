import { motion } from "framer-motion";
import { ArrowUpRight, Star, Wrench } from "lucide-react";
import { transition } from "../../lib/motion";
import type { Project, TechTag } from "../../types";
import { GithubIcon } from "../ui/BrandIcons";
import { ExternalLink } from "../ui/ExternalLink";
import { TechBadge } from "../ui/TechBadge";

interface ProjectCardProps {
    project: Project;
    activeTag: TechTag | null;
    onTagClick: (tag: TechTag) => void;
}

/**
 * One repository. Reads top-to-bottom the way a recruiter scans: name,
 * what it is, what it's built with, the hardest problem solved, the links.
 * Tech badges are clickable and drive the grid filter.
 */
export function ProjectCard({ project, activeTag, onTagClick }: ProjectCardProps) {
    const repoPath = `~/${project.id}`;

    return (
        <motion.article
            whileHover={{ y: -2 }}
            transition={transition.fast}
            id={`project-${project.id}`}
            className="group relative flex w-full flex-col rounded-md border border-ink-border bg-ink-surface/70 transition-colors duration-200 hover:border-ink-borderStrong hover:shadow-lift"
        >
            <header className="flex items-center gap-2 border-b border-ink-border px-4 py-2 font-mono text-2xs text-text-comment">
                <span className="truncate">{repoPath}</span>
                {project.featured && (
                    <span className="inline-flex items-center gap-1 text-string">
                        <Star size={10} aria-hidden className="fill-current" />
                        featured
                    </span>
                )}
                <ExternalLink
                    href={project.githubUrl}
                    aria-label={`${project.title} on GitHub`}
                    className="ml-auto rounded-sm p-0.5 text-text-comment transition-colors hover:text-text-primary"
                >
                    <GithubIcon size={13} />
                </ExternalLink>
            </header>

            <div className={`flex flex-1 flex-col gap-4 p-4 sm:p-5 ${project.featured ? "md:grid md:grid-cols-2 md:gap-x-8" : ""}`}>
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold tracking-tight text-text-primary">
                        <ExternalLink
                            href={project.liveUrl ?? project.githubUrl}
                            className="transition-colors hover:text-keyword-hover"
                        >
                            {project.title}
                        </ExternalLink>
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>
                    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                        {project.techStack.map((tag) => (
                            <li key={tag}>
                                <TechBadge tag={tag} active={activeTag === tag} onClick={onTagClick} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="border-l-2 border-keyword/60 pl-3">
                        <p className="mb-1 inline-flex items-center gap-1.5 font-mono text-2xs text-text-comment">
                            <Wrench size={11} aria-hidden />
                            key challenge solved
                        </p>
                        <p className="text-sm leading-relaxed text-text-primary/90">{project.keyChallenge}</p>
                    </div>

                    <footer className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-mono text-xs">
                        <ExternalLink
                            href={project.githubUrl}
                            className="inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-text-primary"
                        >
                            <GithubIcon size={13} />
                            source
                        </ExternalLink>
                        {project.liveUrl ? (
                            <ExternalLink
                                href={project.liveUrl}
                                className="inline-flex items-center gap-1 text-keyword-hover transition-colors hover:text-text-primary"
                            >
                                live demo
                                <ArrowUpRight
                                    size={12}
                                    aria-hidden
                                    className="transition-transform duration-200 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </ExternalLink>
                        ) : (
                            <span className="text-text-comment">no demo · CLI / library</span>
                        )}
                    </footer>
                </div>
            </div>
        </motion.article>
    );
}
