import type { Locale } from "./locales";

export const SITE_URL = "https://ayah-daily.web.app";

export const META_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
  },
  bn: {
    title: "আয়াহ ডেইলি - প্রতিদিন একটি কোরআনের আয়াত",
    description: "প্রতিদিন একটি কোরআনের আয়াত — সরল এবং সুন্দর।",
  },
  ar: {
    title: "آية يومية - آية واحدة من القرآن كل يوم",
    description: "آية واحدة من القرآن كل يوم — بسيط وجميل.",
  },
  ur: {
    title: "روزانہ آیت - ہر دن قرآن کی ایک آیت",
    description: "ہر دن قرآن کی ایک آیت — سادہ اور خوبصورت۔",
  },
  id: {
    title: "Ayat Harian - Satu ayat Al-Qur'an setiap hari",
    description: "Satu ayat Al-Qur'an setiap hari — sederhana dan indah.",
  },
  tr: {
    title: "Günün Ayeti - Her gün Kur'an'dan bir ayet",
    description: "Her gün Kur'an'dan bir ayet — sade ve güzel.",
  },
  fa: {
    title: "آیه روزانه - هر روز یک آیه از قرآن",
    description: "هر روز یک آیه از قرآن — ساده و زیبا.",
  },
  ms: {
    title: "Ayat Harian - Satu ayat Al-Quran setiap hari",
    description: "Satu ayat Al-Quran setiap hari — ringkas dan indah.",
  },
  fr: {
    title: "Verset quotidien - Un verset du Coran par jour",
    description: "Un verset du Coran par jour — simple et beau.",
  },
  es: {
    title: "Versículo diario - Un versículo del Corán al día",
    description: "Un versículo del Corán al día — simple y hermoso.",
  },
  hi: {
    title: "दैनिक आयत - हर दिन कुरआन की एक आयत",
    description: "हर दिन कुरआन की एक आयत — सरल और सुंदर।",
  },
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  bn: "bn_BD",
  ar: "ar_SA",
  ur: "ur_PK",
  id: "id_ID",
  tr: "tr_TR",
  fa: "fa_IR",
  ms: "ms_MY",
  fr: "fr_FR",
  es: "es_ES",
  hi: "hi_IN",
};
