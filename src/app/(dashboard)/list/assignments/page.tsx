import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import FormModel from "@/components/FormModel";
import getUserRole from "@/lib/utils";
import { ITEM_PER_PAGE } from "@/lib/settings";
import prisma from "@/lib/prisma";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import { de } from "zod/locales";
type AssignmentList = Assignment & {
  lesson: { subject: Subject } & { teacher: Teacher } & { class: Class };
};

const AssignmentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // console.log(searchParams);

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.AssignmentWhereInput = { lesson: {} };
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;

      switch (key) {
        case "classId":
          query.lesson!.classId = parseInt(value);
          break;
        case "teacherId":
          query.lesson!.teacherId = value;
          break;
        case "search":
          query.lesson!.subject = {
            name: { contains: value, mode: "insensitive" },
          };
          break;
        default:
          break;
      }
    }
  }
  const { role, currentUserId } = await getUserRole();
  //Role Condition
  switch (role) {
    case "admin":
      break; // full access
    case "teacher":
      query.lesson!.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson!.class = {
        students: { some: { id: currentUserId! } },
      };
      break;
    case "parent":
      query.lesson!.class = {
        students: { some: { parentId: currentUserId! } },
      };
      break;
    default:
      // deny access for unknown role
      query.lesson!.id = -1;
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({
      where: query,
    }),
  ]);

  const columns = [
    {
      headers: "Subject ",
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
    {
      headers: "Due Date",
      accessor: "dueDate",
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

  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModel table="assignment" type="update" data={item} />
                <FormModel table="assignment" type="delete" id={item.id} />
              </>
            ))}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="assignment" type="create" />}
          </div>
        </div>
      </div>
      <div>
        {/* Pagiination */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        <Pagination count={count} page={p} />
      </div>
    </div>
  );
};

export default AssignmentsListPage;
