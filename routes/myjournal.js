const express = require("express");
const router = express.Router();
 

const {
    add_MyJournal,
    myJournal_list,
    dltMyJournal,
    get_myJournal_bytype,
    getone_myJournal,
    personal_list,
    business_list,
    notes_list
   
} = require("../controller/myjournal");

 
 
 router.post("/user/add_MyJournal", add_MyJournal);
router.get("/admin/myJournal_list", myJournal_list);
router.get("/admin/dltMyJournal/:id", dltMyJournal);
router.get("/admin/getone_myJournal/:id", getone_myJournal);
router.get("/admin/get_myJournal_bytype/:id", get_myJournal_bytype);

router.get("/admin/personal_list", personal_list);
router.get("/admin/business_list", business_list);
router.get("/admin/notes_list", notes_list);


module.exports = router;

