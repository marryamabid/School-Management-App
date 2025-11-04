import { Day } from "@prisma/client";
import z from "zod";
import { id } from "zod/locales";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), //teachers ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

//class schema
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.coerce.string().optional(),
  username: z
    .string()
    .min(8, { message: "Username must have at least 8 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  image: z.string().optional(),
  birthday: z.coerce.date().min(1, { message: "Birthdate is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  bloodType: z.string().min(1, { message: "Blood type is required" }),
  subjects: z.array(z.string()).optional(), //subject ids
});
export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.coerce.string().optional(),
  username: z
    .string()
    .min(2, { message: "Username must have at least 8 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  image: z.string().optional(),
  birthday: z.coerce.date({ message: "Birthdate is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  bloodType: z.string().min(1, { message: "Blood type is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.coerce.string().min(1, { message: "Parent Id is required!" }),
});
export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start Time is required!" }),
  endTime: z.coerce.date({ message: "End Time is required!" }),
  lessonId: z.coerce.number({ message: "lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startDate: z.coerce.date({ message: "Start Date is required!" }),
  dueDate: z.coerce.date({ message: "Due Date is required!" }),
  lessonId: z.coerce.number({ message: "lesson is required!" }),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const resultSchema = z.object({
  id: z.coerce.number().optional(),
  score: z.coerce.number().min(1, { message: "Score is required!" }),
  examId: z.coerce.number().optional(), // optional, since a result can belong to an exam OR assignment
  assignmentId: z.coerce.number().optional(), // optional too
  studentId: z.coerce.string({ message: "Student is required!" }),
});

export type ResultSchema = z.infer<typeof resultSchema>;

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  classId: z.coerce.number().optional(), // optional for nullable relation
});

export type EventSchema = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  date: z.coerce.date({ message: "Date is required!" }),
  classId: z.coerce.number().optional(), // optional because relation is nullable
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Lesson name is required!" }),
  day: z.nativeEnum(Day, { message: "Day is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  subjectId: z.coerce.number({ message: "Subject is required!" }),
  classId: z.coerce.number({ message: "Class is required!" }),
  teacherId: z.string({ message: "Teacher is required!" }),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" }),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Surname is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("").transform(() => undefined)), // allows optional email
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  studentIds: z.array(z.string()), // for selecting multiple students
});

export type ParentSchema = z.infer<typeof parentSchema>;

export const contactSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(2, { message: "Name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  message: z
    .string()
    .min(5, { message: "Message should be at least 5 characters long!" }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
