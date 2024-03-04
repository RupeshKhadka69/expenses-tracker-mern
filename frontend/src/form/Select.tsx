import { FormFieldProps } from "./types";

const SelectForm: React.FC<FormFieldProps> = ({

    name,
    register,
    error,
    valueAsNumber,
}) => (
    <>
        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"


            {...register(name, { valueAsNumber })}
        >
            <option value=""  >select option</option>
            <option value="freelancing">Freelancing</option>
            <option value="salary">Salary</option>
            <option value="investments">Investiments</option>
            <option value="stock">Stocks</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bank">Bank Transfer</option>
            <option value="youtube">Youtube</option>
            <option value="other">Other</option>
        </select>

        {error && <span className="mt-2 text-sm text-red-600">{error.message}</span>}
    </>
);
export default SelectForm;