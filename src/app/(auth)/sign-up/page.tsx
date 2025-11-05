"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function SignUpContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // ✅ Redirect signed-in users to the redirect page for role routing
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user) {
      router.replace("/redirect");
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignUp.Root>
        {/* STEP 1: Sign-up form */}
        <SignUp.Step
          name="start"
          className="bg-white p-12 rounded-2xl shadow-2xl flex flex-col gap-3 w-[360px]"
        >
          {/* Logo */}
          <h1 className="text-xl font-bold flex items-center gap-2 text-lamaPurple hover:text-lamaSky transition">
            <Image src="/logo.png" alt="logo" width={28} height={28} />
            SmartLearn
          </h1>
          <h2 className="text-gray-500 mb-2">Create your account</h2>

          {/* Errors */}
          <Clerk.GlobalError className="text-sm text-red-400" />

          {/* Username */}
          <Clerk.Field name="username" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              placeholder="e.g. student123"
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-lamaPurple outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          {/* Email */}
          <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Email</Clerk.Label>
            <Clerk.Input
              type="email"
              required
              placeholder="your@email.com"
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-lamaPurple outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          {/* Password */}
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              placeholder="••••••••"
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-lamaPurple outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          {/* Sign Up Button */}
          <SignUp.Action
            submit
            className="bg-lamaPurple hover:bg-lamaSky text-white my-1 rounded-md text-sm p-[10px] transition"
          >
            Sign Up
          </SignUp.Action>

          {/* Link to Sign In */}
          <p className="text-xs text-gray-500 text-center mt-2">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-lamaPurple hover:text-lamaSky font-medium transition"
            >
              Sign In
            </Link>
          </p>
        </SignUp.Step>

        {/* STEP 2: Email verification */}
        <SignUp.Step name="verifications">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[360px] text-center">
            <h2 className="text-lg font-semibold text-lamaPurple mb-3">
              Verify your email
            </h2>
            <p className="text-gray-500 mb-4 text-sm">
              We’ve sent a verification code to your email. Please check your
              inbox.
            </p>
            <SignUp.Action
              submit
              className="bg-lamaPurple hover:bg-lamaSky text-white rounded-md text-sm p-[10px] transition"
            >
              Continue
            </SignUp.Action>
          </div>
        </SignUp.Step>

        {/* STEP 3: Restricted (if any issue or verification fails) */}
        <SignUp.Step name="restricted">
          <p className="text-center text-red-500 mt-10">
            Your sign-up session is restricted. Please try again.
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-10">Loading sign-up page...</div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
