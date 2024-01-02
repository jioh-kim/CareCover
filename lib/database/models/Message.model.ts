import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = models.Message || model("Message", MessageSchema);
export default Message;
