import Announcements from "@/components/Announcements";
import EventCalender from "@/components/EventCalender";
import BigCalender from "@/components/BigCalender";
const StudentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white  rounded-md p-4 ">
          <h2 className="text-2xl font-semibold">Schedule (4A)</h2>
          <BigCalender />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
