"use server";

import { revalidatePath } from "next/cache";

import { CreateJobParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/User.model";
import Job from "../database/models/Job.model";
import { handleError } from "../utils";
import Occupation from "../database/models/Occupation.model";
import Location from "../database/models/Location.model";

const populateJob = (query: any) => {
  return query
    .populate({ path: "postedBy", model: User, select: "_id firstName lastName"})
    .populate({ path: "location", model: Location, select: "_id name" })
    .populate({ path: "occupation", model: Occupation, select: "_id name" });
};

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

// GET ONE JOB BY ID
export async function getJobById(jobId: string) {
  try {
    await connectToDatabase()

    const job = await populateJob(Job.findById(jobId));

    if (!job) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(job));
  } catch (error) {
    handleError(error)
  }
}