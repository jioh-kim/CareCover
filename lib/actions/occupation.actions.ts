"use server";

import { CreateOccupationParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Occupation from "../database/models/Occupation.model";

export const createOccupation = async ({ occupationName }: CreateOccupationParams) => {
  try {
    await connectToDatabase();

    const newOccupation = await Occupation.create({ name: occupationName });

    return JSON.parse(JSON.stringify(newOccupation));
  } catch (error) {
    handleError(error);
  }
};

export const getAllOccupations = async () => {
  try {
    await connectToDatabase();

    const occupations = await Occupation.find();

    return JSON.parse(JSON.stringify(occupations));
  } catch (error) {
    handleError(error);
  }
};
