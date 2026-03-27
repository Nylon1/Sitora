import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type StepItem = {
  number: string;
  title: string;
  text: string;
};

export type TestimonialItem = {
  name: string;
  business: string;
  quote: string;
};

export type FAQItem = {
  q: string;
  a: string;
};
