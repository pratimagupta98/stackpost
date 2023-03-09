const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    displayUrl: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("displayUrl", thisSchema);
