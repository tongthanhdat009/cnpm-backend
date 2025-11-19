"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http")); // Import http
const websocket_1 = require("./websocket"); // Import hàm initWebSocket
// Import các routes
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const TuyenDuongRoute_1 = __importDefault(require("./routes/TuyenDuongRoute"));
const ChuyenDiRoute_1 = __importDefault(require("./routes/ChuyenDiRoute"));
const NguoiDungRoute_1 = __importDefault(require("./routes/NguoiDungRoute"));
const XeBuytRoute_1 = __importDefault(require("./routes/XeBuytRoute"));
const DiemDungRoute_1 = __importDefault(require("./routes/DiemDungRoute"));
const HocSinhRoute_1 = __importDefault(require("./routes/HocSinhRoute"));
const ThongBaoRoute_1 = __importDefault(require("./routes/ThongBaoRoute")); // Thêm route cho thông báo
const DiemDanhRoute_1 = __importDefault(require("./routes/DiemDanhRoute"));
const TaiXeRoute_1 = __importDefault(require("./routes/TaiXeRoute"));
const BusTrackingRoute_1 = __importDefault(require("./routes/BusTrackingRoute")); // Thêm route cho bus tracking
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/v1/auth', AuthRoute_1.default);
app.use('/api/v1/tuyen-duong', TuyenDuongRoute_1.default);
app.use('/api/v1/chuyen-di', ChuyenDiRoute_1.default);
app.use('/api/v1/nguoi-dung', NguoiDungRoute_1.default);
app.use('/api/v1/xe-buyt', XeBuytRoute_1.default);
app.use('/api/v1/diem-dung', DiemDungRoute_1.default);
app.use('/api/v1/hoc-sinh', HocSinhRoute_1.default);
app.use('/api/v1/thong-bao', ThongBaoRoute_1.default); // Sử dụng route thông báo
app.use('/api/v1/diem-danh', DiemDanhRoute_1.default);
app.use('/api/v1/tai-xe', TaiXeRoute_1.default); // Sử dụng route tài xế
app.use('/api/v1/bus-tracking', BusTrackingRoute_1.default); // Sử dụng route bus tracking
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route không tồn tại',
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Lỗi server',
    });
});
// Tạo HTTP server từ Express app
const server = http_1.default.createServer(app);
// Khởi tạo WebSocket server
(0, websocket_1.initWebSocket)(server);
// Lắng nghe trên server HTTP (thay vì app.listen)
server.listen(PORT, () => {
    console.log(`🚀 HTTP Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/v1`);
});
// Export server nếu cần (ví dụ cho testing)
// export default server;
//# sourceMappingURL=server.js.map