import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
const ParentPage = () => {
  return (
    <div className="p-4 flex flex-1 gap-4 flex-col xl:flex-row">
      <div className="w-full  xl:w-2/3">
        <div className="h-full  bg-white  rounded-md p-4 ">
          <h2 className="text-2xl font-semibold">Schedule (John Doe) </h2>
          <BigCalender />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
