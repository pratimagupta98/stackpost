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
   socialplatform:{
    type:String,
    default:false
   },
facebookData:{
  type:String
},
googleData :{
  type:String
},
twitterData:{
  type:String
},
linkedlnData:{
  type:String
},
instaData:{
  type:String
},
youtubeData:{
  type:String
},
tiktokData:{
  type :String
}
    
  },
 
 
  { timestamps: true }
);

module.exports = mongoose.model("workspace", thisSchema);
