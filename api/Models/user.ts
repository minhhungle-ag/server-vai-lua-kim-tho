import { model, Schema } from "mongoose";

export default model(
  "Users",
  new Schema({
    fullName: {
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

    role: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
      default: true,
    },

    avatar: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },

    dateOfBirth: {
      type: Date,
      default: Date.now,
    },

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
