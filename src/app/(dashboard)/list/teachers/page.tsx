import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import getUserRole from "@/lib/utils";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormModel from "@/components/FormModel";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
type teacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const TeachersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role } = await getUserRole();
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  // URL PARAMS CONDITIONS
  const query: Prisma.TeacherWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            {
              query.lessons = { some: { classId: parseInt(value) } };
            }
            break;
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
            break;
          }

          default:
            break;
        }
      }
    }
    const [data, count] = await prisma.$transaction([
      prisma.teacher.findMany({
        where: query,
        include: {
          subjects: true,
          classes: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.teacher.count({
        where: query,
      }),
    ]);
    // console.log(data);
    const renderRow = (item: teacherList) => (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.img || "/noavatar.png"}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item?.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.id}</td>
        <td className="hidden md:table-cell">
          {item.subjects.map((subject) => subject.name).join(",")}
        </td>
        <td className="hidden md:table-cell">
          {item.classes.map((classItem) => classItem.name).join(",")}
        </td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <>
                {/* <FormContainer table="teacher" data={item} type="update" /> */}
                <FormContainer table="teacher" id={item.id} type="delete" />
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
        headers: "TeacherID",
        accessor: "teacherID",
        className: "hidden md:table-cell",
      },
      {
        headers: "Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell",
      },
      {
        headers: "Classes",
        accessor: "classes",
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
          <h2 className="hidden md:block text-lg font-semibold">
            All Teachers
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
              {role === "admin" && (
                <FormContainer table="teacher" type="create" />
              )}
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
  }
};
export default TeachersPage;
