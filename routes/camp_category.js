const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { addCategory, cmp_getallCategory } = require("../controller/camp_category");

router.post("/user/addCategory", addCategory);
router.get("/user/cmp_getallCategory", cmp_getallCategory);

module.exports = router;
