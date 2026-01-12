import type { Locale } from "./locales";

export const SITE_URL = "https://ayah-daily.web.app";

export const META_COPY: Record<
  Locale,
  { title: string; description: string; keywords: string }
> = {
  en: {
    title: "Ayah Daily - One Quran verse a day",
    description:
      "Daily Quran verse, Quran tilawat, and reading Quran in a simple, beautiful way for Quran education and Islamic education.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  bn: {
    title: "আয়াহ ডেইলি - প্রতিদিন একটি কোরআনের আয়াত",
    description: "প্রতিদিন একটি কোরআনের আয়াত — সরল এবং সুন্দর।",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  ar: {
    title: "آية يومية - آية واحدة من القرآن كل يوم",
    description: "آية واحدة من القرآن كل يوم — بسيط وجميل.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  ur: {
    title: "روزانہ آیت - ہر دن قرآن کی ایک آیت",
    description: "ہر دن قرآن کی ایک آیت — سادہ اور خوبصورت۔",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  id: {
    title: "Ayat Harian - Satu ayat Al-Qur'an setiap hari",
    description: "Satu ayat Al-Qur'an setiap hari — sederhana dan indah.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  tr: {
    title: "Günün Ayeti - Her gün Kur'an'dan bir ayet",
    description: "Her gün Kur'an'dan bir ayet — sade ve güzel.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  fa: {
    title: "آیه روزانه - هر روز یک آیه از قرآن",
    description: "هر روز یک آیه از قرآن — ساده و زیبا.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  ms: {
    title: "Ayat Harian - Satu ayat Al-Quran setiap hari",
    description: "Satu ayat Al-Quran setiap hari — ringkas dan indah.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  fr: {
    title: "Verset quotidien - Un verset du Coran par jour",
    description: "Un verset du Coran par jour — simple et beau.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  es: {
    title: "Versículo diario - Un versículo del Corán al día",
    description: "Un versículo del Corán al día — simple y hermoso.",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
  },
  hi: {
    title: "दैनिक आयत - हर दिन कुरआन की एक आयत",
    description: "हर दिन कुरआन की एक आयत — सरल और सुंदर।",
    keywords:
      "daily quran verse, quran tilawat, quran recitation, reading quran, quran education, islamic education, ayah of the day, quran verses, learn quran, islamic learning",
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
