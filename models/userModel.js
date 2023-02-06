const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
   
    first_name: {
      type: String,
    },
    email: {
      type: String,
    },
    // mobile: {
    //   type: Number,
    // },
    last_name: {
      type: String,
    },
     
    
  },
 
 
  { timestamps: true }
);

module.exports = mongoose.model("User", thisSchema);
