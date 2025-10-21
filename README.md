# CNPM Backend - Smart School Bus System

## 📋 Mô tả dự án

**Smart School Bus System Backend** là hệ thống backend cho ứng dụng quản lý và theo dõi xe buýt học đường thông minh. Hệ thống cung cấp các API để quản lý học sinh, phụ huynh, tài xế, xe buýt, tuyến đường, lịch trình và theo dõi vị trí xe buýt real-time.

## 🎯 Yêu cầu hệ thống

### Yêu cầu chức năng

#### 1. Quản lý người dùng
- **Quản lý (quan_ly)**: Có toàn quyền quản lý hệ thống
  - Quản lý học sinh, phụ huynh, tài xế
  - Quản lý xe buýt và tuyến đường
  - Quản lý lịch trình và phân công
  - Gửi thông báo đến phụ huynh
  - Xem dashboard và báo cáo

- **Tài xế (tai_xe)**: Vận hành chuyến đi
  - Xem lịch trình được phân công
  - Điểm danh học sinh (đón/trả)
  - Cập nhật vị trí xe real-time
  - Nhận/gửi thông báo

- **Phụ huynh (phu_huynh)**: Theo dõi con em
  - Theo dõi vị trí xe buýt của con
  - Nhận thông báo về chuyến đi
  - Xem lịch sử điểm danh
  - Quản lý thông tin cá nhân

#### 2. Quản lý học sinh
- Thêm/sửa/xóa thông tin học sinh
- Liên kết học sinh với phụ huynh
- Gán điểm dừng đón/trả cho học sinh
- Phân công học sinh vào tuyến đường

#### 3. Quản lý tuyến đường và điểm dừng
- Tạo/chỉnh sửa tuyến đường
- Quản lý danh sách điểm dừng
- Sắp xếp thứ tự điểm dừng trong tuyến
- Tính toán khoảng cách và thời gian di chuyển

#### 4. Quản lý lịch trình
- Tạo lịch trình cho các chuyến đi
- Phân công xe buýt và tài xế
- Quản lý thời gian khởi hành
- Theo dõi trạng thái chuyến đi

#### 5. Điểm danh và theo dõi
- Điểm danh học sinh tại mỗi điểm dừng
- Ghi nhận trạng thái: đã đón, đã trả, vắng mặt
- Lưu lịch sử điểm danh
- Gửi cảnh báo khi có bất thường

#### 6. Thông báo
- Gửi thông báo tự động/thủ công
- Thông báo về lịch trình, điểm danh
- Cảnh báo khi xe trễ hoặc có sự cố
- Quản lý trạng thái đã xem/chưa xem

### Yêu cầu phi chức năng

#### 1. Hiệu suất
- API response time < 500ms cho hầu hết các requests
- Hỗ trợ tối thiểu 100 concurrent users
- Database query optimization với indexing

#### 2. Bảo mật
- Mã hóa mật khẩu với bcrypt (saltRounds: 10)
- Authentication và Authorization theo vai trò
- Validate input để tránh SQL Injection
- CORS configuration cho frontend

#### 3. Khả năng mở rộng
- RESTful API design
- Modular architecture với MVC pattern
- Database schema có thể mở rộng
- Support multiple concurrent requests

#### 4. Độ tin cậy
- Error handling toàn diện
- Database connection pooling
- Logging cho debugging
- Data validation

## 🏗️ Kiến trúc hệ thống

### Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│              (React + Vite + TailwindCSS)                   │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
                     │ (JSON)
┌────────────────────▼────────────────────────────────────────┐
│                      API LAYER                              │
│                    (Express.js)                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes (endpoints)                                  │   │
│  │  - /api/v1/auth                                      │   │
│  │  - /api/v1/users                                     │   │
│  │  - /api/diem-dung                                    │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐   │
│  │  Controllers (Business Logic)                        │   │
│  │  - authController: đăng ký, đăng nhập                │   │
│  │  - userController: quản lý người dùng                │   │
│  │  - routeController: quản lý tuyến đường              │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐   │
│  │  Models (Sequelize ORM)                              │   │
│  │  - nguoi_dung, hoc_sinh, xe_buyt, etc.               │   │
│  └────────────────────┬─────────────────────────────────┘   │
└───────────────────────┼─────────────────────────────────────┘
                        │ MySQL2
┌───────────────────────▼──────────────────────────────────────┐
│                   DATABASE LAYER                             │
│                    MySQL Database                            │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Tables:                                             │    │
│  │  - nguoi_dung (users)                                │    │
│  │  - hoc_sinh (students)                               │    │
│  │  - xe_buyt (buses)                                   │    │
│  │  - tuyen_duong (routes)                              │    │
│  │  - diem_dung (stops)                                 │    │
│  │  - chuyen_di (trips)                                 │    │
│  │  - diem_danh_chuyen_di (attendance)                  │    │
│  │  - thong_bao (notifications)                         │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Kiến trúc MVC Pattern

```
┌─────────────────────────────────────────────────────────┐
│                      REQUEST                            │
│                 (HTTP từ Client)                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                     ROUTES                              │
│  - Định nghĩa các endpoint                              │
│  - Map URL với Controller                               │
│  routes/                                                │
│                                                         │
│  ├── auth.js        → /api/v1/auth/*                    │
│  ├── users.js       → /api/v1/users/*                   │
│  ├── diem_dung.js   → /api/diem-dung/*                  │
│  └── index.js       → /api/v1/                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  CONTROLLERS                            │
│  - Xử lý business logic                                 │
│  - Validate dữ liệu                                     │
│  - Gọi Model để tương tác database                      │
│  - Trả response về client                               │
│                                                         │
│  controllers/                                           │
│  └── authController.js                                  │
│      - register(): đăng ký tài khoản                    │
│      - login(): đăng nhập                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                     MODELS                              │
│  - Định nghĩa cấu trúc database                         │
│  - ORM mapping (Sequelize)                              │
│  - Relationships giữa các bảng                          │
│                                                         │
│  model/                                                 │
│  ├── nguoi_dung.js          (Users)                     │
│  ├── hoc_sinh.js            (Students)                  │
│  ├── xe_buyt.js             (Buses)                     │
│  ├── tuyen_duong.js         (Routes)                    │
│  ├── diem_dung.js           (Stops)                     │
│  ├── chuyen_di.js           (Trips)                     │
│  ├── diem_danh_chuyen_di.js (Attendance)                │
│  ├── thong_bao.js           (Notifications)             │
│  ├── phan_cong_hoc_sinh.js  (Student Assignment)        │
│  ├── tuyen_duong_diem_dung.js (Route-Stop Junction)     │
│  └── init-models.js         (Relationships)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE                             │
│              MySQL (Connection Pool)                    │
│                                                         │
│  config/                                                │
│  └── db.js         (MySQL2 Pool Connection)             │
│                                                         │
│  database.js       (Sequelize Instance + Models)        │
└─────────────────────────────────────────────────────────┘
```

## 🗄️ Thiết kế Database

### Database Schema

```sql
┌──────────────────────────────────────────────────────────────┐
│                      DATABASE: ssb                           │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────┐
│    nguoi_dung       │  (Users - Người dùng)
├─────────────────────┤
│ PK id_nguoi_dung    │
│    ho_ten           │
│ UK ten_tai_khoan    │
│    mat_khau_bam     │
│ UK so_dien_thoai    │
│    vai_tro          │  ENUM('quan_ly', 'phu_huynh', 'tai_xe')
│    ngay_tao         │
└──────────┬──────────┘
           │
           │ 1:N (Phụ huynh - Học sinh)
           ▼
┌─────────────────────┐
│     hoc_sinh        │  (Students - Học sinh)
├─────────────────────┤
│ PK id_hoc_sinh      │
│ FK id_phu_huynh     │ → nguoi_dung
│ FK id_diem_dung     │ → diem_dung
│    ho_ten           │
│    lop              │
│    ghi_chu          │
└──────────┬──────────┘
           │
           │ N:M (qua phan_cong_hoc_sinh)
           ▼
┌─────────────────────┐       ┌──────────────────────┐
│  tuyen_duong        │  1:N  │ phan_cong_hoc_sinh   │
├─────────────────────┤◄──────┤──────────────────────┤
│ PK id_tuyen_duong   │       │ PK id_phan_cong      │
│    ten_tuyen_duong  │       │ FK id_hoc_sinh       │
│    mo_ta            │       │ FK id_tuyen_duong    │
└──────────┬──────────┘       └──────────────────────┘
           │
           │ N:M (qua tuyen_duong_diem_dung)
           ▼
┌─────────────────────┐       ┌──────────────────────────┐
│    diem_dung        │  1:N  │ tuyen_duong_diem_dung    │
├─────────────────────┤◄──────┤──────────────────────────┤
│ PK id_diem_dung     │       │ PK id_tuyen_duong_diem_d │
│    ten_diem_dung    │       │ FK id_tuyen_duong        │
│    dia_chi          │       │ FK id_diem_dung          │
│    vi_do            │       │    thu_tu_diem_dung      │
│    kinh_do          │       └──────────────────────────┘
└─────────────────────┘

┌─────────────────────┐
│      xe_buyt        │  (Buses - Xe buýt)
├─────────────────────┤
│ PK id_xe_buyt       │
│ UK bien_so_xe       │
│    so_ghe           │
│    hang             │
│    anh              │
│    vi_do_hien_tai   │
│    kinh_do_hien_tai │
│    lan_cap_nhat_cuoi│
└──────────┬──────────┘
           │
           │ 1:N
           ▼
┌──────────────────────┐
│     chuyen_di        │  (Trips - Chuyến đi)
├──────────────────────┤
│ PK id_chuyen_di      │
│ FK id_tai_xe         │ → nguoi_dung
│ FK id_tuyen_duong    │ → tuyen_duong
│ FK id_xe_buyt        │ → xe_buyt
│    loai_chuyen_di    │
│    gio_khoi_hanh     │
│    ngay              │
│    trang_thai        │  ENUM('cho_khoi_hanh', 'dang_di', 'hoan_thanh', 'da_huy', 'bi_tre')
│    thoi_gian_bat_dau │
│    thoi_gian_ket_thuc│
└──────────┬───────────┘
           │
           │ 1:N
           ▼
┌─────────────────────────┐
│  diem_danh_chuyen_di    │  (Attendance - Điểm danh)
├─────────────────────────┤
│ PK id_diem_danh         │
│ FK id_hoc_sinh          │ → hoc_sinh
│ FK id_chuyen_di         │ → chuyen_di
│ FK id_diem_dung         │ → diem_dung
│    trang_thai           │  ENUM('da_don', 'da_tra', 'vang_mat')
│    thoi_gian            │
└─────────────────────────┘

┌─────────────────────┐
│     thong_bao       │  (Notifications - Thông báo)
├─────────────────────┤
│ PK id_thong_bao     │
│ FK id_nguoi_nhan    │ → nguoi_dung
│ FK id_nguoi_gui     │ → nguoi_dung
│    da_xem           │
│    thoi_gian        │
│    tieu_de          │
│    noi_dung         │
└─────────────────────┘
```

### Relationships (Mối quan hệ)

1. **nguoi_dung (1) → (N) hoc_sinh**: Một phụ huynh có nhiều học sinh
2. **diem_dung (1) → (N) hoc_sinh**: Một điểm dừng có nhiều học sinh
3. **hoc_sinh (N) ←→ (M) tuyen_duong**: Nhiều học sinh thuộc nhiều tuyến (qua phan_cong_hoc_sinh)
4. **tuyen_duong (N) ←→ (M) diem_dung**: Một tuyến có nhiều điểm dừng (qua tuyen_duong_diem_dung)
5. **nguoi_dung (1) → (N) chuyen_di**: Một tài xế có nhiều chuyến đi
6. **xe_buyt (1) → (N) chuyen_di**: Một xe có nhiều chuyến đi
7. **tuyen_duong (1) → (N) chuyen_di**: Một tuyến có nhiều chuyến đi
8. **chuyen_di (1) → (N) diem_danh_chuyen_di**: Một chuyến có nhiều bản ghi điểm danh
9. **nguoi_dung (1) → (N) thong_bao**: Người gửi/nhận có nhiều thông báo

### Indexes

- **Primary Keys**: Tất cả bảng có PK tự động tăng
- **Unique Keys**: ten_tai_khoan, so_dien_thoai (nguoi_dung), bien_so_xe (xe_buyt)
- **Foreign Keys**: Tất cả các mối quan hệ có index trên FK để tối ưu JOIN
- **Composite Indexes**: Có thể thêm cho các query phức tạp

## 🔧 Công nghệ sử dụng

### Core Technologies

- **Node.js**: Runtime environment
- **Express.js v4.16.1**: Web framework
- **MySQL2 v3.15.1**: Database driver (với Promise support)
- **Sequelize v6.37.7**: ORM cho MySQL

### Authentication & Security

- **bcrypt v6.0.0**: Mã hóa mật khẩu
- **CORS v2.8.5**: Cross-Origin Resource Sharing

### Development Tools

- **Nodemon v3.1.10**: Auto-restart server khi code thay đổi
- **Sequelize-auto v0.8.8**: Generate models từ database
- **Morgan v1.9.1**: HTTP request logger
- **dotenv v17.2.3**: Environment variables management

### Other Dependencies

- **cookie-parser v1.4.4**: Parse Cookie header
- **debug v2.6.9**: Debugging utility
- **http-errors v1.6.3**: HTTP error handling

## 📁 Cấu trúc thư mục

```
cnpm-backend/
├── config/                    # Cấu hình
│   ├── db.js                 # MySQL connection pool
│   ├── data.sql              # Sample data
│   └── ssb.sql               # Database schema
│
├── controllers/               # Business logic
│   └── authController.js     # Authentication logic
│
├── middleware/                # Middleware functions
│   └── (chưa implement)
│
├── model/                     # Sequelize models
│   ├── nguoi_dung.js         # User model
│   ├── hoc_sinh.js           # Student model
│   ├── xe_buyt.js            # Bus model
│   ├── tuyen_duong.js        # Route model
│   ├── diem_dung.js          # Stop model
│   ├── chuyen_di.js          # Trip model
│   ├── diem_danh_chuyen_di.js # Attendance model
│   ├── thong_bao.js          # Notification model
│   ├── phan_cong_hoc_sinh.js # Student assignment
│   ├── tuyen_duong_diem_dung.js # Route-Stop junction
│   └── init-models.js        # Model relationships
│
├── routes/                    # API routes
│   ├── index.js              # Root routes
│   ├── auth.js               # /api/v1/auth
│   ├── users.js              # /api/v1/users
│   └── diem_dung.js          # /api/diem-dung
│
├── app.js                     # Express app configuration
├── server.js                  # Server entry point
├── database.js                # Sequelize setup
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## 🚀 Cài đặt và chạy

### Prerequisites

- Node.js >= 14.x
- MySQL >= 8.0
- npm

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd cnpm-backend

# Cài đặt dependencies
npm install

# Cấu hình database trong config/db.js và database.js
# Chỉnh sửa thông tin kết nối MySQL:
# - host: localhost
# - user: root
# - password: 
# - database: ssb

# Import database schema
mysql -u root -p < config/ssb.sql
mysql -u root -p ssb < config/data.sql
```

### Chạy ứng dụng

```bash
# Development mode (với nodemon)
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

## 📡 API Endpoints

### Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Users

```
GET  /api/v1/users
```

### Điểm dừng (Stops)

```
GET  /api/diem-dung              # Lấy tất cả điểm dừng
GET  /api/diem-dung/:id          # Lấy chi tiết điểm dừng
GET  /api/diem-dung/tuyen/:id    # Lấy điểm dừng theo tuyến
```

### Tuyến đường (Routes)

```
GET  /api/v1/tuyen-duong         # (chưa implement)
POST /api/v1/tuyen-duong         # (chưa implement)
```

### Lịch trình (Schedules)

```
GET  /api/v1/lich-trinh          # (chưa implement)
POST /api/v1/lich-trinh          # (chưa implement)
```
## 📞 Liên hệ

Project developed for CNPM course.

---
**Version**: 0.0.0  
**Last Updated**: October 2025
