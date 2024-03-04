import {  z, ZodType } from "zod";
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
};

export type FormFieldProps = {
  type?: string;
  placeholder?: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  // category: string,
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export const UserSchema: ZodType<FormData> = z.object({
  title: z.string().min(3).max(50), // Minimum and maximum string length for title
  description: z.string({required_error:"Required field"}).min(10).max(1000), // Minimum and maximum string length for description
  amount: z
    .number({required_error: "please enter amount",invalid_type_error:"Required field"})
    .min(10, { message: "Amount must be greater than or equal to 10" }) // Ensure amount is greater than or equal to 0
    .max(1000000, { message: "Amount must be less than or equal to 1,000,000" }), // Ensure amount is less than or equal to 1,000,000
  date:  z.coerce.date().max(new Date(), { message: "Enter Valid Date" }), 
  category: z.string({required_error:"category require"}).min(3,{message:"please Select value."}).max(50), // Minimum and maximum string length for category
});

export type ValidFieldNames = "title" | "description" | "amount" | "date" | "category";
