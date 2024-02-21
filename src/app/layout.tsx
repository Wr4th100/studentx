import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Nav from "@/components/navbar/Nav";
import { ToastProvider } from "@/components/providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "StudentX",
  description: "StudentX - Student Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <ToastProvider>
            <Nav />
            {children}
          </ToastProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
