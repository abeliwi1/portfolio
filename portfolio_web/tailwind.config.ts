import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: {
                    bg: "#0B0E14",
                    surface: "#10141C",
                    surfaceHover: "#161B26",
                    border: "#1D2430",
                },
                text: {
                    primary: "#E4E9F2",
                    comment: "#5C6773", // literally "comment gray" — used for muted/secondary copy
                },
                keyword: {
                    DEFAULT: "#8B7FE8",
                    hover: "#A79BF0",
                },
                string: {
                    DEFAULT: "#E3B341", // used sparingly — cursor blink, single highlights
                },
            },
            fontFamily: {
                mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;