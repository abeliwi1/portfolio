import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { EDITOR_FILENAME, NAV_ITEMS, PROFILE } from "../../data/portfolioData";
import { useActiveSection } from "../../hooks/useActiveSection";
import { transition } from "../../lib/motion";
import type { SectionId } from "../../types";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { ExternalLink } from "../ui/ExternalLink";

const SECTION_IDS: readonly SectionId[] = NAV_ITEMS.map((item) => item.id);

/**
 * Sticky, glassmorphism navbar dressed as an editor's tab strip.
 *
 * Left: the "open file" tab (name + unsaved-changes dot + blinking caret).
 * Middle: section links numbered like a symbol outline; the active one gets a
 * sliding underline. Right: availability status, GitHub/LinkedIn, resume.
 * A 1px scroll-progress line runs along the top edge.
 */
export function EditorTab() {
    const active = useActiveSection(SECTION_IDS);
    const [menuOpen, setMenuOpen] = useState(false);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

    // Close the mobile menu on Escape and when the viewport grows past `md`.
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        const mq = window.matchMedia("(min-width: 768px)");
        const onResize = () => mq.matches && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onResize);
        };
    }, [menuOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-ink-border/80 bg-ink-bg/70 backdrop-blur-xl backdrop-saturate-150">
            <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-keyword"
                style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
            />

            <nav
                aria-label="Primary"
                className="mx-auto flex h-14 w-full max-w-page items-stretch px-5 sm:px-8 lg:px-12"
            >
                {/* Open-file tab */}
                <a
                    href="#hero"
                    className="group relative -ml-3 flex items-center gap-2.5 border-x border-ink-border bg-ink-surface/60 px-4 font-mono text-sm before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-keyword"
                >
                    <span
                        aria-hidden
                        className="h-2 w-2 rounded-full bg-keyword transition-colors duration-200 group-hover:bg-keyword-hover"
                    />
                    <span className="text-text-primary">{EDITOR_FILENAME}</span>
                    <span aria-hidden className="caret-blink inline-block h-3.5 w-[1.5px] bg-string" />
                    <span className="sr-only">Back to top</span>
                </a>

                {/* Section outline */}
                <ul className="ml-1 hidden items-stretch md:flex">
                    {NAV_ITEMS.map((item, i) => {
                        const isActive = active === item.id;
                        return (
                            <li key={item.id} className="flex">
                                <a
                                    href={`#${item.id}`}
                                    aria-current={isActive ? "location" : undefined}
                                    className={`relative flex items-center gap-2 px-4 font-mono text-xs transition-colors duration-200 ${
                                        isActive
                                            ? "text-text-primary"
                                            : "text-text-comment hover:text-text-secondary"
                                    }`}
                                >
                                    <span
                                        className={`text-2xs tabular-nums ${isActive ? "text-keyword" : "text-keyword-dim"}`}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {item.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active-underline"
                                            aria-hidden
                                            className="absolute inset-x-3 bottom-0 h-px bg-keyword"
                                            transition={reduceMotion ? { duration: 0 } : transition.base}
                                        />
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Right rail */}
                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <span className="hidden items-center gap-2 font-mono text-2xs text-text-comment lg:inline-flex">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal-green" />
                        {PROFILE.availability}
                    </span>
                    <span aria-hidden className="hidden h-4 w-px bg-ink-border lg:block" />

                    <ExternalLink
                        href={PROFILE.links.github}
                        aria-label="GitHub profile"
                        className="rounded p-1.5 text-text-secondary transition-colors duration-200 hover:bg-ink-surfaceHover hover:text-text-primary"
                    >
                        <GithubIcon size={16} />
                    </ExternalLink>
                    <ExternalLink
                        href={PROFILE.links.linkedin}
                        aria-label="LinkedIn profile"
                        className="rounded p-1.5 text-text-secondary transition-colors duration-200 hover:bg-ink-surfaceHover hover:text-text-primary"
                    >
                        <LinkedinIcon size={16} />
                    </ExternalLink>

                    <ExternalLink
                        href={PROFILE.links.resume}
                        className="hidden items-center gap-1.5 rounded border border-ink-borderStrong bg-ink-raised px-2.5 py-1 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-keyword hover:text-keyword-hover sm:inline-flex"
                    >
                        <FileText size={13} aria-hidden />
                        resume.pdf
                        <ArrowUpRight size={12} aria-hidden className="text-text-comment" />
                    </ExternalLink>

                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="rounded p-1.5 text-text-secondary transition-colors duration-200 hover:bg-ink-surfaceHover hover:text-text-primary md:hidden"
                    >
                        {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
                    </button>
                </div>
            </nav>

            {/* Mobile outline */}
            <AnimatePresence initial={false}>
                {menuOpen && (
                    <motion.div
                        id="mobile-nav"
                        key="mobile-nav"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={reduceMotion ? { duration: 0 } : transition.fast}
                        className="overflow-hidden border-t border-ink-border md:hidden"
                    >
                        <ul className="mx-auto flex max-w-page flex-col px-5 py-2 sm:px-8">
                            {NAV_ITEMS.map((item, i) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => setMenuOpen(false)}
                                        className={`flex items-center gap-3 border-l-2 py-2.5 pl-3 font-mono text-sm transition-colors ${
                                            active === item.id
                                                ? "border-keyword text-text-primary"
                                                : "border-transparent text-text-comment hover:text-text-secondary"
                                        }`}
                                    >
                                        <span className="text-2xs tabular-nums text-keyword-dim">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li className="mt-1 border-t border-ink-border pt-2 sm:hidden">
                                <ExternalLink
                                    href={PROFILE.links.resume}
                                    className="flex items-center gap-2 py-2.5 pl-3 font-mono text-sm text-text-primary"
                                >
                                    <FileText size={14} aria-hidden />
                                    resume.pdf
                                    <ArrowUpRight size={12} aria-hidden className="text-text-comment" />
                                </ExternalLink>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
