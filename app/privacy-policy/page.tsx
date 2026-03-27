import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/65">
            Last updated: 26 March 2026
          </p>

          <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/72 prose-li:text-white/72 prose-strong:text-white prose-headings:text-white">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how LaunchSite collects, uses, and
              protects information submitted through this website.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following information when you apply:</p>
            <ul>
              <li>Full name</li>
              <li>Business name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business type</li>
              <li>Whether you currently have a website</li>
              <li>Any goals or additional information you provide</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Review your application</li>
              <li>Contact you about your enquiry</li>
              <li>Provide website-related services</li>
              <li>Improve our services and lead process</li>
            </ul>

            <h2>4. Storage of Data</h2>
            <p>
              Information submitted through this site may be stored securely in
              our systems and service providers used to manage applications and
              communications.
            </p>

            <h2>5. Sharing of Data</h2>
            <p>
              We do not sell your personal information. We may share data with
              trusted service providers only where needed to operate this
              website, manage leads, or communicate with you.
            </p>

            <h2>6. Retention</h2>
            <p>
              We keep personal information only as long as reasonably necessary
              for enquiry handling, internal records, and legal or business
              requirements.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, subject to legal obligations.
            </p>

            <h2>8. Contact</h2>
            <p>
              If you have any privacy questions, please contact us at:
              <br />
              hello@launchsite.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}