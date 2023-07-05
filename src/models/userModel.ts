import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

//create a models in data base if already created use that else we create our own model.

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
