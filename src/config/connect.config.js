const { Sequelize } = require("sequelize");
const path = "mysql://root:admin1234@localhost:3310/lab";
const sequelize = new Sequelize(path);
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   })
//   .finally(() => {
//     // sequelize.close();
//   });

module.exports = sequelize;