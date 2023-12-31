"use server";

import { revalidatePath } from "next/cache";

import { CreateJobParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/User.model";
import Job from "../database/models/Job.model";
import { handleError } from "../utils";

// CREATE
export async function createJob({ userId, job, path }: CreateJobParams) {
  try {
    await connectToDatabase();

    const postedBy = await User.findById(userId);
    if (!postedBy) throw new Error("User who posted not found");

    const newJob = await Job.create({
      ...job,
      location: job.locationId,
      occupation: job.occupationId,
      postedBy: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newJob));
  } catch (error) {
    handleError(error);
  }
}
