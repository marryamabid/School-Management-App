import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";

import { role } from "@/lib/data";
import getUserRole from "@/lib/utils";
import FormModel from "@/components/FormModel";
import { ITEM_PER_PAGE } from "@/lib/settings";
import prisma from "@/lib/prisma";
import { Parent, Prisma, Student } from "@prisma/client";
type ParentList = Parent & { students: Student[] };

const ParentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // console.log(searchParams);
  let data: ParentList[] = [];
  let count = 0;
  const { role, currentUserId } = await getUserRole();
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ParentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
            break;
          }
        }
      }
    }
    [data, count] = await prisma.$transaction([
      prisma.parent.findMany({
        where: query,
        include: {
          students: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.parent.count({
        where: query,
      }),
    ]);
  }
  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel table="parent" data={item} type="update" />
              <FormModel table="parent" id={item.id} type="delete" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const columns = [
    {
      headers: "Info",
      accessor: "info",
    },
    {
      headers: "StudentNames",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      headers: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      headers: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All Parents</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="parent" type="create" />}
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

export default ParentsListPage;
