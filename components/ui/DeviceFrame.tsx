import { BrandLogo } from "./BrandLogo";
import { PhoneScreen } from "./PhoneScreen";
import type { PhoneScenario, ScreenIndex } from "@/lib/constants/product";
import type { ReactNode } from "react";
export function DeviceFrame({ screen = 0, scenario, children, className = "", variant = "standard", label = "ARC app interface concept" }: {
  screen?: ScreenIndex;
  scenario?: PhoneScenario;
  className?: string;
  variant?: "standard" | "legacy" | "silhouette";
  label?: string;
  children?: ReactNode;
}) {
  return <div className={`device ${className} device-${variant}`} role={variant === "silhouette" ? undefined : "group"} aria-label={variant === "silhouette" ? undefined : label} aria-hidden={variant === "silhouette" ? true : undefined}>
    <div className="device-island" />
    {variant === "silhouette" ? <div className="device-reflection"><span><BrandLogo markOnly /></span></div> : children ?? <PhoneScreen screen={screen} scenario={scenario} legacy={variant === "legacy"} />}
  </div>;
}
