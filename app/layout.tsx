import type { Metadata } from "next";
import { Petrona } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const petrona = Petrona({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-petrona",
});

export const metadata: Metadata = {
  title: "Care Cover",
  description: "Finding Locum made easier for Healthcare Professionals.",
  icons: {
    icon: "/assets/images/logo.svg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={petrona.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
