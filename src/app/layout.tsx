import type { Metadata } from 'next';
import { Share_Tech_Mono, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});

const outfit = Outfit({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "techFEST'26 | SLIET Longowal",
  description: "SLIET Longowal's Annual Technical Festival — Enter the Matrix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${shareTechMono.variable} ${outfit.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
