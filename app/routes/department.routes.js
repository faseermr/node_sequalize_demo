const express = require("express");
const router = express.Router();
const { create } = require("../controller/department.controller");

router.post("/", create);

module.exports = router;
