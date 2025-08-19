import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import './globals.css';
import Provider from '@/context/Provider';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'VReserve',
  description: 'VReserve',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={nunito.className}>
          <Toaster />
          {children}
        </body>
      </Provider>
    </html>
  );
}
