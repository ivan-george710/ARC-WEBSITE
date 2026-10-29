import { useId } from "react";
export function ArcLine({ className = "", variant = "rise" }: {
    className?: string;
    variant?: "rise" | "wave";
}) {
    const id = useId();
    return <svg className={`arc-line ${className}`} viewBox="0 0 1400 700" fill="none" aria-hidden="true"><defs><linearGradient id={id} x1="100" y1="650" x2="1200" y2="50" gradientUnits="userSpaceOnUse"><stop stopColor="var(--line)"/><stop offset=".45" stopColor="var(--muted)"/><stop offset=".63" stopColor="var(--text)"/><stop offset=".85" stopColor="var(--ice)"/><stop offset="1" stopColor="var(--accent)"/></linearGradient></defs><path d={variant === "rise" ? "M-120 720 C 280 770, 285 140, 690 120 C 1090 100, 1060 610, 1510 540" : "M-80 350 C 300 -80, 500 790, 810 350 S 1260 40, 1490 400"} stroke={`url(#${id})`} strokeWidth="1.5"/></svg>;
}
