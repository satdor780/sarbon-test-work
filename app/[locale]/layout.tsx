import { routing } from "@/src/shared/i18n";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Roboto } from "next/font/google";
import { QueryProvider } from "@/src/shared/providers";
import { Sidebar } from "@/src/shared/components/layout";

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
              <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
                {children}
              </main>
            </div>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
