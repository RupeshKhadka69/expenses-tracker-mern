import { FormFieldProps } from "./types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="mt-2 text-sm text-red-600">{error.message}</span>}
  </>
);
export default FormField;