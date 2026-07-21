import type { Metadata } from "next";
import { AppointmentCardStudio } from "@/components/tools/appointment-card-studio";

export const metadata: Metadata = {
  title: "Free Appointment Card Generator | Sitora",
  description:
    "Create a branded, print-ready appointment card with your logo, clinic details, appointment fields and custom QR code.",
};

export default function AppointmentCardGeneratorPage() {
  return <AppointmentCardStudio />;
}
