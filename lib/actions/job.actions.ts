"use server";

import { revalidatePath } from "next/cache";
import {
  CreateJobParams,
  DeleteJobParams,
  GetAllJobsParams,
  GetJobsByUserParams,
  GetRelatedJobsByLocationParams,
  UpdateJobParams,
} from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/User.model";
import Job from "../database/models/Job.model";
import { handleError } from "../utils";
import Occupation from "../database/models/Occupation.model";
import Location from "../database/models/Location.model";

const getLocationByName = async (name: string) => {
  return Location.findOne({ name: { $regex: name, $options: "i" } });
};

const getOccupationByName = async (name: string) => {
  return Occupation.findOne({ name: { $regex: name, $options: "i" } });
};

const populateJob = (query: any) => {
  return query
    .populate({
      path: "postedBy",
      model: User,
      select: "_id firstName lastName",
    })
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
    await connectToDatabase();

    const job = await populateJob(Job.findById(jobId));

    if (!job) throw new Error("Job not found");

    return JSON.parse(JSON.stringify(job));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateJob({ userId, job, path }: UpdateJobParams) {
  try {
    await connectToDatabase();

    const jobToUpdate = await Job.findById(job._id);
    if (!jobToUpdate || jobToUpdate.postedBy.toHexString() !== userId) {
      throw new Error("Unauthorized or job not found");
    }

    const updatedJob = await Job.findByIdAndUpdate(
      job._id,
      { ...job, location: job.locationId, occupation: job.occupationId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedJob));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteJob({ jobId, path }: DeleteJobParams) {
  try {
    await connectToDatabase();

    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (deletedJob) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL JOBS
export async function getAllJobs({
  query,
  limit = 6,
  page,
  location,
  occupation,
}: GetAllJobsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const locationCondition = location
      ? await getLocationByName(location)
      : null;
    const occupationCondition = occupation
      ? await getOccupationByName(occupation)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        locationCondition ? { location: locationCondition._id } : {},
        occupationCondition ? { occupation: occupationCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const jobsQuery = Job.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const jobs = await populateJob(jobsQuery);
    const jobsCount = await Job.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(jobs)),
      totalPages: Math.ceil(jobsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET JOBS BY POSTEDBY
export async function getJobsByUser({
  userId,
  limit = 6,
  page,
}: GetJobsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { postedBy: userId };
    const skipAmount = (page - 1) * limit;

    const jobsQuery = Job.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const jobs = await populateJob(jobsQuery);
    const jobsCount = await Job.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(jobs)),
      totalPages: Math.ceil(jobsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED JOBS: JOBS WITH SAME LOCATION
export async function getRelatedJobsByLocation({
  locationId,
  jobId,
  limit = 3,
  page = 1,
}: GetRelatedJobsByLocationParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ location: locationId }, { _id: { $ne: jobId } }],
    };

    const jobsQuery = Job.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const jobs = await populateJob(jobsQuery);
    const jobsCount = await Job.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(jobs)),
      totalPages: Math.ceil(jobsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
