const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
   
    hide_noti_mobile: {
      type: String,
      default:"off"
    },
    show_on_top: {
      type: String,
      default:"off"
    },
   position_noti:{
    type:String,
    default:"off"
   },
 
  
noti_theme :{
  type:String,
  default:"off"
},
delay_first_noti:{
  type:String
},
display_each_noti:{
  type:String
},
space_each_noti:{
  type:String
},
 
 
    
  },
 
 
  { timestamps: true }
);

module.exports = mongoose.model("uproofNotification", thisSchema);
