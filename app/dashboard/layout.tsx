import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import ThemeProvider from '@/context/ThemeProvider';
import MainLayout from '@/components/Layouts/MainLayout';

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}
