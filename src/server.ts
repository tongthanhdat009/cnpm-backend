// backend/src/server.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from 'http'; // Import http
import { initWebSocket } from './websocket'; // Import hàm initWebSocket

// Import các routes
import authRoute from './routes/AuthRoute';
import tuyenDuongRoute from './routes/TuyenDuongRoute';
import chuyenDiRoute from './routes/ChuyenDiRoute';
import nguoiDungRoute from './routes/NguoiDungRoute';
import xeBuytRoute from './routes/XeBuytRoute';
import diemDungRoute from './routes/DiemDungRoute';
import hocSinhRoute from './routes/HocSinhRoute';
import thongBaoRoute from './routes/ThongBaoRoute'; // Thêm route cho thông báo

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tuyen-duong', tuyenDuongRoute);
app.use('/api/v1/chuyen-di', chuyenDiRoute);
app.use('/api/v1/nguoi-dung', nguoiDungRoute);
app.use('/api/v1/xe-buyt', xeBuytRoute);
app.use('/api/v1/diem-dung', diemDungRoute);
app.use('/api/v1/hoc-sinh', hocSinhRoute);
app.use('/api/v1/thong-bao', thongBaoRoute); // Sử dụng route thông báo

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route không tồn tại',
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi server',
  });
});

// Tạo HTTP server từ Express app
const server = http.createServer(app);

// Khởi tạo WebSocket server
initWebSocket(server);

// Lắng nghe trên server HTTP (thay vì app.listen)
server.listen(PORT, () => {
  console.log(`🚀 HTTP Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/v1`);
});

// Export server nếu cần (ví dụ cho testing)
// export default server;