import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayah Daily — One Quran verse a day",
    short_name: "Ayah Daily",
    description:
      "One Quran verse a day with translation, tafsir, and recitation. Track your reading progress.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#ace0f9",
    theme_color: "#ace0f9",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
