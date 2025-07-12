import { Outfit, Ovo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"],
});

export const metadata = {
  metadataBase: new URL('https://litementorai.vercel.app'), // 👈 Your deployed domain
  title: 'LiteMentor.AI',
  description: 'AI-powered feedback for students. Free, private, and frontend-only.',
  openGraph: {
    title: 'LiteMentor.AI',
    description: 'Get instant feedback on your written answers — clarity, logic, and suggestions. Free & private.',
    images: ['/og-cover.png'],
    url: 'https://litementorai.vercel.app',
    siteName: 'LiteMentor.AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LiteMentor.AI',
    description: 'Free academic AI feedback — no accounts, no backend.',
    images: ['/og-cover.png'],
  },
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden text-black dark:bg-darkTheme dark:text-white `}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
