"use client";

import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { useState } from "react";

// Type definitions
type MenuItem = {
  icon: string;
  label: string;
  href?: string;
  visible: string[];
  action?: "logout" | "profile" | "settings";
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const menuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        action: "profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        action: "settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        action: "logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string | undefined;

  if (!role) return null;

  return <ClientMenu role={role} />;
};

// ✅ Client component for interactivity
function ClientMenu({ role }: { role: string }) {
  const [openSection, setOpenSection] = useState<"profile" | "settings" | null>(
    null
  );

  return (
    <div>
      {menuItems.map((section) => (
        <div key={section.title} className="space-y-2 text-sm">
          <span className="font-light hidden lg:block text-gray-400">
            {section.title}
          </span>

          {section.items.map((item) => {
            if (!item.visible.includes(role)) return null;

            if (item.action === "logout") {
              return (
                <SignOutButton redirectUrl="/sign-in" key={item.label}>
                  <button className="flex w-full text-gray-400 items-center md:px-2 justify-center lg:justify-start gap-2 p-2 rounded-md hover:bg-lamaSkyLight">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                </SignOutButton>
              );
            }

            if (item.action === "profile" || item.action === "settings") {
              return (
                <button
                  key={item.label}
                  onClick={() =>
                    setOpenSection(item.action as "profile" | "settings")
                  }
                  className="flex text-gray-400 items-center md:px-2 justify-center lg:justify-start gap-2 p-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                href={item.href!}
                key={item.label}
                className="flex text-gray-400 items-center md:px-2 justify-center lg:justify-start gap-2 p-2 rounded-md hover:bg-lamaSkyLight"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {openSection && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-4 w-[90%] md:w-[600px] h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setOpenSection(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <UserProfile routing="hash" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Menu;
