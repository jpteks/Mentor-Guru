import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
      unique: true,
    },
    paper: {
      required: true,
      type: String,
    },
    year: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const Paper =
  mongoose.models.Paper || mongoose.model("Paper", paperSchema);
