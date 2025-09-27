"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Jan",
    expense: 4000,
    income: 2400,
  },
  {
    name: "Feb",
    expense: 3000,
    income: 1398,
  },
  {
    name: "Mar",
    expense: 2000,
    income: 9800,
  },
  {
    name: "Apr",
    expense: 2780,
    income: 3908,
  },
  {
    name: "May",
    expense: 1890,
    income: 4800,
  },
  {
    name: "Jun",
    expense: 2390,
    income: 3800,
  },
  {
    name: "Jul",
    expense: 3490,
    income: 4300,
  },
  {
    name: "Aug",
    expense: 3490,
    income: 4300,
  },
  {
    name: "Sep",
    expense: 3490,
    income: 4300,
  },
  {
    name: "Oct",
    expense: 3490,
    income: 4300,
  },
  {
    name: "Nov",
    expense: 3490,
    income: 4300,
  },

  {
    name: "Dec",
    expense: 3490,
    income: 4300,
  },
];
import Image from "next/image";
const FinanceChart = () => {
  return (
    <div className="bg-white rounded-2xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance Chart</h1>
        <Image src="/moreDark.png" alt="" height={20} width={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#636c7a" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#636c7a" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
