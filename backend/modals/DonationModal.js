import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  amount: {
    type: Number,
  },
  purpose: {
    type: String,
  },

  orderId: {
    type: String,
    default: null,
  },

  paymentId: {
    type: String,
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },

  tvChannel: {
    type: String,
    default: null,
  },
  adCount: {
    type: Number,
    default: null,
  },
});

export default mongoose.model("donation", schema);
