import mongoose from "mongoose";
const { Schema } = mongoose;

const testimonialSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    isApproved: {
      type: String,
      enum: ["initiall", "approved", "rejected"],
      default: "initiall",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
