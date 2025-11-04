"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactForm from "@/components/forms/ContactForm";

export default function LandingPage() {
  const { isSignedIn, user } = useUser();

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-lamaPurpleLight shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/">
            <h1 className="text-xl font-bold flex items-center gap-2 text-lamaPurple hover:text-lamaSky transition">
              <Image
                src="/logo.png"
                alt="SmartLearn logo"
                width={28}
                height={28}
              />
              SmartLearn
            </h1>
          </Link>

          {/* Navbar Links */}
          <div className="md:flex space-x-8 text-gray-600 items-center">
            <Link
              href="#about"
              className="hidden md:block text-gray-400 hover:text-lamaPurple transition duration-200"
            >
              About
            </Link>
            <Link
              href="#features"
              className="hidden md:block text-gray-400 hover:text-lamaSky transition duration-200"
            >
              Features
            </Link>
            <Link
              href="#contact"
              className="hidden md:block text-gray-400 hover:text-lamaYellow transition duration-200"
            >
              Contact
            </Link>

            {/* Auth Buttons */}
            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className="bg-lamaPurple text-white px-4 py-2 rounded-md hover:bg-lamaSky transition duration-300 shadow-sm"
              >
                Get Started
              </Link>
            ) : (
              <SignOutButton redirectUrl="/">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-sm">
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-lamaPurpleLight via-white to-lamaSkyLight flex mt-9 flex-col-reverse items-center justify-between mx-auto gap-10 py-20 px-8 md:flex-row max-w-7xl">
        {/* Left Text Section */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-snug drop-shadow-sm">
            Making Learning Smarter and Simpler
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            SmartLearn helps schools streamline classes, attendance, and
            communication — all in one intuitive platform.
          </p>
          <div className="flex gap-6 justify-center md:justify-start">
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="px-6 py-3 bg-lamaPurple text-white rounded-md hover:bg-lamaSky transition duration-300"
              >
                Get Started
              </Link>
            )}
            {isSignedIn ? (
              <Link
                href={`/${user?.publicMetadata?.role || "student"}`}
                className="bg-lamaPurple text-white px-6 py-3 rounded-lg hover:bg-lamaSky transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="#features"
                className="bg-lamaSky text-white px-6 py-3 rounded-lg hover:bg-lamaPurple transition"
              >
                Explore Features
              </Link>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/heroimage.jpg"
            alt="Students learning with SmartLearn"
            width={500}
            height={400}
            className="rounded-2xl shadow-md transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
            priority
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container max-w-6xl px-6 py-16 mx-auto">
        <h1 className="mb-10 text-4xl font-bold text-center text-gray-800">
          About <span className="text-lamaPurple">SmartLearn</span>
        </h1>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src="/about.jpg"
              alt="Students learning through SmartLearn dashboard"
              width={450}
              height={350}
              className="rounded-2xl shadow-md transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
              priority
            />
          </div>

          <div>
            <p className="text-md font-semibold text-lamaSky uppercase mb-2">
              About SmartLearn
            </p>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Simplifying School Management with Technology
            </h2>
            <p className="mb-4 text-gray-600">
              Founded to make education smarter, SmartLearn provides an
              all-in-one platform for schools to manage students, teachers,
              attendance, and communication effortlessly.
            </p>
            <p className="text-gray-600">
              Our mission is to bridge the gap between traditional learning and
              modern digital tools — giving educators more time to teach and
              students more ways to learn.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" aria-hidden="true" />

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 bg-lamaPurpleLight/40">
        <div className="px-6 mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="mb-3 text-xl font-semibold text-lamaPurple">
                Automated Attendance
              </h3>
              <p className="text-gray-600">
                Track and manage student attendance in real-time — saving
                teachers hours every week.
              </p>
            </article>
            <article className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="mb-3 text-xl font-semibold text-lamaPurple">
                Digital Reports
              </h3>
              <p className="text-gray-600">
                Generate performance reports instantly with easy-to-read charts
                and insights for teachers and parents.
              </p>
            </article>
            <article className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="mb-3 text-xl font-semibold text-lamaPurple">
                Seamless Communication
              </h3>
              <p className="text-gray-600">
                Connect teachers, parents, and students through announcements
                and messaging features.
              </p>
            </article>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" aria-hidden="true" />

      {/* Contact Section */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
