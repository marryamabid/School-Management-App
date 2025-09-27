"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="p-4 rounded-md bg-white">
      <Calendar onChange={onChange} value={value} />
      <div className="flex justify-between items-center my-4 ">
        <h1 className="font-semibold text-xlmy-4 ">Events</h1>
        <Image src="/moreDark.png" alt="" height={20} width={20} />
      </div>
      <div className="flex flex-col gap-4 ">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-md p-4 border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-500">{event.title}</div>
              <div className="text-gray-400 text-xs">{event.time}</div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
