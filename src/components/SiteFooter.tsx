export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-linear-to-br from-zinc-50 via-white to-amber-50 p-8 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-amber-950/30">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                rasm-menswear-style-logo
              </div>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Tradition, redefined. Premium men&apos;s Panjabi crafted with love and
                heritage.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Quick Links
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a
                    className="hover:text-amber-800 dark:hover:text-amber-400"
                    href="/collection"
                  >
                    Collection
                  </a>
                </li>
                <li>
                  <a className="hover:text-amber-800 dark:hover:text-amber-400" href="/size">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-800 dark:hover:text-amber-400"
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Get in Touch
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Phone: +880 1632-963486</li>
                <li>Email: rasmbrand@gmail.com</li>
                <li>WhatsApp: +880 1632-963486</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                © 2026 Rasm. All rights reserved.
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Premium craft. Modern comfort.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 Rasm. All rights reserved.</div>
            <div>Tradition, redefined.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

