import type { Metadata } from "next";
import "../styles/globals.css";
import { QueryProvider } from "@/providers/queryProvider";

export const metadata: Metadata = {
  title: "Frontend Challenge",
  description: "Envie suas imagens e compartilhe o link",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
