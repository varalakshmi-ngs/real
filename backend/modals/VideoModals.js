import mongoose from "mongoose";

const schema = new mongoose.Schema({
  youtubeLink: {
    type: String,
    required: true,
  },

  speakerName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  subText: {
    type: String,
    required: true,
  },

  thumbnailImage: {
    type: String,
    required: true,
  },

  page: {
    type: mongoose.Types.ObjectId,
    ref: "homePage",
  },
});

export default mongoose.model("youtubevideo", schema);
