const Compose = require("../models/compose");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const resp = require("../helpers/apiResponse");
var cron = require('node-cron');
var moment = require('moment');
// var task = cron.schedule('* * * * * *', () =>  {
//       console.log('',moment().format('DD MM YYYY hh:mm:ss'));
//      this.checkifapiexecute();
//     });
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.add_compose = async (req, res) => {
    const { url,desc,date,time ,platform,minutes,hours,dayOfMonth,month,dayOfWeek} = req.body


    const newCompose = new Compose({
        url:url,
      //  uploaded_img:uploaded_img,
        desc:desc,
        // date:date,
        // time:time,
      //  label:label,
        platform:platform,
        minutes:minutes,
        hours:hours,
        dayOfMonth:dayOfMonth,
        month:month,
        dayOfWeek:dayOfWeek
    });
    // if (req.files) {
    //     if (req.files.media_img[0].path) {
    //         alluploads = [];
    //         for (let i = 0; i < req.files.media_img.length; i++) {
    //             const resp = await cloudinary.uploader.upload(
    //                 req.files.media_img[i].path,
    //                 { use_filename: true, unique_filename: false }
    //             );
    //             fs.unlinkSync(req.files.media_img[i].path);
    //             alluploads.push(resp.secure_url);
    //         }
    //         newCompose.media_img = alluploads;
    //  
const job = new cron.CronJob({
  // Set up your cron schedule using template literals to include dynamic date and time values
  cronTime: `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`,
  onTick: function() {
    // This function will be executed when the cron job runs
    console.log('Cron job executed at:', new Date());
  },
  start: true, // Start the cron job when the script runs
  timeZone: 'UTC' // Set the timezone for the cron job
},()=>{
    newCompose.save()
    res.status(200).json({
        status:true,
        data:newCompose
    })
})

// Define your dynamic date and time values
// const minutes = req.body.minutes; // Replace this with your desired minute value
// const hours = req.body.hours; // Replace this with your desired hour value
// const dayOfMonth = req.body.dayOfMonth; // Replace this with your desired day of month value
// const month =  req.body.month // Replace this with your desired month value
// const dayOfWeek = '1-5';

            


                // .then((data) => resp.successr(res, data))
                // .catch((error) => resp.errorr(res, error));
       // }
    }
    // else{
    //     res.status(404).json({
    //         status: false,
            
    //         error: "error",
    //       });
//}



exports.get_compose = async (req, res) => {
    await Compose.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_compose= async (req, res) => {
    await Compose.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_compose = async (req, res) => {
    await Compose.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_media = async (req, res) => {
    const {media_img } = req.body

    data = {}
    

    if (req.files) {
        if (req.files.media_img) {
            alluploads = [];
            for (let i = 0; i < req.files.media_img.length; i++) {
                // console.log(i);
                const resp = await cloudinary.uploader.upload(req.files.media_img[i].path, {
                    use_filename: true,
                    unique_filename: false,
                });
                fs.unlinkSync(req.files.media_img[i].path);
                alluploads.push(resp.secure_url);
            }
            // newStore.storeImg = alluploads;
            data.media_img = alluploads;
        }
    }
    await Compose.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


 