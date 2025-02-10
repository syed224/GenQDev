import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";

import ExitModal from "@/components/Modals/ExitModal";
import HeartsModal from "@/components/Modals/HeartsModal";
import PracticeModal from "@/components/Modals/PracticeModal";
import { DarkModeProvider } from "@/components/DarkModeContext";
import type { AppProps } from "next/app";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenQ",
  description: "Learn, Practice and master new languages with GenQ.",
  icons: {
    apple: "/genq-512.png",
    icon: "/genq-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1468CF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "only light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DarkModeProvider>
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#1468CF",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
    </DarkModeProvider>
  );
}
