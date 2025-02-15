import mongoose, { Schema } from "mongoose";
 
const userSchema = new Schema({
  user_image: String,
  name: {
    required: true,
    type: String,
  },
  image: String,
  age: Number,
  sex: String,
  job: String,
  education: String,
  interests: String,
  bio: String,
   
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  membership: { 
    type: String,
    default: "free",
  },
}, { timestamps: true });

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);