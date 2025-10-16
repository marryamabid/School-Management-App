"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { StudentSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { table } from "console";

const StudentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema) as any,
  });
  const [img, setImg] = useState<any>();
  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction({ ...data, image: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects } = relatedData;
  return (
    <form action="" onSubmit={onSubmit} className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">
        {type === "create" ? " Create a new Teacher" : "Update the Teacher"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentiaction Information
      </span>
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          type="text"
          label="Username"
          register={register}
          name="username"
          error={errors.username}
          defaultValue={data?.username}
        />
        <InputField
          type="email"
          label="Email"
          register={register}
          name="email"
          error={errors.email}
          defaultValue={data?.email}
        />
        <InputField
          type="password"
          label="Password"
          register={register}
          name="password"
          error={errors.password}
          defaultValue={data?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          type="firstName"
          label="First Name"
          register={register}
          name="name"
          error={errors.name}
          defaultValue={data?.name}
        />
        <InputField
          type="lastName"
          label="Last Name"
          register={register}
          name="surname"
          error={errors.surname}
          defaultValue={data?.surname}
        />
        <InputField
          type="phone"
          label="Phone"
          register={register}
          name="phone"
          error={errors.phone}
          defaultValue={data?.phone}
        />
        <InputField
          type="address"
          label="Address"
          register={register}
          name="address"
          error={errors.address}
          defaultValue={data?.address}
        />
        <InputField
          type="bloodType"
          label="BloodType"
          register={register}
          name="bloodType"
          error={errors.bloodType}
          defaultValue={data?.bloodType}
        />
        <InputField
          type="date"
          label="Date Of Birth"
          register={register}
          name="birthday"
          error={errors.birthday}
          defaultValue={data?.birthday.toISOString().split("T")[0]}
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
      </div>
      <div className="flex flex-col justify-between md:flex-row ">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 text-sm rounded-md p-2 w-full"
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            {...register("subjects")}
            className="ring-[1.5px] ring-gray-300 text-sm rounded-md p-2 w-full"
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>

        <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-gray-500 items-center flex gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" height={18} width={18} />
                <span>Upload a Photo</span>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-600 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
