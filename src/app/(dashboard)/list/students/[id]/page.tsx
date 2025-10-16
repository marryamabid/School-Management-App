import Image from "next/image";

import Announcements from "@/components/Announcements";
import Link from "next/link";
import Performance from "@/components/Performance";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import getUserRole from "@/lib/utils";
import { Class, Lesson, Student } from "@prisma/client";
import { count } from "console";
import { Suspense } from "react";
import FormContainer from "@/components/FormContainer";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import BigCalendarContainer from "@/components/BigCalenderContainer";
const SingleStudentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) {
    return notFound();
  }
  const { role } = await getUserRole();
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
                src={student.img || "/noavatar.png"}
                width={144}
                height={144}
                alt=""
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-4 justify-between">
              <div className="flex items-center gap-4">
                <h1 className="font-semibold text-xl">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>

              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
              </p>
              <div className="flex  flex-wrap justify-between items-center gap-2 font-medium text-xs">
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" width={14} height={14} alt="" />
                  <span>{student.bloodType}</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" width={14} height={14} alt="" />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(
                      new Date(student.birthday)
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" width={14} height={14} alt="" />
                  <span>{student.email || "-"}</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" width={14} height={14} alt="" />
                  <span>{student.phone || "-"}</span>
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
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
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
                <h1 className="font-semibold text-xl">
                  {student.class?.name.charAt(0)}th
                </h1>
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
                <h1 className="font-semibold text-xl">
                  {student.class?._count.lessons}
                </h1>
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
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>

      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex flex-wrap gap-4 text-gray-500 text-xs mt-4">
            <Link
              href={`/list/teachers?classId=${2}`}
              className="p-3 rounded-md bg-lamaSkyLight "
            >
              Student&apos;s teacher
            </Link>
            <Link
              href={`/list/exams?classId=${2}`}
              className="p-3 rounded-md bg-lamaPurpleLight "
            >
              Student&apos;s exams
            </Link>
            <Link
              href={`/list/lessons?classId=${2}`}
              className="p-3 rounded-md bg-lamaYellowLight "
            >
              Student&apos;s lessons
            </Link>
            <Link
              href={`/list/results?studenId=${"student2"}`}
              className="p-3 rounded-md bg-lamaSkyLight "
            >
              Student&apos;s results
            </Link>
            <Link
              href={`/list/assignments?classId=${2}`}
              className="p-3 rounded-md bg-lamaSkyLight "
            >
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
