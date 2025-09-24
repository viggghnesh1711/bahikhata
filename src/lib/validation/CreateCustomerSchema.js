import { z } from "zod";

export const CreateCustomerSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name too long"),

  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .max(15, "Phone number too long"),

  email: z.string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  totalAmount: z.coerce.number()
    .min(0, "Total amount must be at least 0"),

  amountPaid: z.coerce.number()
    .min(0, "Amount paid must be at least 0"),

        dueDate: z.string()
        .min(1, "Due date is required")
        .refine((date) => {
            const selected = new Date(date);
            const today = new Date();
            today.setHours(0,0,0,0);
            return selected >= today;
        }, { message: "Due date cannot be in the past" }),

        description: z.string()
        .min(1, "Description is required")
        .max(500, "Description too long"),

}).refine((data) => data.amountPaid <= data.totalAmount, {
  message: "Amount paid cannot be greater than total amount",
  path: ["amountPaid"], // error will show under amountPaid
});
