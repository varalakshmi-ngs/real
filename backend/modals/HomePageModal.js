import mongoose from "mongoose";

const joinWeekendSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  subText: {
    type: String,
  },

  buttonText: {
    type: String,
  },

  youtubeLink: {
    type: String,
  },

  date: {
    type: String,
  },

  time: {
    type: String,
  },

  location: {
    type: String,
  },
});

const schema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: null,
      },

      subText: {
        type: String,
        default: null,
      },

      buttonText: {
        type: String,
        default: null,
      },
      buttonLink: {
        type: String,
        default: null,
      },
      image: {
        type: String,
        default: null,
      },
    },

    pasterIntro: {
      pasterName: {
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

    videos: {
      type: [mongoose.Types.ObjectId],
      ref: "youtubevideo",
    },

    joinWeekend: {
      type: [joinWeekendSchema],
    },

    latestMessage: {
      heading: { type: String },
      description: { type: String },
      hostName: {
        type: String,
      },
      title: {
        type: String,
      },

      youtubeLink: { type: String },

      thumbnailImage: { type: String },
    },

    timings: {
      morningService: { type: String, default: null },
      eveningService: { type: String, default: null },
      sundaySchool: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("homePage", schema);
