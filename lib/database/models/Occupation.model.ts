import { Document, Schema, model, models } from "mongoose";

export interface IOccupation extends Document {
  _id: string;
  name: string;
}

const OccupationSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Occupation = models.Occupation || model("Occupation", OccupationSchema);

export default Occupation;
