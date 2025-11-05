"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function SignInContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // ✅ Redirect to dashboard after sign-in based on role
  useEffect(() => {
    // Only run when Clerk is fully loaded
    if (!isLoaded) return;

    if (isSignedIn && user) {
      const role = user.publicMetadata?.role;

      if (role) {
        router.push(`/${role}`);
      } else {
        router.push("/");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-3 w-[360px]"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 text-lamaPurple hover:text-lamaSky transition">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            SmartLearn
          </h1>
          <h2 className="text-gray-400 mb-2">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="username" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          {/* ✅ Password */}
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

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading sign-in page...</div>}>
      <SignInContent />
    </Suspense>
  );
}
