'use client';
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { MantineProvider } from '@mantine/core';
import {  useSelector } from 'react-redux';
import { IRootState } from '@/store';


const MainLayout = ({ children }: any) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  return (
    <div
      className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${
        themeConfig.menu
      } ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section relative font-nunito text-sm font-normal antialiased`}
    >
      <div className="relative">
        <div
          className={`${themeConfig.navbar} main-container min-h-screen text-black`}
        >
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
};

export default MainLayout;
