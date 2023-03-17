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

db.departments.hasMany(db.students, { foreignKey: "dep_id", as: "students" });
db.students.belongsTo(db.departments, {
  foreignKey: "dep_id",
  as: "departments",
});

module.exports = db;
