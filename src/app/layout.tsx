import type { Metadata } from 'next';
import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/nav-bar';

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'MET Museum',
  description: 'The Metropolitan Museum of Art',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${jost.variable}  antialiased`}>
        <Navbar />
        <main className="container mx-auto p-2 md:p-6 h-full">{children}</main>
      </body>
    </html>
  );
}
