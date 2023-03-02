const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  
    date: {
      type: String,
    },
    title:{
      type: String,
    },
    type: {
      type: String,
    },
    desc: {
      type: String,
    },
jrnl_img:{
    type:Array
}
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("myjournal", thisSchema);
