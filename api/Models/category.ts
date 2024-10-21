import { Schema, model } from "mongoose";

export default model(
  "Categories",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  })
);
