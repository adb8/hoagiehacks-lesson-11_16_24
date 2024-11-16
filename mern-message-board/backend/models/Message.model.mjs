import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

export const Message = model.Message || model("Message", MessageSchema);