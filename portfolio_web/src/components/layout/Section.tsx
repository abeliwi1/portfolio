import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";
import type { SectionId } from "../../types";

interface SectionProps {
    id: SectionId;
    /** Zero-padded index shown in the gutter, e.g. "02". Matches the navbar. */
    index: string;
    /** Section heading. Omit for the hero, which brings its own headline. */
    title?: string;
    /** Optional muted one-liner rendered as a code comment beside the title. */
    comment?: string;
    children: ReactNode;
    className?: string;
}

/**
 * Standard section frame: an anchor target with a comment-style header
 * (`// 02  projects`) whose number sits on the PageWrapper's gutter rule.
 */
export function Section({ id, index, title, comment, children, className = "" }: SectionProps) {
    return (
        <section id={id} className={`relative scroll-mt-20 py-20 sm:py-24 ${className}`}>
            <span
                aria-hidden
                className="absolute -left-10 top-[5.75rem] hidden h-2 w-2 -translate-x-1/2 rounded-full border border-ink-borderStrong bg-ink-bg lg:block"
            />

            {title && (
                <motion.header
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink-border pb-4"
                >
                    <span className="font-mono text-xs text-keyword-dim">
                        <span className="text-text-comment">{"// "}</span>
                        {index}
                    </span>
                    <h2 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                        {title}
                    </h2>
                    {comment && (
                        <span className="font-mono text-xs text-text-comment sm:ml-auto">{comment}</span>
                    )}
                </motion.header>
            )}

            {children}
        </section>
    );
}
