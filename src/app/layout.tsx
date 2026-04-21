import type { Metadata, Viewport } from 'next';
import { Lora, Agbalumo, Outfit, Fira_Code } from 'next/font/google';
import Providers from '@/components/Providers';
import MeshGradient from '@/components/MeshGradient';
import './globals.css';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const agbalumo = Agbalumo({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Nudge — Blockchain é liberdade',
  description:
    'Traduza, aprenda e proteja suas posições DeFi. Sem jargão. Sem complexidade. Só você e seu dinheiro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${lora.variable} ${agbalumo.variable} ${outfit.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <MeshGradient />
        <Providers>
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
