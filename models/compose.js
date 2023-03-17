const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {

  
    media_img: {
      type: Array,
    },
    // uploaded_img: {
    //     type: mongoose.Schema.Types.ObjectId, ref: "media"
    //   },
      url:{
        type:String
      },
      desc:{
        type:String
      },
      date :{
        type:String
      },
      time:{
        type:String
      },
      // label:{
      //   type: mongoose.Schema.Types.ObjectId, ref: "label"
      // },
      platform:[{
        type: String
    }],
    minutes:{
      type:String
    },
    hours:{
      type:String
    },
    dayOfMonth:{
      type:String
    },
    month:{
      type:String
    },
    dayOfWeek:{
      type:String
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("compose", thisSchema);
