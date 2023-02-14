const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  
    media_img: {
      type: Array,
    },
   
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("media", thisSchema);
