import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { PROFILE } from "../../data/portfolioData";
import { fadeUp, stagger } from "../../lib/motion";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { LinkButton } from "../ui/LinkButton";
import { TechBadge } from "../ui/TechBadge";

/**
 * Hero: role headline, two-sentence value proposition, and the three links a
 * recruiter needs immediately. On large screens each block is numbered like
 * editor lines, and a "facts" panel on the right summarises status, target
 * term, location and primary stack as a small syntax-highlighted object.
 */
export function Hero() {
    const [firstSentence, ...rest] = PROFILE.tagline.split(/(?<=\.)\s+/);

    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16"
        >
            <div className="space-y-7">
                <Line n={1}>
                    <motion.p variants={fadeUp} className="font-mono text-xs text-text-comment">
                        <span className="text-keyword">{PROFILE.name.toLowerCase().replace(" ", ".")}</span>
                        <span className="mx-2 text-ink-borderStrong">·</span>
                        {PROFILE.location}
                    </motion.p>
                </Line>

                <Line n={2}>
                    <motion.h1
                        variants={fadeUp}
                        className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
                    >
                        {PROFILE.role}
                        <span className="text-keyword">.</span>
                    </motion.h1>
                </Line>

                <Line n={3}>
                    <motion.p
                        variants={fadeUp}
                        className="max-w-xl text-pretty text-base leading-relaxed text-text-secondary sm:text-lg"
                    >
                        <span className="text-text-primary">{firstSentence}</span> {rest.join(" ")}
                    </motion.p>
                </Line>

                <Line n={4}>
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                        <LinkButton
                            href={PROFILE.links.resume}
                            variant="primary"
                            icon={<FileText size={16} aria-hidden />}
                            hint="pdf"
                        >
                            Resume
                        </LinkButton>
                        <LinkButton href={PROFILE.links.github} icon={<GithubIcon size={16} />}>
                            GitHub
                        </LinkButton>
                        <LinkButton href={PROFILE.links.linkedin} icon={<LinkedinIcon size={16} />}>
                            LinkedIn
                        </LinkButton>
                    </motion.div>
                </Line>

                <Line n={5} className="hidden lg:block">
                    <motion.a
                        variants={fadeUp}
                        href="#projects"
                        className="group inline-flex items-center gap-2 font-mono text-xs text-text-comment transition-colors hover:text-text-secondary"
                    >
                        <ArrowDown
                            size={12}
                            aria-hidden
                            className="transition-transform duration-200 ease-snap group-hover:translate-y-0.5"
                        />
                        scroll · <span className="text-keyword-dim group-hover:text-keyword">02</span> projects
                    </motion.a>
                </Line>
            </div>

            <FactsPanel />
        </motion.div>
    );
}

/** Wraps a hero block with a line number in the gutter on `lg+`. */
function Line({ n, children, className = "" }: { n: number; children: ReactNode; className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <span
                aria-hidden
                className="absolute -left-10 top-1.5 hidden w-6 select-none text-right font-mono text-2xs tabular-nums text-text-comment/70 lg:block"
            >
                {n}
            </span>
            {children}
        </div>
    );
}

/** Recruiter summary rendered as a small object literal. */
function FactsPanel() {
    return (
        <motion.aside
            variants={fadeUp}
            aria-label="Quick facts"
            className="rounded-md border border-ink-border bg-ink-surface/70 shadow-lift"
        >
            <div className="flex items-center gap-2 border-b border-ink-border px-4 py-2 font-mono text-2xs text-text-comment">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal-green" />
                profile.json
                <span className="ml-auto">read-only</span>
            </div>

            <dl className="space-y-3 px-4 py-4 font-mono text-xs leading-5">
                <Fact k="status">
                    <span className="text-string">"{PROFILE.availability.split(" · ")[0]}"</span>
                </Fact>
                <Fact k="target">
                    <span className="text-string">"{PROFILE.target}"</span>
                </Fact>
                <Fact k="location">
                    <span className="text-string">"{PROFILE.location}"</span>
                </Fact>
                <Fact k="stack">
                    <span className="flex flex-wrap gap-1 pt-0.5">
                        {PROFILE.stack.map((tag) => (
                            <TechBadge key={tag} tag={tag} />
                        ))}
                    </span>
                </Fact>
                <Fact k="resume">
                    <a
                        href={PROFILE.links.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-keyword-hover underline decoration-keyword/40 underline-offset-2 hover:decoration-keyword"
                    >
                        open
                        <ArrowUpRight size={11} aria-hidden />
                    </a>
                </Fact>
            </dl>
        </motion.aside>
    );
}

function Fact({ k, children }: { k: string; children: ReactNode }) {
    return (
        <div className="grid grid-cols-[5rem_1fr] gap-2">
            <dt className="text-keyword">
                {k}
                <span className="text-text-comment">:</span>
            </dt>
            <dd className="min-w-0 text-text-primary">{children}</dd>
        </div>
    );
}
