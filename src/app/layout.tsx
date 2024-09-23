import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./_header/header";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/providers/Session.provider";
import { validateRequest } from "@/lib/validate-request";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Connect",
  description: "An application for developers to connect and share their programming skills and ideas online.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const sessionData = await validateRequest()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider value={sessionData}>
          <Providers>
            <NextTopLoader />
              <Header />
              <div className="container mx-auto">{children}</div>
          </Providers>
        </SessionProvider>    
        
        <Toaster />
      </body>
    </html>
  );
}
