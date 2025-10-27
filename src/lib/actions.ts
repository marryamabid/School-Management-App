"use server";
import crypto from "crypto";
import {
  AnnouncementSchema,
  AssignmentSchema,
  ClassSchema,
  EventSchema,
  ExamSchema,
  LessonSchema,
  ParentSchema,
  ResultSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { userAgent } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { parse } from "path";

type CurrentState = { success: boolean; error: boolean };
export const createSubject = async (
  currentState: CurrentState,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const teachers = formData.getAll("teachers") as string[];

  try {
    await prisma.subject.create({
      data: {
        name,
        teachers: {
          connect: teachers.map((id) => ({ id })),
        },
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating subject:", error);
    return { success: false, error: true };
  }
};
//update subject
export const updateSubject = async (
  currentState: CurrentState,
  formData: FormData
) => {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;

  // ✅ Teacher IDs are strings (since Prisma schema uses String @id)
  const teachers = formData.getAll("teachers").map((id) => id.toString());

  try {
    await prisma.subject.update({
      where: { id },
      data: {
        name,
        teachers: {
          set: teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

//delete subject
export const deleteSubject = async (
  cuurentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

//class actions
export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    const existing = await prisma.class.findUnique({
      where: { name: data.name },
    });
    if (existing) {
      return {
        success: false,
        error: true,
        message: "Class name already exists!",
      };
    }

    await prisma.class.create({ data });
    return { success: true, error: false };
  } catch (err) {
    console.error("Create error:", err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    if (!data.id) throw new Error("Missing class ID");

    await prisma.class.update({
      where: { id: Number(data.id) },
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Update error:", err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = Number(data.get("id"));

  try {
    // Step 1: Delete all related records first (to avoid FK constraint)
    await prisma.student.deleteMany({ where: { classId: id } });
    await prisma.lesson.deleteMany({ where: { classId: id } });
    await prisma.event.deleteMany({ where: { classId: id } });
    await prisma.announcement.deleteMany({ where: { classId: id } });

    // Step 2: Delete the class itself
    await prisma.class.delete({ where: { id } });
    console.log("🆔 Deleting class with ID:", id);
    return { success: true, error: false };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false, error: true };
  }
};

//teacher actions

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    // Check for existing teacher
    const existing = await prisma.teacher.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      return {
        success: false,
        error: true,
        message: "Teacher already exists!",
      };
    }

    // Create user in Clerk

    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });
    console.log(typeof clerkClient);

    // Create teacher in DB
    await prisma.teacher.create({
      data: {
        id: user.id, // Clerk user ID
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        address: data.address,
        img: data.image,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return {
      success: true,
      error: false,
      message: "Teacher created successfully!",
    };
  } catch (err) {
    console.error("Create error:", err);
    return { success: false, error: true, message: "Error creating teacher" };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    if (!data.id) return { success: false, error: true };
    const user = await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });
    console.log(typeof clerkClient);

    // Create teacher in DB
    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }), // Only update if password is not empty
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        address: data.address,
        img: data.image,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Update error:", err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    await clerkClient.users.deleteUser(id);
    await prisma.teacher.delete({ where: { id: id } });
    console.log("🆔 Deleting class with ID:", id);
    return { success: true, error: false };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false, error: true };
  }
};

// student actions
export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    // Check for existing student

    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true, message: "Error creating student" };
    }
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });
    console.log(typeof clerkClient);

    // Create student in DB
    await prisma.student.create({
      data: {
        id: user.id, // Clerk user ID
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        address: data.address,
        img: data.image,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    return {
      success: true,
      error: false,
      message: "Student created successfully!",
    };
  } catch (err) {
    console.error("Create error:", err);
    return { success: false, error: true, message: "Error creating student" };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    if (!data.id) return { success: false, error: true };
    const user = await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });
    console.log(typeof clerkClient);

    // Create teacher in DB
    await prisma.student.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }), // Only update if password is not empty
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        address: data.address,
        img: data.image,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Update error:", err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  console.log("🆔 Deleting student with ID:", id);

  if (!id) return { success: false, error: true };

  try {
    // Try deleting from Clerk first
    try {
      await clerkClient.users.deleteUser(id);
      console.log("🧾 Clerk user deleted");
    } catch (clerkErr: any) {
      if (clerkErr?.errors?.[0]?.code === "resource_not_found") {
        console.warn("⚠️ Clerk user not found, deleting from Prisma anyway");
      } else {
        throw clerkErr;
      }
    }

    // Delete from Prisma (always)
    await prisma.student.delete({ where: { id } });
    console.log("✅ Student deleted successfully");

    return { success: true, error: false };
  } catch (err) {
    console.error("❌ Delete error:", err);
    return { success: false, error: true };
  }
};

//exam actions
export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { teacherId: userId!, id: data.lessonId },
      });
      if (!teacherLesson) {
        return { success: false, error: true, message: "Error creating exam" };
      }
    }
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    return {
      success: true,
      error: false,
      message: "Student created successfully!",
    };
  } catch (err) {
    console.error("Create error:", err);
    return { success: false, error: true, message: "Error creating student" };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { teacherId: userId!, id: data.lessonId },
      });
      if (!teacherLesson) {
        return { success: false, error: true, message: "Error creating exam" };
      }
    }
    // Create student in DB
    await prisma.exam.update({
      where: { id: data.id! },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error("Update error:", err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  console.log("🆔 Deleting exam with ID:", id);

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // If teacher: ensure they only delete their own exam
    if (role === "teacher") {
      const exam = await prisma.exam.findUnique({
        where: { id: Number(id) },
        include: { lesson: true },
      });

      if (!exam) {
        throw new Error("Exam not found");
      }

      if (exam.lesson.teacherId !== userId) {
        throw new Error("Unauthorized: You can only delete your own exam");
      }
    }

    // Delete exam
    await prisma.exam.delete({
      where: { id: Number(id) },
    });

    console.log("✅ Exam deleted successfully");
    return { success: true, error: false };
  } catch (err) {
    console.error("❌ Delete error:", err);
    return { success: false, error: true };
  }
};

//assignment actions
export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { teacherId: userId!, id: data.lessonId },
      });
      if (!teacherLesson) {
        return { success: false, error: true, message: "Error creating exam" };
      }
    }
    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    return {
      success: true,
      error: false,
      message: "Student created successfully!",
    };
  } catch (err) {
    console.error("Create error:", err);
    return { success: false, error: true, message: "Error creating student" };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { teacherId: userId!, id: data.lessonId },
      });
      if (!teacherLesson) {
        return { success: false, error: true, message: "Error updating exam" };
      }
    }
    // Create student in DB
    await prisma.assignment.update({
      where: { id: data.id! },
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error("Update error:", err);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  console.log("🆔 Deleting exam with ID:", id);

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // If teacher: ensure they only delete their own exam
    if (role === "teacher") {
      const assignment = await prisma.assignment.findUnique({
        where: { id: Number(id) },
        include: { lesson: true },
      });

      if (!assignment) {
        throw new Error("Exam not found");
      }

      if (assignment.lesson.teacherId !== userId) {
        throw new Error("Unauthorized: You can only delete your own exam");
      }
    }

    // Delete exam
    await prisma.assignment.delete({
      where: { id: Number(id) },
    });

    console.log("✅ Exam deleted successfully");
    return { success: true, error: false };
  } catch (err) {
    console.error("❌ Delete error:", err);
    return { success: false, error: true };
  }
};

//result actions
export const createResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role === "teacher") {
      if (data.examId) {
        const exam = await prisma.exam.findFirst({
          where: { id: data.examId, lesson: { teacherId: userId! } },
        });
        if (!exam) {
          return {
            success: false,
            error: true,
            message: "Unauthorized exam access",
          };
        }
      }

      if (data.assignmentId) {
        const assignment = await prisma.assignment.findFirst({
          where: { id: data.assignmentId, lesson: { teacherId: userId! } },
        });
        if (!assignment) {
          return {
            success: false,
            error: true,
            message: "Unauthorized assignment access",
          };
        }
      }
    }

    await prisma.result.create({
      data: {
        score: data.score,
        examId: data.examId || null,
        assignmentId: data.assignmentId || null,
        studentId: data.studentId,
      },
    });

    return {
      success: true,
      error: false,
      message: "Result created successfully!",
    };
  } catch (err) {
    console.error(" Create Result Error:", err);
    return { success: false, error: true, message: "Error creating result" };
  }
};

export const updateResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role === "teacher") {
      if (data.examId) {
        const exam = await prisma.exam.findFirst({
          where: { id: data.examId, lesson: { teacherId: userId! } },
        });
        if (!exam) {
          return {
            success: false,
            error: true,
            message: "Unauthorized exam access",
          };
        }
      }

      if (data.assignmentId) {
        const assignment = await prisma.assignment.findFirst({
          where: { id: data.assignmentId, lesson: { teacherId: userId! } },
        });
        if (!assignment) {
          return {
            success: false,
            error: true,
            message: "Unauthorized assignment access",
          };
        }
      }
    }

    await prisma.result.update({
      where: { id: data.id! },
      data: {
        score: data.score,
        examId: data.examId || null,
        assignmentId: data.assignmentId || null,
        studentId: data.studentId,
      },
    });

    return {
      success: true,
      error: false,
      message: "Result updated successfully!",
    };
  } catch (err) {
    console.error(" Update Result Error:", err);
    return { success: false, error: true, message: "Error updating result" };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = Number(data.get("id"));

  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role === "teacher") {
      const result = await prisma.result.findUnique({
        where: { id },
        include: {
          exam: { include: { lesson: true } },
          assignment: { include: { lesson: true } },
        },
      });

      if (!result) throw new Error("Result not found");

      const isOwnedByTeacher =
        (result.exam && result.exam.lesson.teacherId === userId) ||
        (result.assignment && result.assignment.lesson.teacherId === userId);

      if (!isOwnedByTeacher) {
        throw new Error("Unauthorized: You can only delete your own result");
      }
    }

    await prisma.result.delete({ where: { id } });

    return {
      success: true,
      error: false,
      message: "Result deleted successfully!",
    };
  } catch (err) {
    console.error(" Delete Result Error:", err);
    return { success: false, error: true, message: "Error deleting result" };
  }
};
//events action

export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      return {
        success: false,
        error: true,
        message: "Unauthorized: Only admin can create events.",
      };
    }

    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId || null,
      },
    });

    // revalidatePath("/list/events");
    return {
      success: true,
      error: false,
      message: "Event created successfully!",
    };
  } catch (err) {
    console.error(" Create Event Error:", err);
    return { success: false, error: true, message: "Error creating event." };
  }
};

// ✅ UPDATE EVENT (Admin only)
export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      return {
        success: false,
        error: true,
        message: "Unauthorized: Only admin can update events.",
      };
    }

    await prisma.event.update({
      where: { id: data.id! },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId || null,
      },
    });

    // revalidatePath("/list/events");
    return {
      success: true,
      error: false,
      message: "Event updated successfully!",
    };
  } catch (err) {
    console.error(" Update Event Error:", err);
    return { success: false, error: true, message: "Error updating event." };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  console.log(" Deleting Event with ID:", id);

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  if (role !== "admin") {
    return {
      success: false,
      error: true,
      message: "Unauthorized: Only admin can delete events.",
    };
  }

  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });

    // revalidatePath("/list/events");
    console.log(" Event deleted successfully");
    return {
      success: true,
      error: false,
      message: "Event deleted successfully!",
    };
  } catch (err) {
    console.error("Delete Event Error:", err);
    return { success: false, error: true, message: "Error deleting event." };
  }
};

//announcemnt actions

export const createAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      return {
        success: false,
        error: true,
        message: "Unauthorized: Only admin can create announcements.",
      };
    }

    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    // revalidatePath("/list/announcements");
    return {
      success: true,
      error: false,
      message: "Announcement created successfully!",
    };
  } catch (err) {
    console.error("Create Announcement Error:", err);
    return {
      success: false,
      error: true,
      message: "Error creating announcement.",
    };
  }
};

export const updateAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      return {
        success: false,
        error: true,
        message: "Unauthorized: Only admin can update announcements.",
      };
    }

    await prisma.announcement.update({
      where: { id: data.id! },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    // revalidatePath("/list/announcements");
    return {
      success: true,
      error: false,
      message: "Announcement updated successfully!",
    };
  } catch (err) {
    console.error("Update Announcement Error:", err);
    return {
      success: false,
      error: true,
      message: "Error updating announcement.",
    };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  console.log("Deleting Announcement with ID:", id);

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  if (role !== "admin") {
    return {
      success: false,
      error: true,
      message: "Unauthorized: Only admin can delete announcements.",
    };
  }

  try {
    await prisma.announcement.delete({
      where: { id: Number(id) },
    });

    // revalidatePath("/list/announcements");
    console.log("Announcement deleted successfully");
    return {
      success: true,
      error: false,
      message: "Announcement deleted successfully!",
    };
  } catch (err) {
    console.error("Delete Announcement Error:", err);
    return {
      success: false,
      error: true,
      message: "Error deleting announcement.",
    };
  }
};
//lesosn actions
export const createLesson = async (
  currentState: CurrentState,
  data: LessonSchema
) => {
  try {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      return {
        success: false,
        error: true,
        message: "Unauthorized: Only admin can create lessons.",
      };
    }

    await prisma.lesson.create({
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    // revalidatePath("/list/lessons");
    return {
      success: true,
      error: false,
      message: "Lesson created successfully!",
    };
  } catch (err) {
    console.error("Create Lesson Error:", err);
    return {
      success: false,
      error: true,
      message: "Error creating lesson.",
    };
  }
};

export const updateLesson = async (
  currentState: CurrentState,
  data: LessonSchema
) => {
  try {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== "admin") {
      return {
        success: false,
        error: true,
        message: "Unauthorized: Only admin can update lessons.",
      };
    }

    await prisma.lesson.update({
      where: { id: data.id! },
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    // revalidatePath("/list/lessons");
    return {
      success: true,
      error: false,
      message: "Lesson updated successfully!",
    };
  } catch (err) {
    console.error("Update Lesson Error:", err);
    return {
      success: false,
      error: true,
      message: "Error updating lesson.",
    };
  }
};

export const deleteLesson = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  console.log("Deleting Lesson with ID:", id);

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  if (role !== "admin") {
    return {
      success: false,
      error: true,
      message: "Unauthorized: Only admin can delete lessons.",
    };
  }

  try {
    await prisma.lesson.delete({
      where: { id: Number(id) },
    });

    // revalidatePath("/list/lessons");
    console.log("Lesson deleted successfully");
    return {
      success: true,
      error: false,
      message: "Lesson deleted successfully!",
    };
  } catch (err) {
    console.error("Delete Lesson Error:", err);
    return {
      success: false,
      error: true,
      message: "Error deleting lesson.",
    };
  }
};
//parent actions
export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema
): Promise<CurrentState> => {
  try {
    await prisma.parent.create({
      data: {
        id: crypto.randomUUID(), // generate a unique string ID (since id is String in model)
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
        // Optionally connect students
        students: {
          connect: data.studentIds?.map((id) => ({ id: String(id) })) || [],
        },
      },
    });

    // revalidatePath("/dashboard/parents");
    return { success: true, error: false };
  } catch (error) {
    console.error(" Error creating parent:", error);
    return { success: false, error: true };
  }
};

export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema
): Promise<CurrentState> => {
  try {
    console.log("Creating parent with data:", data);
    await prisma.parent.update({
      where: { id: data.id },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
        students: data.studentIds
          ? {
              set: data.studentIds.map((id) => ({
                id: String(id),
              })),
            }
          : undefined,
      },
    });

    // revalidatePath("/dashboard/parents");
    return { success: true, error: false };
  } catch (error) {
    console.error(" Error updating parent:", error);
    return { success: false, error: true };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  formData: FormData
): Promise<CurrentState> => {
  const id = formData.get("id") as string;

  try {
    await prisma.parent.delete({
      where: { id },
    });

    // revalidatePath("/dashboard/parents");
    return { success: true, error: false };
  } catch (error) {
    console.error(" Error deleting parent:", error);
    return { success: false, error: true };
  }
};
