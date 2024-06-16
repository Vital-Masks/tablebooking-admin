import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import Sidebar from '@/components/Layouts/Sidebar';
import Header from '@/components/Layouts/Header';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className="main-section relative font-nunito text-sm font-normal antialiased">
          <div className="relative">
            <div
              className={`main-container min-h-screen text-black dark:text-white-dark`}
            >
              <Sidebar />
              <div className="flex flex-col min-h-screen main-content">
                <Header />
                <div className={`animate__animated p-6`}>
                  <MantineProvider>{children}</MantineProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
