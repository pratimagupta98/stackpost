const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
   
    name: {
      type: String,
    },
    facebookID: {
      type: String,
    },
    accessToken: {
      type: String,
    },
   
     id:{
      type: String,
     },
     email:{
      type: String,
     }
    
  },
 
 
  { timestamps: true }
);

module.exports = mongoose.model("User", thisSchema);
