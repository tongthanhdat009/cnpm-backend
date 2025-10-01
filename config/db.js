// config/db.js
const mysql = require("mysql2");

// Tạo một "pool" kết nối thay vì một kết nối đơn lẻ
const pool = mysql.createPool({
  host: "localhost", // Địa chỉ host của MySQL server
  user: "root", // Tên người dùng MySQL
  password: "12345", // Mật khẩu của bạn
  database: "ssb", // Tên cơ sở dữ liệu
  waitForConnections: true,
  connectionLimit: 10, // Số lượng kết nối tối đa trong pool
  queueLimit: 0,
});

// Sử dụng .promise() để tất cả các query đều trả về Promise, cho phép dùng async/await
module.exports = pool.promise();
