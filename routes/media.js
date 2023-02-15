const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs"); 

const {
    upload_media,get_media,
    viewone_media,del_media,edit_media,upload
  
    
} = require("../controller/media");

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
       file.mimetype.includes("pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });
  
  let multipleUpload = uploads.fields([
    { name: "media_img", maxCount: 4 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
 
  router.post("/user/upload", upload);

 router.post("/user/upload_media",multipleUpload, upload_media);
 router.post("/user/edit_media/:id",multipleUpload, edit_media);

 router.get("/user/get_media", get_media);
  router.get("/user/viewone_media/:id", viewone_media);
  router.get("/user/del_media/:id", del_media);



  
  
 

module.exports = router;

