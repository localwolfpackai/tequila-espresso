import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteNav } from "@/components/layouts/site-nav";

export const metadata: Metadata = {
  title: "Tequila Espresso",
  description: "A warm, considered design system — accessible primitives, token-driven themes, and documented patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <div className="relative min-h-screen px-6 py-4 md:px-10">
            <SiteNav />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
