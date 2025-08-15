import React from "react";

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200 h-screen  flex flex-col justify-center items-center">
      <div className="relativer rounded-md bg-white/60 p-6 max-w-[440px] w-full">
        <div className="mx-auto w-full max-w-[440px]">{children}</div>
      </div>
    </div>
  );
}
