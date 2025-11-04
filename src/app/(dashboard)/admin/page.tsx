import Announcements from "@/components/Announcements";

import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalender from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left Content */}
      <div className="w-full lg:w-2/3">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        {/* Middle Content */}
        <div className="flex gap-4 flex-col lg:flex-row mt-4">
          {/* Bar Chart */}
          <div className="w-full lg:w-1/3 h-[450px] ">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px] ">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-[500px] mt-4">
          <FinanceChart />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
