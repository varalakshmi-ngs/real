import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String }, // store image URL
    location: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

blogSchema.index({ category: "text" });

export default mongoose.model("Blog", blogSchema);
