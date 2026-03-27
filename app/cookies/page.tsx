import Link from "next/link";

export default function CookiesPage() {
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
            Cookies Policy
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/65">
            Last updated: 26 March 2026
          </p>

          <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/72 prose-li:text-white/72 prose-strong:text-white prose-headings:text-white">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit
              a website. They help websites function properly and improve user
              experience.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>We may use cookies to:</p>
            <ul>
              <li>Remember basic preferences</li>
              <li>Improve site performance</li>
              <li>Understand how visitors use the website</li>
              <li>Support analytics or functionality tools</li>
            </ul>

            <h2>3. Types of Cookies</h2>
            <ul>
              <li>
                <strong>Essential cookies</strong> – needed for the site to work
              </li>
              <li>
                <strong>Analytics cookies</strong> – help us understand traffic
                and usage
              </li>
              <li>
                <strong>Functional cookies</strong> – support user experience
              </li>
            </ul>

            <h2>4. Third-Party Cookies</h2>
            <p>
              Some third-party tools used on this website may set cookies,
              including analytics or embedded services.
            </p>

            <h2>5. Managing Cookies</h2>
            <p>
              You can control or delete cookies through your browser settings.
              Disabling some cookies may affect how the website functions.
            </p>

            <h2>6. Contact</h2>
            <p>
              For any questions about cookies, contact:
              <br />
              hello@launchsite.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}