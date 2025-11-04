import Announcements from "@/components/Announcements";
import EventCalender from "@/components/EventCalender";

import BigCalendarContainer from "@/components/BigCalenderContainer";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Footer from "@/components/Footer";
const StudentPage = async () => {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white  rounded-md p-4 ">
          <h2 className="text-2xl font-semibold">Schedule (4A)</h2>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage;
