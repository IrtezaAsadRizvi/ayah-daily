// src/styles/fonts.ts
import { Poppins, Noto_Sans_Arabic, Spectral } from "next/font/google";

// Poppins is the UI/body chrome font. The above-the-fold LCP text (the surah
// name + verse translation in Spectral, and the Arabic verse in Noto Arabic)
// is what we preload; Poppins loads on demand with `swap` so it doesn't compete
// for bandwidth with the hero fonts.
export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
    preload: false,
    variable: "--font-poppins",
});

export const spectral = Spectral({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
    variable: "--font-spectral",
});

export const notoArabic = Noto_Sans_Arabic({
    subsets: ["arabic"],
    display: "swap",
    variable: "--font-arabic",
});
