import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "منان | نوشته‌ها و یادداشت‌ها",
    template: "%s | منان",
  },
  description: "یادداشت‌هایی درباره تصمیم‌گیری، مدیریت، رهبری تیم و ساختن کسب‌وکار.",
  keywords: ["منان", "مدیریت", "تصمیم‌گیری", "کارآفرینی", "تفکر سیستمی", "پرینترلند"],
  authors: [{ name: "منان" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-paper text-navy font-sans antialiased selection:bg-accent/30 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
