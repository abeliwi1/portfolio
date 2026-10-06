import { MotionConfig } from "framer-motion";
import { EditorTab } from "./components/layout/EditorTab";
import { PageWrapper } from "./components/layout/PageWrapper";
import { Section } from "./components/layout/Section";
import { StatusBar } from "./components/layout/StatusBar";
import { RoboticArm } from "./components/easter-egg/RoboticArm";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Timeline } from "./components/sections/Timeline";
import { PROJECTS, TIMELINE } from "./data/portfolioData";

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
                    <Timeline />
                </Section>
            </PageWrapper>

            <StatusBar />
            <RoboticArm />
        </MotionConfig>
    );
}
