const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs"); 

const {
    add_compose,get_compose,
    viewone_compose,del_compose
  
    
} = require("../controller/compose");

 
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
    { name: "media_img", maxCount: 10 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
 
 
 router.post("/user/add_compose",multipleUpload, add_compose);
 //router.post("/user/edit_media/:id",multipleUpload, edit_media);

 router.get("/user/get_compose", get_compose);
  router.get("/user/viewone_compose/:id", viewone_compose);
  router.get("/user/del_compose/:id", del_compose);



  
  
 

module.exports = router;

