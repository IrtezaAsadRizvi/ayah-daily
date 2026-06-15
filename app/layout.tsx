// app/layout.tsx
// Minimal pass-through root layout. It does NOT render <html>/<body> so that the
// localized layout (app/(locale)/[locale]/layout.tsx) can own them and set
// per-locale `lang`/`dir` at build time. The self-contained app/not-found.tsx
// renders its own <html>/<body>.
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
