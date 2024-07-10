import IconMail from '@/components/Icons/IconMail';
import IconLockDots from '@/components/Icons/IconLockDots';
import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      router.push('/');
    }
  };

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
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="Email">Email</label>
                  <div className="relative text-white-dark">
                    <input
                      id="Email"
                      type="email"
                      placeholder="Enter Email"
                      className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail fill={true} />
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="Password">Password</label>
                  <div className="relative text-white-dark">
                    <input
                      id="Password"
                      type="password"
                      placeholder="Enter Password"
                      className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconLockDots fill={true} />
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                  aria-disabled={isPending}
                >
                  Sign in
                </button>
                <div
                  className="flex h-8 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {errorMessage && (
                    <>
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                  )}
                </div>
              </form>

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
};

export default Login;
