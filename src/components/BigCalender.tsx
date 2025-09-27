"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment, { weekdays } from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);
const BigCalender = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleViewChange = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <Calendar
      views={["work_week", "day"]}
      onView={handleViewChange}
      view={view}
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "98%" }}
      defaultDate={new Date(2024, 7, 12)}
      min={new Date(2024, 7, 1, 8, 0, 0)}
      max={new Date(2024, 7, 1, 17, 0, 0)}
    />
  );
};

export default BigCalender;
