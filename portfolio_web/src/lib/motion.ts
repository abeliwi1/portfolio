import type { Transition, Variants } from "framer-motion";

/**
 * Shared Framer Motion presets.
 *
 * Every animation on the site is a micro-interaction: short, eased, and
 * small in distance. Keep durations under ~350ms so nothing ever feels
 * like it is making the recruiter wait.
 */

export const EASE_SNAP = [0.2, 0.8, 0.2, 1] as const;

export const transition = {
    fast: { duration: 0.18, ease: EASE_SNAP },
    base: { duration: 0.3, ease: EASE_SNAP },
} satisfies Record<string, Transition>;

/** Fade in while rising 8px. Used for anything that mounts into view. */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: transition.base },
};

/** Parent variant that staggers `fadeUp` children. */
export const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

/** Standard `whileInView` viewport config: animate once, slightly before entering. */
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;
