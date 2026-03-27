import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchSite | Free Website Campaign",
  description:
    "Apply for a free professional website for your business. Limited spots available for selected businesses with no existing website.",
  openGraph: {
    title: "LaunchSite | Free Website Campaign",
    description:
      "Apply for a free professional website for your business. Limited spots available for selected businesses with no existing website.",
    url: "https://launchsite.co",
    siteName: "LaunchSite",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LaunchSite Free Website Campaign",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchSite | Free Website Campaign",
    description:
      "Apply for a free professional website for your business. Limited spots available for selected businesses with no existing website.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="bg-[#040714] text-white antialiased">{children}</body>
    </html>
  );
}
