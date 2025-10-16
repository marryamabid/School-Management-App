"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema) as any,
  });

  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((data) => {
    // ✅ Convert JS object to FormData for server action
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.id) formData.append("id", String(data.id));
    if (Array.isArray(data.teachers)) {
      data.teachers.forEach((id) => formData.append("teachers", id));
    }
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);
  const { teachers = [] } = relatedData || {};
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update a subject"}
      </h1>

      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          type="text"
          label="Subject Name"
          defaultValue={data?.name}
          register={register}
          name="name"
          error={errors.name}
        />
        {data && (
          <InputField
            type="text"
            label="Id"
            defaultValue={data?.id}
            register={register}
            name="id"
            error={errors.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            {...register("teachers")}
            multiple
            className="ring-[1.5px] ring-gray-300 text-sm rounded-md p-2 w-full"
            defaultValue={data?.teachers?.map((t: any) => t.id)} // ✅ Fix
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button className="bg-blue-600 text-white p-4 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
