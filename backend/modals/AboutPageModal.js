import mongoose from "mongoose";

const schema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      default: null,
    },

    subText: {
      type: String,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },
  },

  pastarmessage: {
    pasterName: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },

  teamMembers: {
    type: [mongoose.Types.ObjectId],
    ref: "teammember",
  },
});

export default mongoose.model("aboutpage", schema);
