"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

function SignInContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    // Wait a tiny bit to ensure user metadata is loaded
    const timer = setTimeout(() => {
      const role = user?.publicMetadata?.role;
      if (role) {
        console.log("✅ Redirecting to", `/${role}`);
        router.push(`/${role}`);
      } else {
        console.warn("⚠️ No role found in user.publicMetadata");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 text-lamaPurple hover:text-lamaSky transition">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            SmartLearn
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />

          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>

          <p className="text-xs text-gray-500 text-center mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-lamaPurple hover:text-lamaSky font-medium transition"
            >
              Sign Up
            </Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading sign-in page...</div>}>
      <SignInContent />
    </Suspense>
  );
}
