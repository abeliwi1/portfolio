import type { TechTag } from "../../types";

interface TechBadgeProps {
    tag: TechTag;
    /** Highlighted when this tag is the active filter. */
    active?: boolean;
    /** Optional count rendered after the tag, e.g. "TypeScript ×3". */
    count?: number;
    /** When provided the badge becomes a button that toggles the filter. */
    onClick?: (tag: TechTag) => void;
}

const base =
    "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-2xs leading-4 transition-colors duration-150";
const idle = "border-ink-border bg-ink-raised text-text-secondary";
const idleInteractive = `${idle} hover:border-ink-borderStrong hover:text-text-primary`;
const selected = "border-keyword/60 bg-keyword/15 text-keyword-hover";

/**
 * Compact monospace chip for a technology. Renders as a <button> when
 * clickable so it's keyboard-operable, and a <span> otherwise.
 */
export function TechBadge({ tag, active = false, count, onClick }: TechBadgeProps) {
    const content = (
        <>
            {tag}
            {count !== undefined && (
                <span className={active ? "text-keyword-hover/70" : "text-text-comment"}>×{count}</span>
            )}
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                aria-pressed={active}
                onClick={() => onClick(tag)}
                className={`${base} ${active ? selected : idleInteractive}`}
            >
                {content}
            </button>
        );
    }

    return <span className={`${base} ${active ? selected : idle}`}>{content}</span>;
}
