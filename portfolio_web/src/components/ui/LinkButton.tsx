import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

interface LinkButtonProps {
    href: string;
    children: ReactNode;
    variant?: "primary" | "ghost";
    /** Rendered before the label, e.g. an icon. */
    icon?: ReactNode;
    /** Small monospace hint after the label, e.g. "pdf". */
    hint?: string;
    className?: string;
}

const variants = {
    primary:
        "border-keyword bg-keyword text-ink-bg hover:bg-keyword-hover hover:border-keyword-hover",
    ghost: "border-ink-borderStrong bg-ink-raised text-text-primary hover:border-keyword hover:text-keyword-hover",
} as const;

/** Anchor styled as a button. Used for the hero's three primary calls to action. */
export function LinkButton({ href, children, variant = "ghost", icon, hint, className = "" }: LinkButtonProps) {
    return (
        <ExternalLink
            href={href}
            className={`inline-flex h-10 items-center gap-2 rounded border px-4 text-sm font-medium transition-colors duration-150 ease-snap ${variants[variant]} ${className}`}
        >
            {icon}
            {children}
            {hint && (
                <span
                    className={`font-mono text-2xs ${variant === "primary" ? "text-ink-bg/60" : "text-text-comment"}`}
                >
                    {hint}
                </span>
            )}
        </ExternalLink>
    );
}
