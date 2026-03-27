import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#040714] px-6 py-16 text-white lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-xl hover:bg-white/[0.06]"
        >
          ← Back to homepage
        </Link>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/65">
            Last updated: 26 March 2026
          </p>

          <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/72 prose-li:text-white/72 prose-strong:text-white prose-headings:text-white">
            <h2>1. Use of This Website</h2>
            <p>
              By using this website, you agree to use it lawfully and not for
              any fraudulent, harmful, or misleading activity.
            </p>

            <h2>2. Application Process</h2>
            <p>
              Submission of an application does not guarantee acceptance into
              any free website campaign or service.
            </p>

            <h2>3. Accuracy of Information</h2>
            <p>
              You agree that all information you provide is accurate and not
              misleading.
            </p>

            <h2>4. Services</h2>
            <p>
              Any free or paid services offered are subject to availability,
              suitability, and our discretion. Additional terms may apply once a
              project is accepted.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              All content, branding, layout, graphics, and text on this website
              are owned by or licensed to LaunchSite unless stated otherwise.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              We do our best to keep the site accurate and available, but we do
              not guarantee uninterrupted service or that the website will be
              free from errors.
            </p>

            <h2>7. External Services</h2>
            <p>
              This website may rely on third-party tools, hosting providers, and
              integrations. We are not responsible for outages or issues caused
              by those external providers.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update these terms at any time. Continued use of the site
              means you accept the updated version.
            </p>

            <h2>9. Contact</h2>
            <p>
              For any questions about these terms, contact:
              <br />
              hello@launchsite.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}