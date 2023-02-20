const express = require("express");
const router = express.Router();
 

const {
    add_comment,
    get_comment,
    viewone_comment,
    edit_comment,
    del_comment,
    comment_by_post
    
} = require("../controller/comment");

 
 
 router.post("/user/add_comment", add_comment);
 router.get("/user/get_comment", get_comment);
 router.get("/user/viewone_comment/:id", viewone_comment);
 router.post("/user/edit_comment/:id", edit_comment);
 router.get("/user/del_comment/:id", del_comment);

 router.get("/user/comment_by_post/:id", comment_by_post);

 

module.exports = router;

