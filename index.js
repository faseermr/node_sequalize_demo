const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/model/index");

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
const studentRoutes = require("./app/routes/student.routes");
const departmentRoutes = require("./app/routes/department.routes");
const projectRoutes = require("./app/routes/project.routes");

app.use("/students", studentRoutes);
app.use("/departments", departmentRoutes);
app.use("/projects", projectRoutes);

app.all("*", (req, res, next) => {
  const err = new Error(`Requested URL ${req.path} not found`);
  err.statusCode = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 0,
    message: err.message,
    stack: err.stack,
  });
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// db.sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("Synced db correctly");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

const port = 4000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
