import { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema({
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Accepted", "Rejected"],
  },
  appliedOn: { type: Date, default: Date.now },
});

const Application =
  models.Application || model("Application", ApplicationSchema);
export default Application;
