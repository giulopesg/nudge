import { Outfit, Fira_Code, Cormorant_Garamond, Lora } from 'next/font/google';

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

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'Nudge — Design System v2',
};

export default function DesignDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${outfit.variable} ${firaCode.variable} ${cormorant.variable} ${lora.variable}`}>
      {children}
    </div>
  );
}
