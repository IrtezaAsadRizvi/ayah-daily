"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";
import SeoIntro from "@/components/landing/SeoIntro";
import SeoHidden from "@/components/landing/SeoHidden";
import FixedVersePage from "@/components/landing/FixedVersePage";
import type { VergeOfDay } from "@/lib/verse/VerseLoader";
import { AYAH_COUNTS, SURAH_COUNT } from "@/lib/verse/constants";

function parseParam(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function validateRange(surah: number, ayah: number): boolean {
  if (surah < 1 || surah > SURAH_COUNT) return false;
  if (ayah < 1 || ayah > AYAH_COUNTS[surah]) return false;
  return true;
}

function FixedVerseFromQuery() {
  const searchParams = useSearchParams();
  const surah = parseParam(searchParams.get("surah"));
  const ayah = parseParam(searchParams.get("ayah"));
  if (surah && ayah && validateRange(surah, ayah)) {
    return <FixedVersePage surah={surah} ayah={ayah} />;
  }
  return null;
}

function DefaultHome({ initial }: { initial: VergeOfDay }) {
  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <VergeDisplay initial={initial} />
      <VergeActions />
      <SeoIntro />
      <SeoHidden />
    </section>
  );
}

export default function HomePageClient({ initial }: { initial: VergeOfDay }) {
  return (
    <Suspense fallback={<DefaultHome initial={initial} />}>
      <FixedVerseOrDefault initial={initial} />
    </Suspense>
  );
}

function FixedVerseOrDefault({ initial }: { initial: VergeOfDay }) {
  const fixed = FixedVerseFromQuery();
  return fixed ?? <DefaultHome initial={initial} />;
}
