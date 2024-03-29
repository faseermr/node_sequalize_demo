const db = require("../model/index");
const Student = db.students;
const Department = db.departments;
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

// exports.findAll = async(req,res) => {
// const result =await db.sequelize.query(`Select * from students`,
// // {
// //         type: db.sequelize.QueryTypes.SELECT,
// //       }
//       )
// res.status(200).json({
//          data: result
//        });
// }

// exports.getCountByDepartment = (req, res) => {
//   console.log({ response: "Hello" });
//   Student.findAndCountAll({
//     // where: {
//     //   dep_id: 1,
//     // },
//     // attributes: [
//     //   "dep_id",
//     //   db.sequelize.fn("COUNT", db.sequelize.col("dep_id"), "departments"),
//     // ],
//     include: "departments",

//     //group: "dep_id",
//   })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Something went wrong",
//       });
//     });
// };

// get student count by department wise
exports.getCountByDepartment = (req, res) => {
  //console.log({ response: "Hello" });
  Student.findAll({
    // where: {
    //   dep_id: 1,
    // },
    attributes: [
      "dep_id",
      //  [db.sequelize.fn("COUNT", db.sequelize.col("dep_id")), "count"],
      [
        db.sequelize.fn("COUNT", db.sequelize.col("departments.name")),
        "count_dep_name",
      ],
    ],
    include: [
      {
        model: Department,
        as: "departments",
        attributes: [
          "name",
          [
            db.sequelize.fn("COUNT", db.sequelize.col("departments.name")),
            "count_dep_name",
          ],
        ],
      },
    ],
    group: ["departments.name"],
  })
    // Student.count({
    //   // col: "dep_id",
    //   include: "departments",
    //   // attribute: ["dep_id", db.sequelize.fn("COUNT", db.sequelize.col("dep_id"))],
    //   group: "dep_id",
    // })
    // db.sequelize
    //   .query(
    //     `SELECT student.dep_id, COUNT(dep_id), departments.id AS departments.id, departments.name AS departments.name FROM students AS student LEFT OUTER JOIN departments AS departments ON student.dep_id = departments.id GROUP BY dep_id`
    //   )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
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



