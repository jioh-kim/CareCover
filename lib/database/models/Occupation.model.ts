import { Document, Schema, model, models } from "mongoose";

export interface IOccupation extends Document {
  _id: string;
  name: string;
}

const OccupationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 }, // Count of job postings associated with this occupation
});

const Occupation = models.Occupation || model("Occupation", OccupationSchema);

export default Occupation;
