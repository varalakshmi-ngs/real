import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    day: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    service1: { type: String, required: true },
    service2: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const ServiceModal = mongoose.model("Service", serviceSchema);
export default ServiceModal;
