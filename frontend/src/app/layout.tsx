import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"],
});

export const metadata = {
  title: 'LiteMentor AI',
  description: 'Multilingual AI feedback for students — minimal, private, frontend-only.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden text-black dark:bg-darkTheme dark:text-white `}
      >
        {children}
      </body>
    </html>
  );
}
