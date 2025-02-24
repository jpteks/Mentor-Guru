import mongoose from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    avatarUrl: {
      type: String,
      required: false,
      default:
        "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYpdmKilBLdOaUJ8ehvYZ7r2Ff0HXCwlEB41gi", // Replace with your default avatar URL
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    isEmailVerified: {
      type: Boolean,
      required: false,
    },
    accountStatus: {
      type: String,
      required: false,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    otp: {
      type: Number,
      required: false,
      default: null,
    },
    otpExpiry: {
      type: Date,
      required: false,
      default: null,
    },
    role: {
      type: String,
      required: true,
      default: UserRole.STUDENT,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
