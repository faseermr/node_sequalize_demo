const db = require("../model/index");
const Project = db.projects;
const Cast = db.casts;

exports.assignCastToProject = (req, res) => {
  const { project, cast } = req.body;
  Project.findOne({
    where: {
      name: project,
    },
  }).then((p) => {
    Cast.findOne({ where: { name: cast } }).then((c) => {
      p.addCast(c);
      res.json(p);
    });
  });
};

exports.findAllProjectDetails = (req, res) => {
  Project.findAll({
    include: [
      {
        model: Cast,
        as: "casts",
        attributes: ["name"], // Include only the "name" attribute from the Cast model
        through: {
          attributes: { exclude: ["createdAt", "updatedAt"] },
          //attributes: [], // Exclude the intermediate table attributes
        },
      },
    ],
    attributes: ["id", "name"], // Include only the "id" and "name" attributes from the Project model
  }).then((data) => {
    res.json(data);
  });
};

// exports.findAllProjectDetails = (req, res) => {
//   Project.findAll({
//     include: [
//       {
//         model: Cast,
//         as: "casts",
//         include: [],
//         through: {
//           //attributes: [],
//           attributes: { exclude: ["createdAt", "updatedAt"] },
//         },
//         attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude createdAt and updatedAt attributes from the Cast model
//       },
//     ],
//     attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude createdAt and updatedAt attributes from the Project model
//   }).then((data) => {
//     res.json(data);
//   });
// };
