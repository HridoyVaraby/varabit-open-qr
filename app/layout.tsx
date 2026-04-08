import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varabit Open QR - Free QR Code Generator",
  description: "Generate custom QR codes instantly. Free, fast, and no tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
