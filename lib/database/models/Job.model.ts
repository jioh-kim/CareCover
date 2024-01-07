import { Document, Schema, model, models } from "mongoose";

export interface IJob extends Document {
  _id: string;
  title: string;
  description?: string;
  requirements: string;
  createdAt: Date;
  startDateTime: Date;
  endDateTime: Date;
  applicationDeadline: Date;
  minPay: string;
  maxPay: string;
  location: { _id: string; name: string };
  occupation: { _id: string; name: string };
  postedBy: { _id: string; firstName: string; lastName: string };
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  requirements: { type: String },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  occupation: { type: Schema.Types.ObjectId, ref: "Occupation" },
  applicationDeadline: { type: Date, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  minPay: { type: String },
  maxPay: { type: String },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
