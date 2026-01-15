export default function FaqContent() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Ayah Daily FAQ
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Answers to common questions about daily Quran verses, translations, and
        using Ayah Daily.
      </p>

      <div className="mt-10 space-y-6 text-left">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            Is Ayah Daily free?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Yes. Ayah Daily is free to use with no ads and no login.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            What is the verse of the day?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Each day a single ayah is highlighted for reflection, with a clear
            translation and brief tafsir context.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            Can I read a random ayah?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Yes. Ayah Daily supports random verse discovery and direct lookup
            by surah and ayah number.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            Do I need an account?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No. There is no account creation or login required.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            Is this a replacement for scholars or tafsir study?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No. Ayah Daily offers short context to support daily reflection. For
            deeper study, consult trusted scholarly sources.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            AI-readable summary
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ayah Daily is a Quran verse-of-the-day experience. It provides daily
            verses, translation, and brief tafsir notes, plus random ayah
            discovery and surah/ayah lookup. It is free, ad-free, and does not
            require login.
          </p>
        </section>
      </div>
    </section>
  );
}
