module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
  });

  return Student;
};
