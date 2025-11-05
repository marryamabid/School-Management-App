"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function SignInContent() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // ✅ Redirect after successful sign-in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/redirect");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        {/* 👇 Actual sign-in form */}
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

          {/* Username field */}
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

          {/* Password field */}
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

          {/* Sign-in button */}
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition"
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
    <Suspense
      fallback={
        <div className="text-center mt-10">Loading sign-in page...</div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
