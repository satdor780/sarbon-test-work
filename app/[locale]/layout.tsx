import { routing } from "@/src/shared/i18n";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Roboto } from "next/font/google";
import { QueryProvider } from "@/src/shared/providers";
import { Sidebar } from "@/src/shared/components/layout";

 
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
 
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
 
  return (
    <html lang={locale} className={`${roboto.variable} antialiased`}>
      <body>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="flex h-screen overflow-hidden bg-background">
              <Sidebar locale={locale} />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}