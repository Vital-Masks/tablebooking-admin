import Link from 'next/link';
import React from 'react';
import Button from './Button';

const PageHeader = ({ pageHeaderData }: any) => {
  return (
    <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
      <h2 className="text-lg text-black font-bold">{pageHeaderData.title}</h2>
      <div className="flex items-center gap-2">
        <Button type="outlined">{pageHeaderData.button1.title}</Button>
        <Link href={pageHeaderData.button2.action}>
          <Button type="filled">{pageHeaderData.button2.title}</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageHeader;
