"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    console.log("✅ Redirect page triggered");
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("user:", user);
    console.log("role:", user?.publicMetadata?.role);

    if (isSignedIn && user) {
      const role = user.publicMetadata?.role;
      router.replace(role ? `/${role}` : "/");
    } else {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-lamaSkyLight">
      <p className="text-center text-gray-600 text-lg animate-pulse">
        Redirecting to your dashboard...
      </p>
    </div>
  );
}
