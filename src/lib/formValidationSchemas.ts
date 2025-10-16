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
  birthday: z.coerce.date().min(1, { message: "Birthdate is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  bloodType: z.string().min(1, { message: "Blood type is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.coerce.string().min(1, { message: "Parent Id is required!" }),
});
export type StudentSchema = z.infer<typeof studentSchema>;
