import TableSearch from "@/components/TableSeacrch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import { eventsData, role } from "@/lib/data";
import FormModel from "@/components/FormModel";
type Event = {
  id: number;
  title: string;
  student: string;
  class: number;
  startTime: string;
  endTime: string;
  date: string;
};

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

  {
    headers: "Actions",
    accessor: "actions",
  },
];
const EventsListPage = () => {
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>

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
        <Table columns={columns} renderRow={renderRow} data={eventsData} />
        <Pagination />
      </div>
    </div>
  );
};

export default EventsListPage;
