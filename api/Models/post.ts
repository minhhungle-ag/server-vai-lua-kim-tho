import { model, Schema } from "mongoose";

export default model(
  "Posts",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    status: {
      type: Boolean,
      required: true,
      default: true,
    },

    image: String,
    shortDescription: String,
    description: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);
