import { GitBranch, MapPin } from "lucide-react";
import { PROFILE } from "../../data/portfolioData";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { ExternalLink } from "../ui/ExternalLink";

const YEAR = new Date().getFullYear();

/**
 * Footer styled as an editor status bar: branch, location, encoding-style
 * metadata on the left; social links on the right.
 */
export function StatusBar() {
    return (
        <footer className="border-t border-ink-border bg-ink-surface/60">
            <div className="mx-auto flex w-full max-w-page flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 font-mono text-2xs text-text-comment sm:px-8 lg:px-12">
                <span className="inline-flex items-center gap-1.5">
                    <GitBranch size={12} aria-hidden />
                    main
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} aria-hidden />
                    {PROFILE.location}
                </span>
                <span className="hidden sm:inline">UTF-8</span>
                <span className="hidden sm:inline">TypeScript React</span>

                <span className="ml-auto inline-flex items-center gap-4">
                    <span className="hidden sm:inline">
                        © {YEAR} {PROFILE.name}
                    </span>
                    <ExternalLink
                        href={PROFILE.links.github}
                        aria-label="GitHub profile"
                        className="transition-colors hover:text-text-primary"
                    >
                        <GithubIcon size={13} />
                    </ExternalLink>
                    <ExternalLink
                        href={PROFILE.links.linkedin}
                        aria-label="LinkedIn profile"
                        className="transition-colors hover:text-text-primary"
                    >
                        <LinkedinIcon size={13} />
                    </ExternalLink>
                </span>
            </div>
        </footer>
    );
}
