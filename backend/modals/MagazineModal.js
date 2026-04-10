import { Schema, model } from "mongoose";

const schema = Schema(
  {
    pdf: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    subTitle: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const MagazineModal = model("magazine", schema);
export default MagazineModal;
