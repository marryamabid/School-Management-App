"use client";
import Image from "next/image";
import React, { useEffect } from "react";
// import TeacherForm from "./forms/TeacherForm";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import {
  deleteClass,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormContainerProps } from "./FormContainer";
import { de } from "zod/locales";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  parent: undefined,
  lesson: undefined,
  exam: undefined,
  assignment: undefined,
  result: undefined,
  attendance: undefined,
  event: undefined,
  announcement: undefined,
};
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModel = ({
  table,
  id,
  data,
  type,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";
  const [open, setOpen] = React.useState(false);
  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table]!, {
      success: false,
      error: false,
    });
    const router = useRouter();
    useEffect(() => {
      if (state.success) {
        toast(`Class has been deleted!`);
        setOpen(false);
        router.refresh();
      }
      console.log("🧩 Delete for table:", table);
      console.log("🧩 Using function:", deleteActionMap[table]?.name);
    }, [state]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="hidden" name="id" value={String(id)} />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table] ? (
        forms[table](setOpen, type, data, relatedData)
      ) : (
        "Form not found!"
      )
    ) : null;
  };

  return (
    <>
      <button
        className={`${size} ${bgColor} flex rounded-full items-center justify-center`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={14} height={14} />
      </button>
      {open && (
        <div className="bg-black/60  h-screen w-screen absolute left-0 top-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModel;
