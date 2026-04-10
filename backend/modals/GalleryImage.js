import mongoose from "mongoose";

const schema = new mongoose.Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: "gallerycategory",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("galleryimage", schema);
