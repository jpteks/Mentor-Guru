import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
<<<<<<< HEAD
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})
=======
import { PHProvider } from "./providers";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

>>>>>>> 0a75d5028136a5b6f3f5e00e9cd8af618dcce4b7
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mentor Guru",
  description: "MentorGuru E-learning Web Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
<<<<<<< HEAD
        <PHProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position='top-center' />
          <PostHogPageView /> 
          {children}
        </ThemeProvider>
      </body>
=======
      <PHProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <PostHogPageView />
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position='top-center' />
            {children}
          </ThemeProvider>
        </body>
>>>>>>> 0a75d5028136a5b6f3f5e00e9cd8af618dcce4b7
      </PHProvider>
    </html>
  );
}
