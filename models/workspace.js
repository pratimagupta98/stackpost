const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
   
    workspacename: {
      type: String,
    },
    timezone: {
      type: String,
    },
   
    
  },
 
 
  { timestamps: true }
);

module.exports = mongoose.model("workspace", thisSchema);
