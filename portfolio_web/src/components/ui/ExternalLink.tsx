import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> {
    href: string;
    children: ReactNode;
}

/**
 * Anchor that always opens in a new tab with the right `rel` attributes.
 * Same-document links (`mailto:`, `#anchor`) fall through to a plain <a>.
 */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
    const isHttp = /^https?:\/\//.test(href) || href.endsWith(".pdf");

    if (!isHttp) {
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
            {children}
        </a>
    );
}
