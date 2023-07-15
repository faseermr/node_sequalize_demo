const express = require("express");
const router = express.Router();
const {
  assignCastToProject,
  findAllProjectDetails,
} = require("../controller/projectController");

router.post("/assignCast", assignCastToProject);

router.get("/getAll", findAllProjectDetails);

module.exports = router;
