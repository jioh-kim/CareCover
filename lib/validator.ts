import * as z from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  requirements: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  applicationDeadline: z.date(),
  locationId: z.string(),
  occupationId: z.string(),
  minPay: z.string().min(0, "Minimum pay must be at least 0"),
  maxPay: z.string().min(0, "Maximum pay must be at least 0"),
});
