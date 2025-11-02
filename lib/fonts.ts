// src/styles/fonts.ts
import { Poppins, Noto_Sans_Arabic, Spectral } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-poppins",
});

export const spectral = Spectral({
    subsets: ["latin"],
    weight: ["400", "500", "700", '800'],
    variable: "--font-spectral",
});

export const notoArabic = Noto_Sans_Arabic({
    subsets: ["arabic"],
    variable: "--font-arabic",
});