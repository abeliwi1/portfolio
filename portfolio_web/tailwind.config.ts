import type { Config } from "tailwindcss";

/**
 * Design tokens.
 *
 * The palette is named after a code editor's syntax theme rather than
 * generic "primary/secondary": the page is presented as a source file, so
 * `keyword` is the single accent, `comment` is muted copy, and `string` is a
 * rare warm highlight. Everything else is ink.
 */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: {
                    bg: "#0B0E14",
                    surface: "#10141C",
                    raised: "#151A24",
                    surfaceHover: "#161B26",
                    border: "#1D2430",
                    borderStrong: "#2A3342",
                },
                text: {
                    primary: "#E4E9F2",
                    secondary: "#9AA4B2",
                    comment: "#5C6773",
                },
                keyword: {
                    DEFAULT: "#8B7FE8",
                    hover: "#A79BF0",
                    dim: "#5E55A8",
                },
                string: {
                    DEFAULT: "#E3B341",
                },
                signal: {
                    green: "#3FB950",
                },
            },
            borderColor: {
                DEFAULT: "#1D2430",
            },
            fontFamily: {
                mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
                sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
            },
            fontSize: {
                "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
            },
            maxWidth: {
                page: "72rem",
            },
            boxShadow: {
                tab: "inset 0 -2px 0 0 #8B7FE8",
                lift: "0 12px 32px -12px rgba(0, 0, 0, 0.6)",
            },
            transitionTimingFunction: {
                snap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
