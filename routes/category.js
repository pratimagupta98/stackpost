const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { addCategory, getallCategory } = require("../controller/category");

router.post("/user/addCategory", addCategory);
router.get("/admin/getallCategory", getallCategory);

module.exports = router;
