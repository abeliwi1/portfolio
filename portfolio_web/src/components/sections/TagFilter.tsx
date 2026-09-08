import { X } from "lucide-react";
import type { TechTag } from "../../types";
import { TechBadge } from "../ui/TechBadge";

interface TagFilterProps {
    tags: readonly TechTag[];
    /** Number of projects using each tag; drives the "×n" suffix. */
    counts: ReadonlyMap<TechTag, number>;
    active: TechTag | null;
    onChange: (tag: TechTag | null) => void;
    shown: number;
    total: number;
}

/**
 * Single-select tag filter presented as a shell prompt. Clicking the active
 * tag again, or "all", clears the filter.
 */
export function TagFilter({ tags, counts, active, onChange, shown, total }: TagFilterProps) {
    return (
        <div
            role="group"
            aria-label="Filter projects by technology"
            className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs"
        >
            <span className="select-none text-text-comment">
                <span className="text-keyword">$</span> filter
                <span className="hidden sm:inline"> --tag</span>
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
                <button
                    type="button"
                    aria-pressed={active === null}
                    onClick={() => onChange(null)}
                    className={`rounded-sm border px-1.5 py-0.5 text-2xs leading-4 transition-colors duration-150 ${
                        active === null
                            ? "border-keyword/60 bg-keyword/15 text-keyword-hover"
                            : "border-ink-border bg-ink-raised text-text-secondary hover:border-ink-borderStrong hover:text-text-primary"
                    }`}
                >
                    all
                </button>
                {tags.map((tag) => (
                    <TechBadge
                        key={tag}
                        tag={tag}
                        active={active === tag}
                        count={counts.get(tag)}
                        onClick={(t) => onChange(active === t ? null : t)}
                    />
                ))}
            </div>

            <output aria-live="polite" className="ml-auto flex items-center gap-2 text-text-comment">
                <span className="tabular-nums">
                    {shown}/{total}
                </span>
                {active && (
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="inline-flex items-center gap-1 rounded-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                        <X size={12} aria-hidden />
                        clear
                    </button>
                )}
            </output>
        </div>
    );
}
