import { Volumetrics } from "@/components/volumetrics";

export function Atmosphere({ reduced }: { reduced: boolean }) {
  return (
    <>
      <Volumetrics />
      <div className={reduced ? "house-smoke is-still" : "house-smoke"} aria-hidden>
        <span className="smoke-layer smoke-a" />
        <span className="smoke-layer smoke-b" />
        <span className="smoke-layer smoke-c" />
      </div>
    </>
  );
}
