import { FieldError } from "react-hook-form";

type InputFieldProps = {
  type?: string;
  label: string;
  error?: FieldError;
  register: any;
  name: string;
  defaultValue?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};
const InputField = ({
  type = "text",
  label,
  error,
  register,
  name,
  defaultValue,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 text-sm rounded-md p-2 w-full"
        defaultValue={defaultValue}
        {...inputProps}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error?.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
