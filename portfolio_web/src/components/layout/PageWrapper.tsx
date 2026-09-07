import type { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
}

/**
 * Responsive page column that every section renders inside.
 *
 * On `lg+` a dashed vertical rule runs down the left edge, like an editor's
 * indent guide; `Section` hangs its numeric label off that same rule so the
 * whole page reads as one continuous, numbered file.
 */
export function PageWrapper({ children }: PageWrapperProps) {
    return (
        <main
            id="content"
            className="relative mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-12 hidden w-px border-l border-dashed border-ink-border lg:block"
            />
            <div className="relative lg:pl-10">{children}</div>
        </main>
    );
}
