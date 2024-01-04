"use server";
import { revalidatePath } from "next/cache";
import User from "../database/models/User.model";
import {
  CreateProfileParams,
  GetProfileByUserParams,
  UpdateProfileParams,
} from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Profile from "../database/models/Profile.model";
import Occupation from "../database/models/Occupation.model";

// CREATE USER PROFILE
export async function createProfile({
  profileDetails,
  userId,
  path,
}: CreateProfileParams) {
  try {
    await connectToDatabase();

    const profileOwner = await User.findById(userId);
    if (!profileOwner)
      throw new Error("User whose profile to be updated not found");

    const updatedProfile = await Profile.create({
      ...profileDetails,
      profileOwner: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedProfile));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateProfile({profileDetails, userId, path }: UpdateProfileParams) {
  try {
    await connectToDatabase();

    const profileToUpdate = await Profile.findById(profileDetails._id);
    if (!profileToUpdate || profileToUpdate.profileOwner.toHexString() !== userId) {
      throw new Error("Unauthorized or profile not found");
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileDetails._id,
      {
        ...profileDetails,
        occupation: profileDetails.occupationId,
      },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedProfile));
  } catch (error) {
    handleError(error);
  }
}


const populateProfile = (query: any) => {
  return query
    .populate({
      path: "profileOwner",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "occupation", model: Occupation, select: "_id name" });
};

// GET PROFILE BY USER ID
export async function getProfileByUserId({ userId }: GetProfileByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { profileOwner: userId };
    const profilesQuery = Profile.findOne(conditions);
    const profile = await populateProfile(profilesQuery);

    if (!profile || profile.length === 0) {
      return { data: null };
    }

    return {
      data: JSON.parse(JSON.stringify(profile)),
    };
  } catch (error) {
    handleError(error);
  }
}
