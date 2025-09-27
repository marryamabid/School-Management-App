import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import { role } from "@/lib/data";
import { teachersData } from "@/lib/data";
import FormModel from "@/components/FormModel";
type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};
const renderRow = (item: Teacher) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.photo}
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
    <td className="hidden md:table-cell">{item.teacherId}</td>
    <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
    <td className="hidden md:table-cell">{item.classes.join(",")}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModel table="teacher" data={item} type="update" />
            <FormModel table="teacher" id={item.id} type="delete" />
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
  {
    headers: "Actions",
    accessor: "actions",
  },
];
const TeachersPage = () => {
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All Teachers</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="teacher" type="create" />}
          </div>
        </div>
      </div>
      <div>
        {/* Pagiination */}
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
        <Pagination />
      </div>
    </div>
  );
};

export default TeachersPage;
