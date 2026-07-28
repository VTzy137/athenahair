import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/app/SiteHeader";
import { SITE_NAME } from "@/lib/constants/site";
import "@/lib/themes/globals.css";
import { ChatBox } from "@/components/ChatBox";
import { SiteFooter } from "./SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: `${SITE_NAME} — hair market storefront`,
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans bg-background text-foreground transition-colors duration-200">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <ChatBox />
        <SiteFooter />
      </body>
    </html>
  );
}
