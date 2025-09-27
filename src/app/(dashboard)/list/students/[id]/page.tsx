import Image from "next/image";
import BigCalendar from "@/components/BigCalender";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import Performance from "@/components/Performance";
const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3 ">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4 ">
          {/* User info cards */}
          <div className="flex flex-1 rounded-md bg-lamaSky gap-4 px-4 py-6">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/6913213/pexels-photo-6913213.jpeg"
                width={144}
                height={144}
                alt=""
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-4 justify-between">
              <h1 className="font-semibold text-xl">Cameron Moran</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
              </p>
              <div className="flex  flex-wrap justify-between items-center gap-2 font-medium text-xs">
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" width={14} height={14} alt="" />
                  <span>A+</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" width={14} height={14} alt="" />
                  <span>January 2025</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" width={14} height={14} alt="" />
                  <span>user@gmail.com</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" width={14} height={14} alt="" />
                  <span>+92 3223982029</span>
                </div>
              </div>
            </div>
          </div>
          {/* Small cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="bg-white mb-4 p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">90%</h1>
                <span className="text-xs text-gray-500">Attendance</span>
              </div>
            </div>
            <div className="bg-white  mb-4 p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">6</h1>
                <span className="text-xs text-gray-500">Grades</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">12</h1>
                <span className="text-xs text-gray-500">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">6A</h1>
                <span className="text-xs text-gray-500">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* bottom*/}
        <div className="mt-4 bg-white p-4 rounded-md h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex flex-wrap gap-4 text-gray-500 text-xs mt-4">
            <Link href="/" className="p-3 rounded-md bg-lamaSkyLight ">
              Student&apos;s teacher
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaPurpleLight ">
              Student&apos;s exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaYellowLight ">
              Student&apos;s lessons
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaSkyLight ">
              Student&apos;s exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaSkyLight ">
              Student&apos;s assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
