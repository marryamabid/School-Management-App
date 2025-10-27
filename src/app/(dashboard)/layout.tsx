import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="flex flex-col h-full w-[14%] lg:w-[16%] md:w-[8%] xl:w-[14%] bg-white border-r overflow-y-auto">
        <div className="flex items-center lg:justify-start gap-2 p-4">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <span className="hidden lg:block font-semibold text-base">
            SchoolLama
          </span>
        </div>
        <Menu />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
