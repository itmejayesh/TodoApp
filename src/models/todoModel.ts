import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: String,
    completed: Boolean,
  },
  { timestamps: true }
);

const Task = mongoose.models.task || mongoose.model("task", todoSchema);

export default Task;
