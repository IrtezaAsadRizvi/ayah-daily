# Ayah Daily

A tiny, ad-free, login-free web app that shows one random Quran ayah each day.
Built for calm, consistent Quran reading, Quran recitation, and Islamic learning
without distractions. If you want a simple "ayah of the day" experience, this is it.

Live demo: https://ayah-daily.web.app

## Features

- Daily Quran verse selection that stays consistent for the day
- Clean, focused reading experience with Arabic and English text
- Share a specific verse using `?surah=` and `?ayah=` query params
- Recent history stored locally so you can revisit prior ayahs
- Multilingual UI (Arabic, Bengali, English, Spanish, Farsi, French, Hindi, Indonesian, Malay, Turkish, Urdu)
- Static export for fast, low-cost hosting

## Tech Stack

- Next.js App Router with static export
- React + TypeScript
- Tailwind CSS
- next-intl for localization
- Redux Toolkit for client state

## Local Development

Install dependencies:
```
npm install
```

Start the dev server:
```
npm run dev
```

Build and export the site:
```
npm run build
```

Preview the static build:
```
npx serve@latest out
```

## Notes

- Verse data is fetched from a public Quran API at build/runtime.
- No tracking, no accounts, no ads.
