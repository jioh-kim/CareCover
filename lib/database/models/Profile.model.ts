import { Document, Schema, model, models } from "mongoose";

export interface IProfile extends Document {
  _id: string;
  bio: string;
  licenseNumber: string;
  yearOfExp: string;
  occupation: { _id: string; name: string };
  profileOwner: { _id: string, firstName: string, lastName: string }
}

const ProfileSchema = new Schema({
  bio: { type: String },
  licenseNumber: { type: String },
  yearOfExp: { type: String },
  occupation: { type: Schema.Types.ObjectId, ref: "Occupation" },
  profileOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;
