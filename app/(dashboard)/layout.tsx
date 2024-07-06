import type { Metadata } from 'next';

import Sidebar from '@/components/Layouts/Sidebar';
import Header from '@/components/Layouts/Header';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-section relative font-nunito text-sm font-normal antialiased">
      <div className="relative">
        <div className={`main-container min-h-screen text-black`}>
          <Sidebar />
          <div className="flex flex-col min-h-screen main-content">
            <Header />
            <div className={`animate__animated p-6 flex-1`}>
              <MantineProvider>{children}</MantineProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}