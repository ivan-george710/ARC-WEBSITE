import type { BodyArea } from "@/lib/constants/product";

// Extracted unchanged from the existing phone recovery graphic. Replace this SVG
// with ARC's actual app asset here when supplied; both uses share this component.
export function BodyAvatar({ area = null, className = "" }: { area?: BodyArea | null; className?: string }) {
  const point = area ? { shoulder: [47, 30], knee: [36, 94], back: [36, 52] }[area] : null;
  return <svg className={`body-avatar ${className}`} viewBox="0 0 72 120" role="img" aria-label={area ? `${area} highlighted on the ARC body avatar` : "ARC body avatar"}>
    <circle cx="36" cy="12" r="9" />
    <path d="M25 27Q36 22 47 27L53 60 47 62 44 44 44 72 48 112 39 112 36 80 33 112 24 112 28 72 28 44 25 62 19 60Z" />
    {point && <circle className="selected-area" cx={point[0]} cy={point[1]} r="7" />}
  </svg>;
}
