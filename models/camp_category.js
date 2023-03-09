const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("camp_category", thisSchema);
