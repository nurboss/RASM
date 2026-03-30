const rows = [
  { size: "S", chest: "36", length: "40", shoulder: "16.5" },
  { size: "M", chest: "38", length: "41", shoulder: "17" },
  { size: "L", chest: "40", length: "42", shoulder: "17.5" },
  { size: "XL", chest: "42", length: "43", shoulder: "18" },
  { size: "XXL", chest: "44", length: "44", shoulder: "18.5" },
];

export default function SizePage() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Size Guide
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Find your best fit.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Chest (in)</th>
                <th className="px-4 py-3">Length (in)</th>
                <th className="px-4 py-3">Shoulder (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {rows.map((r) => (
                <tr key={r.size}>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    {r.size}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {r.chest}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {r.length}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {r.shoulder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              How to Measure
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <li>
                <span className="font-semibold">1. Chest:</span> Measure around the
                fullest part of your chest, keeping the tape level.
              </li>
              <li>
                <span className="font-semibold">2. Length:</span> Measure from the
                top of your shoulder to your desired Panjabi length (usually below
                the knee).
              </li>
              <li>
                <span className="font-semibold">3. Shoulder:</span> Measure from one
                shoulder edge to the other across the back.
              </li>
            </ol>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Tip: If you&apos;re between sizes, we recommend going one size up for a
              more comfortable, traditional fit.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Need help?
            </h2>
            <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
              Message us on WhatsApp and we&apos;ll help you pick the right size.
            </p>
            <a
              className="mt-4 inline-flex rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800"
              href="https://wa.me/8801632963486"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

