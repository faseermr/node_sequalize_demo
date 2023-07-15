const db = require("../model/index");
const Department = db.departments;
const Op = db.Sequelize.Op;

// create new department
exports.create = (req, res) => {
  const newDepartment = {
    name: req.body.name,
  };

  Department.create(newDepartment)
    .then((data) => {
      res.json({
        message: "Department added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

// get all departments
exports.findAll = (req, res) => {
  Department.findAll().then((data) => {
    res.status(200).json({
      data: data,
    });
  });
};
