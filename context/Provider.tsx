'use client';
import { SessionProvider } from 'next-auth/react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

const Provider = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </SessionProvider>
  );
};

export default Provider;
