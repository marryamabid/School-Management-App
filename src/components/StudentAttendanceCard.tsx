import prisma from "@/lib/prisma";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });
  const totalDays = attendance.length;
  const presentDays = attendance.filter((day) => day.present).length;
  const percetage = (presentDays / totalDays) * 100;
  return (
    <div className="">
      <h1 className="font-semibold text-xl">{percetage || "-"}%</h1>
      <span className="text-xs text-gray-500">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
