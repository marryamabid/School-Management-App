import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import getUserRole from "@/lib/utils";
import FormModel from "@/components/FormModel";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Event, Prisma } from "@prisma/client";
import { ca } from "zod/locales";
type EventList = Event & { class: Class };

const EventsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, currentUserId } = await getUserRole();
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  // URL PARAMS CONDITIONS
  const query: Prisma.EventWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search": {
            query.title = { contains: value, mode: "insensitive" };
            break;
          }

          default:
            break;
        }
      }
    }
  }
  //Role Condition
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };
  query.OR = [
    { classId: null },
    {
      class: roleConditions[role as keyof typeof roleConditions] || {},
    },
  ];
  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({
      where: query,
    }),
  ]);
  const columns = [
    {
      headers: "Title",
      accessor: "name",
    },
    {
      headers: "Class",
      accessor: "class",
    },

    {
      headers: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      headers: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      headers: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            headers: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];
  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">
        {" "}
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {" "}
        {item.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td className="hidden md:table-cell">
        {" "}
        {item.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel table="event" type="update" data={item} />
              <FormModel table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All Events</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="event" type="create" />}
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

export default EventsListPage;
