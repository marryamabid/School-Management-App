import Announcements from "@/components/Announcements";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import Footer from "@/components/Footer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async () => {
  const { userId } = await auth();
  return (
    <div className="p-4 flex flex-1 gap-4 flex-col xl:flex-row">
      <div className="w-full  xl:w-2/3">
        <div className="h-full  bg-white  rounded-md p-4 ">
          <h2 className="text-2xl font-semibold">Schedule </h2>
          <BigCalenderContainer type="teacherId" id={userId!} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
      <Footer />
    </div>
  );
};

export default TeacherPage;
