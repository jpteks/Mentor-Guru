import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true, 
    },
    paper: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);


export const Paper = mongoose.models.Paper || mongoose.model("Paper", paperSchema);
