import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
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
  },
});

export const Paper = mongoose.model("Paper", paperSchema);
