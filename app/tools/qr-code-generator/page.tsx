import type { Metadata } from "next";
import { QRStudio } from "@/components/tools/qr-studio";

export const metadata: Metadata = {
  title: "Custom QR Code Generator | Sitora",
  description:
    "Create a custom branded QR code with colours, shapes, frames, logo and high-resolution downloads.",
};

export default function QRCodeGeneratorPage() {
  return <QRStudio />;
}
