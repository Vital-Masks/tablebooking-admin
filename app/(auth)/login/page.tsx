'use client';

import { signIn } from '@/auth';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import IconMail from '@/components/Icons/IconMail';
import IconLockDots from '@/components/Icons/IconLockDots';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Set dummy user to localStorage
    const dummyUser = {
      id: '1',
      name: 'Ginthu',
      email: email || 'test@vitalmask.com',
      role: 'admin',
      isAuthenticated: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    try {
      // Store dummy user in localStorage
      localStorage.setItem('user', JSON.stringify(dummyUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Also store a timestamp for session management
      localStorage.setItem('loginTimestamp', new Date().toISOString());
      
      // Set cookies for middleware authentication
      document.cookie = `auth-token=${JSON.stringify(dummyUser)}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `isLoggedIn=true; path=/; max-age=86400; SameSite=Lax`;
      
      console.log('Dummy user stored in localStorage and cookies:', dummyUser);
      
      // Perform server-side authentication
      await signIn('credentials', formData);
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Even if server auth fails, we still have the dummy user in localStorage and cookies
      // Redirect to dashboard anyway since we have the dummy user
      router.push('/dashboard');
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="Email">Email</label>
        <div className="relative text-white-dark">
          <input
            id="Email"
            name="email"
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
            name="password"
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
      >
        Sign in
      </button>
    </form>
  );
};

Login.title = "Sign in";
export default Login;
