const express = require("express");
const router = express.Router();
 

const {
    create_goal,
    get_Goal,
    viewone_Goal,
    edit_Goal,
    del_Goal
    
} = require("../controller/create_goal");

 
 
 router.post("/user/create_goal", create_goal);
 router.get("/user/get_Goal", get_Goal);
 router.get("/user/viewone_Goal/:id", viewone_Goal);
 router.post("/user/edit_Goal/:id", edit_Goal);
 router.get("/user/del_Goal/:id", del_Goal);



 

module.exports = router;

