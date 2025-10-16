import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import getUserRole from "@/lib/utils";
import FormModel from "@/components/FormModel";
import { Class, Prisma, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormContainer from "@/components/FormContainer";
type ClassList = Class & { supervisor: Teacher };

const SubjectsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // console.log(searchParams);
  const { role, currentUserId } = await getUserRole();
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ClassWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            {
              query.supervisorId = value;
            }
            break;
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
            break;
          }
        }
      }
    }
  }
  // let data: ClassList[] = [];
  // let count = 0;
  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({
      where: query,
    }),
  ]);
  const columns = [
    {
      headers: "Class Name",
      accessor: "name",
    },
    {
      headers: "Capacity",
      accessor: "name",
      className: "hidden md:table-cell",
    },
    {
      headers: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      headers: "Supervisor",
      accessor: "supervisor",
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
  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">
        {item.supervisor.name + " " + item.supervisor.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="class" type="update" data={item} />
              <FormContainer table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All Classes</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="class" type="create" />}
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

export default SubjectsListPage;
