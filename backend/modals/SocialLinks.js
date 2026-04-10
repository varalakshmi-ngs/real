import { Schema, model } from "mongoose";

const schema = new Schema({
  facebook: {
    type: String,
    // required: true,
  },

  instagram: {
    type: String,
    // required: true,
  },
  youtube: {
    type: String,
    // required: true,
  },
  twitter: {
    type: String,
    // required: true,
  },
});

const SocialLinksModal = model("sociallinks", schema);

export default SocialLinksModal;
