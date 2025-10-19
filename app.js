// Import các thư viện cần thiết
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); // Thêm CORS

// Import các file routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const diemDungRouter = require("./routes/diem_dung");
const authRouter = require("./routes/auth");
// Thêm các routes khác của bạn ở đây, ví dụ: const productsRouter = require('./routes/products');

const app = express();

// --- Cấu hình Middleware ---

// Cho phép các request từ các domain khác (quan trọng cho React frontend)
app.use(cors());

// Ghi log các request ra console (ở chế độ dev)
app.use(logger("dev"));

// Middleware để đọc và xử lý JSON trong request body
app.use(express.json());

// Middleware để đọc và xử lý dữ liệu từ form (URL-encoded)
app.use(express.urlencoded({ extended: false }));

// Middleware để xử lý cookie
app.use(cookieParser());

// --- Thiết lập Routes ---

// Áp dụng một prefix chung cho tất cả các API routes, ví dụ /api/v1
// Điều này giúp quản lý và versioning API tốt hơn
app.use("/api/v1/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/diem-dung", diemDungRouter);
// app.use('/api/v1/products', productsRouter);

// --- Xử lý lỗi (Error Handling) ---

// Bắt lỗi 404 cho các route không tồn tại và trả về JSON
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found - Route không tồn tại",
  });
});

// Middleware xử lý lỗi tổng quát (cho tất cả các lỗi khác)
// Luôn đặt middleware này ở cuối cùng
app.use((err, req, res, next) => {
  // Lấy status code từ lỗi, nếu không có thì mặc định là 500 (Internal Server Error)
  const statusCode = err.status || 500;

  // Trả về lỗi dưới dạng JSON
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
