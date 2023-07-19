const dbConfig = require("../config/db-config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./student.model.js")(sequelize, Sequelize);
db.departments = require("./department.model")(sequelize, Sequelize);
db.projects = require("./project.model")(sequelize, Sequelize);
db.casts = require("./cast.model")(sequelize, Sequelize);

db.departments.hasMany(db.students, { foreignKey: "dep_id", as: "students" });
db.students.belongsTo(db.departments, {
  foreignKey: "dep_id",
  as: "departments",
});

db.casts.belongsToMany(db.projects, {
  through: "cast_project",
  as: "projects",
  foreignKey: "cast_id",
});

db.projects.belongsToMany(db.casts, {
  through: "cast_project",
  as: "casts",
  foreignKey: "project_id",
});

const initialData = async () => {
  db.departments.create({
    name: "Electronic",
  });
  db.departments.create({
    name: "IT",
  });
  db.departments.create({
    name: "Computer Science",
  });

  db.students.create({ name: "Faseer", address: "Matara" });
  db.students.create({ name: "Ahmed", address: "Galle" });
  db.students.create({ name: "Shuraim", address: "Colombo" });

  db.projects.create({ name: "Samsung" });
  db.projects.create({ name: "Virtusa" });

  db.casts.create({ name: "John" });
  db.casts.create({ name: "Martin" });

  const c1 = await db.casts.findOne({ where: { name: "John" } });
  const c2 = await db.casts.findOne({ where: { name: "Martin" } });
  const p1 = await db.projects.findOne({ where: { name: "Samsung" } });
  p1.addCasts(c1);
  p1.addCasts(c2);
};

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db correctly");
    //  initialData();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;
