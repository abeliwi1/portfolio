import { motion } from "framer-motion";
import { Briefcase, GitPullRequestArrow, GraduationCap, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatRange } from "../../lib/date";
import { fadeUp } from "../../lib/motion";
import type { TimelineEvent, TimelineEventType } from "../../types";

interface TimelineItemProps {
    event: TimelineEvent;
    /** The newest event carries the `HEAD -> main` decoration. */
    isHead: boolean;
    isLast: boolean;
}

const TYPE_META: Record<TimelineEventType, { label: string; Icon: LucideIcon }> = {
    education: { label: "education", Icon: GraduationCap },
    work: { label: "work", Icon: Briefcase },
    opensource: { label: "open-source", Icon: GitPullRequestArrow },
    club: { label: "club", Icon: Users },
};

/**
 * One commit in the experience log. Three columns on `sm+`: date range,
 * the rail with its node, then the commit body. The rail is drawn per item
 * so the line stops cleanly at the last node.
 */
export function TimelineItem({ event, isHead, isLast }: TimelineItemProps) {
    const { label, Icon } = TYPE_META[event.type];
    const ongoing = event.endDate === undefined;

    return (
        <motion.li variants={fadeUp} className="grid grid-cols-[1.5rem_1fr] gap-x-4 sm:grid-cols-[9.5rem_1.5rem_1fr] sm:gap-x-5">
            <time
                dateTime={event.startDate}
                className="hidden pt-1 text-right font-mono text-2xs leading-5 text-text-comment sm:block"
            >
                {formatRange(event.startDate, event.endDate)}
            </time>

            {/* Rail */}
            <div aria-hidden className="relative flex justify-center">
                <span
                    className={`absolute top-1 h-2.5 w-2.5 rounded-full border-2 ${
                        ongoing
                            ? "border-keyword bg-keyword shadow-[0_0_0_3px_rgba(139,127,232,0.2)]"
                            : "border-ink-borderStrong bg-ink-bg"
                    }`}
                />
                {!isLast && <span className="mt-5 w-px flex-1 bg-ink-border" />}
            </div>

            <div className={isLast ? "pb-2" : "pb-10"}>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-2xs leading-5">
                    <span className="text-string">{event.commitHash}</span>
                    {isHead && (
                        <span className="text-keyword-hover">
                            (<span className="text-signal-green">HEAD</span> -&gt; main)
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-sm border border-ink-border bg-ink-raised px-1.5 text-text-secondary">
                        <Icon size={10} aria-hidden />
                        {label}
                    </span>
                    <time dateTime={event.startDate} className="text-text-comment sm:hidden">
                        {formatRange(event.startDate, event.endDate)}
                    </time>
                </p>

                <h3 className="mt-2 text-base font-semibold tracking-tight text-text-primary sm:text-lg">
                    {event.title}
                    <span className="font-normal text-text-comment"> @ </span>
                    <span className="font-medium text-text-secondary">{event.organization}</span>
                </h3>

                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{event.description}</p>

                {event.bullets && event.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                        {event.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-text-primary/90">
                                <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-keyword/70" />
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.li>
    );
}
