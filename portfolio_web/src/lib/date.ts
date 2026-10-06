const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** "2024-09" → "Sep 2024". Falls back to the raw string if it doesn't parse. */
export function formatMonth(isoYearMonth: string): string {
    const [year, month] = isoYearMonth.split("-");
    const index = Number(month) - 1;
    const label = MONTHS[index];
    return year && label ? `${label} ${year}` : isoYearMonth;
}

/** "2022-09" + "2026-05" → "Sep 2022 → May 2026"; open-ended → "Jan 2024 → present". */
export function formatRange(start: string, end?: string): string {
    return `${formatMonth(start)} → ${end ? formatMonth(end) : "present"}`;
}

/** Sort key: newer first, mirroring `git log`. */
export function compareNewestFirst(a: { startDate: string }, b: { startDate: string }): number {
    return b.startDate.localeCompare(a.startDate);
}
