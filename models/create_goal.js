const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  
    category_goal: {
      type: String,
    },
    goal_name: {
        type: String,
      },
      value:{
        type: Number,
      },
      url:{
        type: String,
      },
    desc:{
        type: String,
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("creategoal", thisSchema);
