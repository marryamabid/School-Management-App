import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";

// Type definitions for menu items
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

export default async function Menu() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string | undefined;

  if (!role) return null;

  return (
    <div>
      {menuItems.map((section) => (
        <div key={section.title} className="space-y-2 text-sm">
          <span className="font-light hidden lg:block text-gray-400">
            {section.title}
          </span>

          {section.items.map((item) => {
            if (!item.visible.includes(role)) return null;

            // ✅ Logout button
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
              return <UserButton key={item.label} />;
            }

            // ✅ Normal app route
            if (item.href) {
              return (
                <Link
                  href={item.href}
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
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}
