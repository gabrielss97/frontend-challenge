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
    // suppressHydrationWarning foi incluido porque a extensão do chrome Colorzilla estava incluindo o codigo cz-shortcut-listen=true no html e o Next estava reclamando, o erro não causa nada no projeto
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
