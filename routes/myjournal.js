const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs"); 


const {
    add_MyJournal,
    myJournal_list,
    dltMyJournal,
    get_myJournal_bytype,
    getone_myJournal,
    personal_list,
    business_list,
    notes_list,
    
   
} = require("../controller/myjournal");

 
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
    { name: "jrnl_img", maxCount: 10 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
 
 
 router.post("/user/add_MyJournal",multipleUpload, add_MyJournal);
router.get("/admin/myJournal_list", myJournal_list);
router.get("/admin/dltMyJournal/:id", dltMyJournal);
router.get("/admin/getone_myJournal/:id", getone_myJournal);
router.get("/admin/get_myJournal_bytype/:id", get_myJournal_bytype);

router.get("/admin/personal_list", personal_list);
router.get("/admin/business_list", business_list);
router.get("/admin/notes_list", notes_list);
//router.get("/admin/get_myJournal_bytype/:id", get_myJournal_bytype);


module.exports = router;

