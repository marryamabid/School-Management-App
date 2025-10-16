import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import getUserRole from "@/lib/utils";
import FormModel from "@/components/FormModel";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
type LessonList = Lesson & { subject: Subject } & { teacher: Teacher } & {
  class: Class;
};

const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // console.log(searchParams);
  const { role, currentUserId } = await getUserRole();
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            {
              query.classId = parseInt(value);
            }
            break;
          case "teacherId":
            {
              query.teacherId = value;
            }
            break;
          case "search": {
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          }
        }
      }
    }
  }
  // let data: ClassList[] = [];
  // let count = 0;
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        teacher: { select: { name: true, surname: true } },
        subject: { select: { name: true } },
        class: { select: { name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);

  const columns = [
    {
      headers: "Subject Name",
      accessor: "name",
    },
    {
      headers: "Class",
      accessor: "class",
    },
    {
      headers: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            headers: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];
  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name + " " + item.teacher.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel table="lesson" type="update" data={item} />
              <FormModel table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All Lessons</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="lesson" type="create" />}
          </div>
        </div>
      </div>
      <div>
        {/* Pagiination */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default LessonsListPage;
