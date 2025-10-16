import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between items-center mt-4">
        <h2 className="font-semibold text-xl">Announcements</h2>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      {data[0] && (
        <div className="mt-4 bg-lamaSkyLight p-4 rounded-md ">
          <div className="justify-between flex items-center">
            <h2 className="font-medium ">{data[0].title}</h2>
            <span className="text-xs text-gray-400 rounded-md bg-white px-1 py-1">
              {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
            </span>
          </div>
          <p className="text-sm font-light text-gray-400 mt-2">
            {data[0].description}
          </p>
        </div>
      )}

      {data[1] && (
        <div className="mt-4 bg-lamaPurpleLight p-4 rounded-md ">
          <div className="justify-between flex items-center">
            <h2 className="font-medium ">{data[1].title}</h2>
            <span className="text-xs text-gray-400 rounded-md bg-white px-1 py-1">
              {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
            </span>
          </div>
          <p className="text-sm font-light text-gray-400 mt-2">
            {data[1].description}
          </p>
        </div>
      )}
      {data[2] && (
        <div className="mt-4 bg-lamaYellowLight p-4 rounded-md ">
          <div className="justify-between flex items-center">
            <h2 className="font-medium ">{data[2].title}</h2>
            <span className="text-xs text-gray-400 rounded-md bg-white px-1 py-1">
              {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
            </span>
          </div>
          <p className="text-sm font-light text-gray-400 mt-2">
            {data[2].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Announcements;
