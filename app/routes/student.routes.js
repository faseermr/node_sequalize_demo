const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  findById,
  update,
  deleteById,
  getCountByDepartment,
} = require("../controller/student.controller");

router.post("/", create);

router.get("/", findAll);

router.get("/:id", findById);

router.put("/:id", update);

router.delete("/:id", deleteById);

router.get("/department/count", getCountByDepartment);

module.exports = router;
