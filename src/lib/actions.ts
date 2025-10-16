"use server";
import { success } from "zod";
import {
  ClassSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { userAgent } from "next/server";

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
    // const existing = await prisma.student.findUnique({
    //   where: { username: data.username },
    // });

    // if (existing) {
    //   return {
    //     success: false,
    //     error: true,
    //     message: "Teacher already exists!",
    //   };
    // }

    // Create user in Clerk

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

  try {
    await prisma.student.delete({ where: { id: id } });
    console.log("🆔 Deleting class with ID:", id);
    return { success: true, error: false };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false, error: true };
  }
};
