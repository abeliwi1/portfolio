import { MotionConfig } from "framer-motion";
import { EditorTab } from "./components/layout/EditorTab";
import { PageWrapper } from "./components/layout/PageWrapper";
import { Section } from "./components/layout/Section";
import { StatusBar } from "./components/layout/StatusBar";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { PROJECTS, TIMELINE } from "./data/portfolioData";

/** Temporary stand-in for a section body. Removed as each step lands. */
function Pending({ step, label }: { step: 3; label: string }) {
    return (
        <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-ink-border px-4 text-center font-mono text-xs text-text-comment">
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
                <Section id="hero" index="01" className="flex min-h-[calc(100vh-3.5rem)] items-center">
                    <Hero />
                </Section>

                <Section
                    id="projects"
                    index="02"
                    title="Projects"
                    comment={`${PROJECTS.length} repos · click a tag to filter`}
                >
                    <Projects />
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
