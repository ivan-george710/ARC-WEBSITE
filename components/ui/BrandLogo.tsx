/** Official Flutter ArcLogo asset. The lettering is a typographic companion,
 * not a separately supplied wordmark. Never substitute ArcLine for this mark. */
export function BrandLogo({ className = "", markOnly = false }: { className?: string; markOnly?: boolean }) {
  return <span className={`brand-logo ${markOnly ? "brand-logo-mark" : ""} ${className}`} role="img" aria-label="ARC"><span className="brand-symbol" aria-hidden="true" />{!markOnly && <span className="brand-lettering" aria-hidden="true">ARC</span>}</span>;
}
