"use client";

import { HRProvider } from "@/lib/store";
import { Shell } from "@/components/Shell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HRProvider>
      <Shell>{children}</Shell>
    </HRProvider>
  );
}
