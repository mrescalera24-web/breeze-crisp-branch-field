import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Curtain } from "@/components/curtain";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useDoor } from "@/lib/door";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrate = useDoor((s) => s.hydrate);
  const walking = pathname === "/";

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      {walking ? null : <SiteHeader />}
      <main className="flex-1">{children}</main>
      {walking ? null : <SiteFooter />}
      {walking ? <Curtain /> : null}
    </div>
  );
}
