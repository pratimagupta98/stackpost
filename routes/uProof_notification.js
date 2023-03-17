const express = require("express");
const router = express.Router();
 

const {
    add_uproof_noti,
    list_uproof_noti,
    update_uproof_noti,
    getone_uproof_noti,
    dlt_uproof_noti
    
} = require("../controller/uProof_notification");

 
 
 router.post("/user/add_label", add_uproof_noti);
 router.get("/user/list_uproof_noti", list_uproof_noti);
 router.get("/user/getone_uproof_noti/:id", getone_uproof_noti);
 router.post("/user/update_uproof_noti/:id", update_uproof_noti);
 router.get("/user/dlt_uproof_noti/:id", dlt_uproof_noti);



 

module.exports = router;

