import React from 'react';

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200">
      <div className="flex h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[670px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2">
          <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg ">
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-5">
                <h1 className="text-xl font-extrabold uppercase !leading-snug text-primary">
                  Sign in
                </h1>
              </div>
              {children}
              {/* <div className="text-center">
                Don't have an account ?&nbsp;
                <Link
                  href="/auth/boxed-signup"
                  className="uppercase text-primary underline transition hover:text-black"
                >
                  SIGN UP
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
