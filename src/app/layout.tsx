import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: {
    default: "BookNook | A Small Online Library",
    template: "BookNook | %s",
  },
  description: "Add a book, borrow a book, return a book.",
};

// Sets the saved (or device) theme before the page paints, so there is no flash
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="booknook"&&t!=="booknook-dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"booknook-dark":"booknook"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
