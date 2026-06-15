// app/not-found.tsx
// Self-contained 404 document. The root layout is a pass-through (renders no
// <html>/<body>), and the localized routes own their own document, so the
// global not-found must render a complete HTML document itself.
import "./globals.css";
import { poppins, spectral, notoArabic } from "@/lib/fonts";

export default function NotFound() {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${poppins.variable} ${spectral.variable} ${notoArabic.variable} ${poppins.className}`}
    >
      <body suppressHydrationWarning>
        <main className="h-[100dvh] w-[100dvw] flex flex-col items-center justify-center gap-4 text-center px-6">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-lg opacity-80">
            The page you are looking for could not be found.
          </p>
          <a href="/en" className="underline">
            Go to Ayah Daily
          </a>
        </main>
      </body>
    </html>
  );
}
