import { Document, Schema, model, models } from "mongoose";

export interface ILocation extends Document {
  _id: string;
  name: string;
}

const LocationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 }, // Count of job postings associated with this location
});

const Location = models.Location || model("Location", LocationSchema);

export default Location;
