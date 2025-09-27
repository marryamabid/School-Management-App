"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
const schema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must have at least 8 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.string().min(1, { message: "Birthdate is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  image: z.instanceof(File, { message: "Image is required" }),
  bloodType: z.string().min(1, { message: "Blood type is required" }),
});
const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form action="" onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Create a new Teacher</h1>
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
          name="firstName"
          error={errors.firstName}
          defaultValue={data?.firstName}
        />
        <InputField
          type="lastName"
          label="Last Name"
          register={register}
          name="lastName"
          error={errors.lastName}
          defaultValue={data?.lastName}
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
          name="dateOfBirth"
          error={errors.birthday}
          defaultValue={data?.dateOfBirth}
        />
      </div>
      <div className="flex flex-col justify-between md:flex-row ">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 text-sm rounded-md p-2 w-full"
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            htmlFor="img"
            className="text-xs text-gray-500 items-center flex gap-2 cursor-pointer"
          >
            <Image src="/upload.png" alt="" height={18} width={18} />
            <span>Upload a Photo</span>
          </label>
          <input
            id="img"
            type="file"
            {...register("image")}
            className="hidden"
          />
          {errors.image?.message && (
            <p className="text-xs text-red-400">
              {errors.image.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-600 text-white p-4 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
