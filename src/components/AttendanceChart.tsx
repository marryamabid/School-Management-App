"use client";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
const data = [
  {
    name: "Mon",
    absent: 50,
    present: 60,
  },
  {
    name: "Tues",
    absent: 40,
    present: 60,
  },
  {
    name: "Wed",
    absent: 50,
    present: 70,
  },
  {
    name: "Thurs",
    absent: 29,
    present: 80,
  },
  {
    name: "Fri",
    absent: 50,
    present: 40,
  },
];
const AttendanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg h-full">
      <div className="flex justify-between items-center ">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" height={20} width={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#636c7a" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#636c7a" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
