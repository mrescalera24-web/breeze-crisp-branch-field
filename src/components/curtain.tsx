import { useEffect, useState } from "react";
import { HouseLockup } from "@/components/house-lockup";
import { useDoor } from "@/lib/door";
import { houseAudio } from "@/lib/house-audio";
import { cn } from "@/lib/utils";

const FOLDS = 9;

function Panel({ side, open }: { side: "left" | "right"; open: boolean }) {
  return (
    <div
      className={cn(
        "curtain-panel absolute inset-y-0",
        side === "left" ? "curtain-left left-0" : "curtain-right right-0",
        open && "is-open",
      )}
      aria-hidden
    >
      <div className={cn("curtain-folds", side === "right" && "is-mirror")}>
        {Array.from({ length: FOLDS }, (_, i) => {
          const fromCenter = side === "left" ? FOLDS - 1 - i : i;
          return (
            <div
              key={i}
              className="curtain-fold"
              style={{
                transitionDelay: open ? `${fromCenter * 30}ms` : "0ms",
                backgroundPosition: `${(i / (FOLDS - 1)) * 100}% 0`,
              }}
            >
              <span className="curtain-ring" />
              <span className="curtain-carrier" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Curtain() {
  const closed = useDoor((s) => s.closed);
  const open = useDoor((s) => s.open);
  const [gone, setGone] = useState(false);

  function enter() {
    open();
    void houseAudio.start().then(() => houseAudio.setMuted(false)).catch(() => undefined);
  }

  useEffect(() => {
    if (!closed) return;
    const go = () => open();
    const opts = { capture: true } as const;
    window.addEventListener("pointerdown", go, opts);
    window.addEventListener("touchstart", go, opts);
    window.addEventListener("keydown", go, opts);
    const auto = window.setTimeout(go, 1200);
    return () => {
      window.removeEventListener("pointerdown", go, opts);
      window.removeEventListener("touchstart", go, opts);
      window.removeEventListener("keydown", go, opts);
      window.clearTimeout(auto);
    };
  }, [closed, open]);

  useEffect(() => {
    if (closed) return;
    const t = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(t);
  }, [closed]);

  if (gone) return null;

  return (
    <button
      type="button"
      id="curtain-pull"
      className={cn("curtain-hit", !closed && "is-open")}
      aria-label="Enter La Casa TripleJ"
      onClick={enter}
      style={{ zIndex: 2147483647 }}
    >
      <div className="curtain-rod">
        <span className="curtain-finial curtain-finial-left" />
        <span className="curtain-finial curtain-finial-right" />
      </div>
      <Panel side="left" open={!closed} />
      <Panel side="right" open={!closed} />
      <div className={cn("curtain-tassel", !closed && "is-open")} />
      <div className={cn("curtain-copy", !closed && "is-open")}>
        <HouseLockup size="door" showCity={false} />
        <span className="curtain-cta">Enter</span>
      </div>
    </button>
  );
}
