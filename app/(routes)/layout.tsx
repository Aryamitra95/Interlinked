import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import ThemeObserver from "@/components/ThemeObserver";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        data-theme="dark"
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black bg-il-back`}>
     <Theme> 
      <div className="flex min-h-screen dark:shadow-gray-600 dark:bg-gray-950 dark:text-gray-300">
        <DesktopNav/>
        <div className="pt-4 pb-24 lg:pb-4 px-4 lg:px-8 flex justify-around w-full">
          <div className="w-full">
          {children}
          </div>
        </div>
          </div>
      <MobileNav/>
      </Theme>  
      <ThemeObserver/> 
      </body>
    </html>
  );
}
