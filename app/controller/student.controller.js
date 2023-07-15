const db = require("../model/index");
const Student = db.students;
const Op = db.Sequelize.Op;

// create new student
exports.create = (req, res) => {
  const newStudent = {
    name: req.body.name,
    address: req.body.address,
    dep_id: req.body.department,
  };

  Student.create(newStudent)
    .then((data) => {
      res.json({
        message: "Student added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

// get all students
exports.findAll = (req, res) => {
  Student.findAll({ include: "departments" }).then((data) => {
    res.status(200).json({
      data: data,
    });
  });
};

exports.getCountByDepartment = (req, res) => {
  Student.findAll({
    // where: {
    //   dep_id: 1,
    // },
    attributes: [
      "dep_id",
      db.sequelize.fn("COUNT", db.sequelize.col("dep_id"), "departments"),
    ],
    //include: "departments",

    group: "dep_id",
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

// exports.findById = (req, res) => {
//   let id = req.params.id;
//   Student.findOne({
//     where: {
//       id: id,
//     },
//   }).then((student) => {
//     if (!student) {
//       return res.status(404).send({ message: "Student Not found." });
//     }
//     res.status(200).json(student);
//   });
// };

// get single student
exports.findById = (req, res) => {
  let id = req.params.id;
  Student.findByPk(id).then((student) => {
    if (!student) {
      return res
        .status(404)
        .send({ message: `Student Not found with id : ${id}` });
    }
    res.status(200).json(student);
  });
};

// update student
exports.update = (req, res) => {
  let id = req.params.id;
  const updateStudent = {
    name: req.body.name,
    address: req.body.address,
  };
  console.log(updateStudent);
  Student.update(updateStudent, {
    where: {
      id: id,
    },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: "Student was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
      });
    }
  });
};

// delete student by id
exports.deleteById = (req, res) => {
  let id = req.params.id;
  Student.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};
