import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    eventType: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const EventModal = mongoose.model("Event", eventSchema);
export default EventModal;
