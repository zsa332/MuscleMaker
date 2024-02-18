import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MM. 세계 최고의 운동 sns를 즐기세요! / MM",
  description: "세계 모든 운동과 식단, 즐거움이 여기에",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
