// Import file app chính
const app = require("./app");
// Import thư viện http của Node.js
const http = require("http");
// Import thư viện dotenv để quản lý biến môi trường
require("dotenv").config();

// Lấy cổng từ biến môi trường, nếu không có thì mặc định là 3000
const port = process.env.PORT || "3000";
app.set("port", port);

// Tạo server HTTP
const server = http.createServer(app);

// Lắng nghe kết nối trên cổng đã định
server.listen(port);

// Bắt sự kiện khi server bắt đầu lắng nghe
server.on("listening", () => {
  console.log(`🚀 Server is listening on port ${port}`);
});

// Bắt sự kiện khi có lỗi xảy ra
server.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
});
