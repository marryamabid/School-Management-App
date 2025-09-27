import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import { resultsData, role } from "@/lib/data";
import FormModel from "@/components/FormModel";
type Result = {
  id: number;
  subject: string;
  student: string;
  score: number;
  teacher: number;
  class: number;
  date: string;
  type: "exam" | "assignment";
};

const columns = [
  {
    headers: "Subject",
    accessor: "name",
  },
  {
    headers: "Student",
    accessor: "student",
  },

  {
    headers: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    headers: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    headers: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    headers: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    headers: "Actions",
    accessor: "actions",
  },
];
const ResultsListPage = () => {
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel table="result" data={item} type="update" />
              <FormModel table="result" id={item.id} type="delete" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All Results</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/filt.png" alt="" width={14} height={14} />
            </button>
            <button className="flex w-8 h-8 items-center justify-center bg-lamaYellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="result" type="create" />}
          </div>
        </div>
      </div>
      <div>
        {/* Pagiination */}
        <Table columns={columns} renderRow={renderRow} data={resultsData} />
        <Pagination />
      </div>
    </div>
  );
};

export default ResultsListPage;
