import { useMemo } from "react";
import { motion } from "framer-motion";
import { TIMELINE } from "../../data/portfolioData";
import { compareNewestFirst } from "../../lib/date";
import { stagger, viewportOnce } from "../../lib/motion";
import { TimelineItem } from "./TimelineItem";

/**
 * Experience and education as a `git log`: newest first, the top entry
 * decorated as HEAD, ongoing entries marked with a live node.
 */
export function Timeline() {
    const events = useMemo(() => [...TIMELINE].sort(compareNewestFirst), []);

    return (
        <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative"
        >
            {events.map((event, i) => (
                <TimelineItem key={event.id} event={event} isHead={i === 0} isLast={i === events.length - 1} />
            ))}
        </motion.ol>
    );
}
