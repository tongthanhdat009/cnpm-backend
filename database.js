const { Sequelize } = require("sequelize");
const initModels = require("./model/init-models");

// Tạo kết nối Sequelize
const sequelize = new Sequelize("ssb", "root", "Dat12345@", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Tắt log SQL queries
});

// Khởi tạo các models
const models = initModels(sequelize);

// Test kết nối
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối database thành công.");
  } catch (error) {
    console.error("Không thể kết nối database:", error);
  }
}

testConnection();

module.exports = {
  sequelize,
  ...models,
};
