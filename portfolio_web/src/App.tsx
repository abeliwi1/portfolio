import { MotionConfig } from "framer-motion";
import { EditorTab } from "./components/layout/EditorTab";
import { PageWrapper } from "./components/layout/PageWrapper";
import { Section } from "./components/layout/Section";
import { StatusBar } from "./components/layout/StatusBar";
import { PROJECTS, TIMELINE } from "./data/portfolioData";

/** Temporary stand-in for a section body. Removed as each step lands. */
function Pending({ step, label }: { step: 2 | 3; label: string }) {
    return (
        <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-ink-border font-mono text-xs text-text-comment">
            {`// TODO(step-${step}): ${label}`}
        </div>
    );
}

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink-raised focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
            >
                Skip to content
            </a>

            <EditorTab />

            <PageWrapper>
                <Section id="hero" index="01" className="min-h-[calc(100vh-3.5rem)]">
                    <Pending step={2} label="Hero — headline, value prop, GitHub / LinkedIn / Resume" />
                </Section>

                <Section
                    id="projects"
                    index="02"
                    title="Projects"
                    comment={`${PROJECTS.length} repos · filter by stack`}
                >
                    <Pending step={2} label="Interactive projects grid with tag filtering" />
                </Section>

                <Section
                    id="timeline"
                    index="03"
                    title="Experience"
                    comment={`git log --oneline · ${TIMELINE.length} commits`}
                >
                    <Pending step={3} label="Vertical timeline" />
                </Section>
            </PageWrapper>

            <StatusBar />
            {/* Step 3: <RoboticArm /> mounts here, fixed to the bottom-right corner. */}
        </MotionConfig>
    );
}
