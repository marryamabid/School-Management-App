"use client";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Image from "next/image";
const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = () => {
  return (
    <div className="p-4 bg-white rounded-md flex flex-col gap-4 h-80 relative">
      <div className="flex items-center justify-between ">
        <h1 className="font-semibold text-xl">Performance</h1>
        <Image src="/moreDark.png" alt="" height={14} width={14} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-300">of 10 max LTS</p>
      </div>
      <div>
        <h2 className="absolute bottom-16 font-medium left-0 right-0 m-auto text-center">
          1st Semester - 2nd Semester
        </h2>
      </div>
    </div>
  );
};

export default Performance;
