export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Human Decision Review / Decision Brain.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/60">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-lg font-semibold">What we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-white/80">
              <li>URLs, images, or text you submit for analysis.</li>
              <li>Basic metadata required to generate and display the report.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">How we use data</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-white/80">
              <li>To generate a decision report and show it on our website.</li>
              <li>To improve the quality of the analysis over time.</li>
              <li>We do not sell your personal data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Data retention</h2>
            <p className="mt-3 text-white/80">
              We may store generated reports (and related metadata) so you can view them on our website.
              By default, data retention is up to <span className="font-semibold">30 days</span>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Deletion requests</h2>
            <p className="mt-3 text-white/80">
              You can request deletion of stored reports by emailing{" "}
              <a
                className="text-white underline underline-offset-4 hover:text-white/90"
                href="mailto:nimasaraeian65@gmail.com"
              >
                nimasaraeian65@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Changes</h2>
            <p className="mt-3 text-white/80">
              This policy may change as the product evolves. We will update the "Last updated" date when changes occur.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <p>
            If you are using the Human Decision Review tool via ChatGPT/GPT Actions, this page serves as the privacy
            policy reference for data processing and report storage.
          </p>
        </div>
      </div>
    </main>
  );
}