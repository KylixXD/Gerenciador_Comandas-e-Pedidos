import "./globals.css";
import { Providers } from "./providers";
// import { Header } from "@/app/components/organisms/headerProject"

export const metadata = {
  title: "Painel de Comandas",
  description: "Desafio Web - Painel de Gerenciamento",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

