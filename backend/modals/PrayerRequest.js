import mongoose from "mongoose";
const { Schema } = mongoose;

const prayerRequestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    forWhom: {
      type: String,
      required: true,
      trim: true,
    },
    prayerType: {
      type: String,
      required: true,
      enum: [
        "Job",
        "Family",
        "Exams",
        "Marriage",
        "Business",
        "Spiritual",
        "Children",
        "Emergency",
        "Health",
        "Finance",
      ],
    },
    language: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // 10-digit mobile number
    },
    message: {
      type: String,
      required: true,
    },
    isPrayer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// prayerRequestSchema.index({
//   name: "text",
//   forWhom: "text",
//   prayerType: "text",
//   language: "text",
//   city: "text",
//   mobile: "text",
//   message: "text",
// });

const PrayerRequest = mongoose.model("PrayerRequest", prayerRequestSchema);
export default PrayerRequest;
