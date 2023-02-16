const express = require("express");
const router = express.Router();
 

const {
    add_label,
    get_label,
    viewone_label,
    edit_label,
    del_label
    
} = require("../controller/label");

 
 
 router.post("/user/add_label", add_label);
 router.get("/user/get_label", get_label);
 router.get("/user/viewone_label/:id", viewone_label);
 router.post("/user/edit_label/:id", edit_label);
 router.get("/user/del_label/:id", del_label);



 

module.exports = router;

