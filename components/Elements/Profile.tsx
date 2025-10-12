"use client";

import React, { useEffect, useState } from "react";
import { IconLogout } from "../Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNo?: string;
  birthDate?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  anniversaryDate?: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        console.log("response >>", response)
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error during logout:', error);
    }

    // Clear client-side storage
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginTimestamp");

    // Clear cookies
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

    // Redirect to login page
    router.push("/login");
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  const displayName = user ? `${user.firstName}` : 'VReserve';
  const displayEmail = user?.email || 'vreserve@gmail.com';
  const initials = user ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}` : 'VR';

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <span className="flex justify-center items-center w-10 h-10 text-center rounded-lg object-cover bg-indigo-500 text-lg text-white">
          {initials}
        </span>

        <div className="truncate">
          <h4 className="text-base">
            {displayName}
            <span className="rounded bg-success-light px-1 text-xs text-success ml-2">
              Pro
            </span>
          </h4>
          <p className="text-black/60 w-34 truncate text-xs">{displayEmail}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="!py-3 text-danger cursor-pointer"
      >
        <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90" />
      </button>
    </div>
  );
};

export default Profile;
