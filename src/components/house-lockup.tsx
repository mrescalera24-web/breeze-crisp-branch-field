import { HOUSE } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function HouseLockup({
  size = "hero",
  showCity = true,
}: {
  size?: "hero" | "door";
  showCity?: boolean;
}) {
  const door = size === "door";
  return (
    <div className="text-center">
      <p className="lockup-kicker text-kicker text-gold uppercase">{HOUSE.house}</p>
      <p
        className={cn(
          "font-display text-fg",
          door ? "mt-4 text-5xl sm:text-7xl" : "mt-5 text-6xl sm:text-8xl lg:text-9xl",
        )}
      >
        {HOUSE.short}
      </p>
      <p className={cn("mt-5 text-sm tracking-wide text-fg/80", door && "mt-4")}>{HOUSE.promise}</p>
      {showCity ? (
        <p className="mt-4 text-kicker tracking-kicker text-muted uppercase">{HOUSE.city}</p>
      ) : null}
    </div>
  );
}
