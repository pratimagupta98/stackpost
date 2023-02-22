const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  
    post: {
      type: String,
    },
    platforms: [{
      type: String,
    }],
    // mediaUrls: {
    //   type: Array,
    // },
    accessToken:{
      type: String,
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("fbpost", thisSchema);
