import type { Metadata } from "next";

import { HealthcarePostIdeasClient } from "@/components/tools/healthcare-post-ideas-client";
import { dentalIdeaCount } from "@/lib/healthcare-post-ideas";

const pageUrl = "https://sitora.co.uk/tools/healthcare-post-ideas";

export const metadata: Metadata = {
  title: "500 Free Social Media Ideas for Dentists | Sitora",
  description:
    "Explore 500 free social media content ideas for dentists across oral health, prevention, treatments, cosmetic dentistry, patient questions and more. No signup required.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "500 Free Social Media Ideas for Dentists | Sitora",
    description:
      "Choose from ten dental content categories, search 500 ideas and save useful topics to your device. Free and available without signup.",
    url: pageUrl,
    siteName: "Sitora",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "500 Free Social Media Ideas for Dentists | Sitora",
    description:
      "A free, searchable dental social media idea library. No signup required.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Healthcare Post Ideas by Sitora",
  description:
    "A free interactive library of social media content ideas for healthcare professionals, beginning with dentists.",
  url: pageUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  featureList: [
    `${dentalIdeaCount} dental social media ideas`,
    "Ten dental content categories",
    "Search and content format filters",
    "Save ideas without an account",
    "Copy ready-to-use content briefs",
  ],
};

export default function HealthcarePostIdeasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HealthcarePostIdeasClient />
    </>
  );
}
