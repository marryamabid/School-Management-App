import { auth } from "@clerk/nextjs/server";

export default async function getUserRole() {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return { role, currentUserId: userId };
}

// const currentWeekWork = () => {
//   const today = new Date();
//   const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
//   const startOfWeek = new Date(today);
//   if (dayOfWeek === 0) {
//     startOfWeek.setDate(today.getDate() + 1);
//   }
//   if (dayOfWeek === 6) {
//     startOfWeek.setDate(today.getDate() + 2);
//   } else {
//     startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
//   }
//   startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
//   const endOfWeek = new Date(startOfWeek);
//   endOfWeek.setDate(startOfWeek.getDate() + 4); // Work week is 5 days (Mon-Fri)
//   endOfWeek.setHours(23, 59, 59, 999); // End of the day
//   return { startOfWeek, endOfWeek };
// };
// export const adjustScheduleToCurrentWeek = (
//   lessons: { title: string; start: Date; end: Date }[]
// ): { title: string; start: Date; end: Date }[] => {
//   const { startOfWeek, endOfWeek } = currentWeekWork();
//   return lessons.map((lesson) => {
//     const lessonDayOfWeek = lesson.start.getDay(); // 0 (Sun) to 6 (Sat)
//     const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
//     const adjustedStartDate = new Date(startOfWeek);
//     adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
//     adjustedStartDate.setHours(
//       lesson.start.getHours(),
//       lesson.start.getMinutes(),
//       lesson.start.getSeconds()
//     );
//     const adjustedEndDate = new Date(adjustedStartDate);
//     adjustedEndDate.setHours(
//       lesson.end.getHours(),
//       lesson.end.getMinutes(),
//       lesson.end.getSeconds()
//     );
//     return {
//       title: lesson.title,
//       start: adjustedStartDate,
//       end: adjustedEndDate,
//     };
//   });
// };
const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
