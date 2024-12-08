import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.ObjectId,
  },
  receiverId: { type: mongoose.Schema.ObjectId },
  file: {},
});
