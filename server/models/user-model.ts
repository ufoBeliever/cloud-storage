import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  country: { type: String },
  avatar: { type: String },
  registrationDate: { type: Date, require: true },
});

export default model("User", UserSchema);
