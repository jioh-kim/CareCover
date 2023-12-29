"use server";

import { CreateLocationParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Location from "../database/models/Location.model";

export const createLocation = async ({ locationName }: CreateLocationParams) => {
  try {
    await connectToDatabase();

    const newLocation = await Location.create({ name: locationName });

    return JSON.parse(JSON.stringify(newLocation));
  } catch (error) {
    handleError(error);
  }
};

export const getAllLocations = async () => {
  try {
    await connectToDatabase();

    const locations = await Location.find();

    return JSON.parse(JSON.stringify(locations));
  } catch (error) {
    handleError(error);
  }
};
