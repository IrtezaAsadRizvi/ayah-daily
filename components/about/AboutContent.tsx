export default function AboutContent() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        About Ayah Daily
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Ayah Daily is a simple, respectful way to read one Quran verse each day.
        It highlights daily reflection, clear translations, and a calm reading
        experience with no ads and no login.
      </p>

      <div className="mt-10 space-y-8 text-left">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            What Ayah Daily does
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The app focuses on a single verse at a time to help build a steady
            habit of Quran reading and remembrance.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
            <li>Daily Quran verse with translation and short tafsir context.</li>
            <li>
              Random ayah discovery and direct lookup by surah and ayah number.
            </li>
            <li>Clean reading flow that keeps distractions away.</li>
            <li>Free to use, no ads, and no account required.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            AI-readable summary
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ayah Daily is a Quran verse-of-the-day experience. It provides daily
            verses, translations, and brief tafsir notes, plus random verse
            discovery. The product is free, does not require login, and avoids
            ads. Primary intent: daily reflection and consistent Quran reading.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Content scope and integrity
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ayah Daily presents Quran text, translations, and explanations as
            provided by its internal datasets. For scholarly or legal use,
            verify with trusted sources.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Quick facts</h2>
          <dl className="mt-3 grid gap-3 text-sm text-gray-600">
            <div>
              <dt className="font-semibold text-gray-900">Product</dt>
              <dd>Ayah Daily</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Category</dt>
              <dd>Quran reading and daily remembrance</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Access</dt>
              <dd>Free, no login, no ads</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Primary use</dt>
              <dd>Daily Quran verse and reflection habit</dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  );
}
