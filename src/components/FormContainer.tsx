import prisma from "@/lib/prisma";
import FormModel from "./FormModel";
import { auth } from "@clerk/nextjs/server";
export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  id?: number | string;
  // userId?: string | number;
  data?: any;
};

const FormContainer = async ({ table, id, data, type }: FormContainerProps) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  let relatedData = {};
  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
          },
        });
        relatedData = { teachers: subjectTeachers };
        break;

      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { subjects: teacherSubjects };
        break;

      case "class":
        const classGrades = await prisma.grade.findMany({
          select: {
            id: true,
            level: true,
          },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
          },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: {
            id: true,
            level: true,
          },
        });
        const studentClasses = await prisma.class.findMany({
          include: {
            _count: { select: { students: true } },
          },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;

      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { lessons: assignmentLessons };
        break;

      case "result":
        const resultExams = await prisma.exam.findMany({
          where: {
            ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
          },
          select: {
            id: true,
            title: true,
          },
        });

        const resultAssignments = await prisma.assignment.findMany({
          where: {
            ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
          },
          select: {
            id: true,
            title: true,
          },
        });

        // Get all students
        const resultStudents = await prisma.student.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
          },
        });

        // Pass them into relatedData
        relatedData = {
          exams: resultExams,
          assignments: resultAssignments,
          students: resultStudents,
        };
        break;

      case "event":
        const eventClass = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { class: eventClass };
        break;

      case "announcement":
        const announcementClass = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { class: announcementClass };
        break;
      case "lesson":
        const lessonClass = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        const lessonSubject = await prisma.subject.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        const lessonTeacher = await prisma.teacher.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
          },
        });
        relatedData = {
          class: lessonClass,
          subjects: lessonSubject,
          teachers: lessonTeacher,
        };
        break;
      case "parent":
        const parentStudents = await prisma.student.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
            classId: true,
          },
        });

        relatedData = {
          students: parentStudents,
        };
        break;

      default:
        break;
    }
  }
  return (
    <div>
      <FormModel
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
