import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  description: {
    type: String,
  },

  image: {
    type: String,
  },
});

export default mongoose.model("teammember", schema);
