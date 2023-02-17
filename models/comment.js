const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  userid:{
    type: mongoose.Schema.Types.ObjectId, ref: "user"
  },
  post:{
    type: mongoose.Schema.Types.ObjectId, ref: "fbpost"
  },
    comment: {
      type: String,
    },
   
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", thisSchema);
