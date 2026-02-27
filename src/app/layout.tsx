import type { Metadata } from "next";
import { DM_Sans, Nunito } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Meu Dinheiro",
  description: "Controle suas finanças pessoais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${nunito.variable}`}>
      <body className="font-sans bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
