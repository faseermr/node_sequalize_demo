const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  findById,
  update,
  deleteById,
} = require("../controller/student.controller");

router.post("/", create);

router.get("/", findAll);

router.get("/:id", findById);

router.put("/:id", update);

router.delete("/:id", deleteById);

module.exports = router;
