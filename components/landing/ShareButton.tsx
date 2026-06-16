"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

type Verse = {
  surahName?: string;
  surahNameArabic?: string;
  arabic1?: string;
  english?: string;
  ayahNo?: number;
  surahNo?: number;
};

// Wrap text to a max pixel width, returning the produced lines.
function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const ShareButton = () => {
  const t = useTranslations("Tools");
  const verse = useSelector((s: any) => s?.verse?.data) as Verse | null;
  const [busy, setBusy] = useState(false);

  if (!verse) return null;

  const handleShare = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const size = 1080;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Pastel gradient background matching the app's light aesthetic.
      const grad = ctx.createLinearGradient(0, size, 0, 0);
      grad.addColorStop(0, "#fff1eb");
      grad.addColorStop(1, "#ace0f9");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      const cx = size / 2;
      const maxWidth = size - 160;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      // Surah name (top)
      ctx.fillStyle = "#212121";
      ctx.font = "600 52px Georgia, serif";
      ctx.fillText(verse.surahName ?? "", cx, 150);

      // Build a vertically-centered block: Arabic, then translation.
      const blocks: { text: string; font: string; color: string; lh: number }[] = [];

      if (verse.arabic1) {
        const arFont = "44px Georgia, serif";
        ctx.font = arFont;
        for (const l of wrapLines(ctx, verse.arabic1, maxWidth)) {
          blocks.push({ text: l, font: arFont, color: "#1b1b1b", lh: 72 });
        }
        blocks.push({ text: "", font: arFont, color: "#1b1b1b", lh: 40 });
      }

      if (verse.english) {
        const enFont = "italic 40px Georgia, serif";
        ctx.font = enFont;
        for (const l of wrapLines(ctx, verse.english, maxWidth)) {
          blocks.push({ text: l, font: enFont, color: "#33415580", lh: 60 });
        }
      }

      const totalH = blocks.reduce((h, b) => h + b.lh, 0);
      let y = cx - totalH / 2;
      for (const b of blocks) {
        ctx.font = b.font;
        ctx.fillStyle = b.color === "#33415580" ? "#334155" : b.color;
        if (b.text) ctx.fillText(b.text, cx, y);
        y += b.lh;
      }

      // Ayah reference + brand (bottom)
      ctx.fillStyle = "#9261fb";
      ctx.font = "600 36px Georgia, serif";
      const ref =
        verse.surahNo && verse.ayahNo
          ? `${verse.surahName} ${verse.surahNo}:${verse.ayahNo}`
          : verse.ayahNo
          ? `Ayah ${verse.ayahNo}`
          : "";
      if (ref) ctx.fillText(ref, cx, size - 130);

      ctx.fillStyle = "#21212199";
      ctx.font = "500 30px Georgia, serif";
      ctx.fillText("Ayah Daily", cx, size - 80);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (!blob) return;

      const fileName = `ayah-daily-${verse.surahNo ?? "verse"}-${verse.ayahNo ?? ""}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      const nav = navigator as Navigator & {
        canShare?: (data?: ShareData) => boolean;
      };

      if (
        nav.share &&
        nav.canShare &&
        nav.canShare({ files: [file] })
      ) {
        try {
          await nav.share({
            files: [file],
            title: "Ayah Daily",
            text: verse.surahName ?? "",
          });
          return;
        } catch {
          // user cancelled or share failed — fall through to download
        }
      }

      // Fallback: download the PNG.
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className="icon-button text-slate-600 dark:text-slate-400"
      aria-label={t("share")}
      title={t("share")}
      onClick={handleShare}
      disabled={busy}
    >
      <Share2 />
    </button>
  );
};

export default ShareButton;
