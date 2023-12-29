import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  location: { _id: string; name: string };
  occupation: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  url: { type: String },
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  Occupation: { type: Schema.Types.ObjectId, ref: "Occupation" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
