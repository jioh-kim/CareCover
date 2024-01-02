import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  Occupation: { type: Schema.Types.ObjectId, ref: "Occupation" },
  professionalDetails: {
    bio: { type: String, required: false },
    licenseNumber: { type: String, required: false },
    certifications: [{ type: String, required: false }],
    specialization: { type: String, required: false },
    yearOfExp: { type: Number, required: false },
  },
});

const User = models.User || model("User", UserSchema);

export default User;
