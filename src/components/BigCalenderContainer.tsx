import prisma from "@/lib/prisma";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import BigCalender from "./BigCalender";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });
  const PK_OFFSET_MS = 5 * 60 * 60 * 1000;
  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: new Date(new Date(lesson.startTime).getTime() + PK_OFFSET_MS),
    end: new Date(new Date(lesson.endTime).getTime() + PK_OFFSET_MS),
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalender data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
