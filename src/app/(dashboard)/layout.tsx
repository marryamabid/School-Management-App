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
    <div className="flex h-screen">
      <div className="w-[14%] lg:w-[16%] md:w-[8%] xl:w-[14%]">
        <Link href="/" className="flex items-center lg:justify-start gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <span className="hidden lg:block font-semibold text-base ">
            SchoolLama
          </span>
        </Link>
        <Menu />
      </div>
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
