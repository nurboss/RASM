export default function ContactPage() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Contact
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          How can we help?
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Your message
            </h2>
            <form className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Your name
                </label>
                <input
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  How can we help?
                </label>
                <textarea
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  rows={5}
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="button"
                className="rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800"
              >
                Send
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Reach Us Directly
            </h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900/50">
                +880 1632-963486
              </div>
              <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900/50">
                rasmbrand@gmail.com
              </div>
              <a
                className="inline-flex text-amber-800 underline hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-400"
                href="https://wa.me/8801632963486"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            <h2 className="mt-8 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Visit Our Store
            </h2>
            <div className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900/50">
                123 Heritage Lane, Dhaka, Bangladesh
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Open: Sat–Thu, 10 AM – 8 PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

