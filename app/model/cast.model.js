module.exports = (sequelize, Sequelize) => {
  const Cast = sequelize.define("cast", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Cast;
};
