import { useEffect, useState } from "react";
import type { SectionId } from "../types";

/** Fraction of the viewport height treated as the "reading line". */
const READING_LINE = 0.3;

/**
 * Tracks which page section currently sits under the navbar so the nav can
 * highlight it.
 *
 * The active section is the last one whose top edge has crossed a reading
 * line 30% down the viewport. Two edge cases are handled explicitly:
 *  - at the very bottom of the page the last section is always active, even
 *    if it is too short to ever reach the reading line;
 *  - the first section is active while nothing has crossed the line yet.
 *
 * Work is throttled to one measurement per animation frame while scrolling.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
    const [active, setActive] = useState<SectionId | null>(ids[0] ?? null);

    useEffect(() => {
        if (ids.length === 0) return;
        let frame = 0;

        const measure = () => {
            frame = 0;
            const root = document.documentElement;
            const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2;
            if (atBottom) {
                setActive(ids[ids.length - 1] ?? null);
                return;
            }

            const line = window.innerHeight * READING_LINE;
            let current: SectionId | null = ids[0] ?? null;
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            }
            setActive(current);
        };

        const schedule = () => {
            if (frame === 0) frame = window.requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            if (frame !== 0) window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [ids]);

    return active;
}
