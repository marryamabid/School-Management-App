import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import MenuServer from "@/components/Menu";
import Menu from "@/components/Menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="flex flex-col h-full w-[14%] lg:w-[16%] md:w-[8%] xl:w-[14%] bg-white border-r overflow-y-auto">
        <div className="lg:justify-start p-4 text-xl font-bold flex items-center gap-2 text-lamaPurple hover:text-lamaSky transition">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <Link href="/" className="hidden lg:block">
            <span className="hidden lg:block font-semibold text-base">
              SmartSchool
            </span>
          </Link>
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
