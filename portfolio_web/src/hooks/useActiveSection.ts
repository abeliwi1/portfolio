import { useEffect, useState } from "react";
import type { SectionId } from "../types";

/**
 * Tracks which page section currently sits under the navbar so the nav can
 * highlight it. A thin observation band just below the sticky header is used
 * instead of the whole viewport: exactly one section crosses that band at a
 * time, which avoids flicker when two sections are both partially visible.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
    const [active, setActive] = useState<SectionId | null>(ids[0] ?? null);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id as SectionId);
                    }
                }
            },
            // Top 20% of the viewport is the "band"; the rest is ignored.
            { rootMargin: "-10% 0px -80% 0px", threshold: 0 },
        );

        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return active;
}
