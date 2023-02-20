const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  
    campaign_name: {
      type: String,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId, ref: "creategoal"
    },
    password: {
      type: String,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaign", thisSchema);
