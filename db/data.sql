-- Tạm thời vô hiệu hóa việc kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa sạch dữ liệu từ các bảng
TRUNCATE TABLE `nguoi_dung`;
TRUNCATE TABLE `thong_bao`;
TRUNCATE TABLE `hoc_sinh`;
TRUNCATE TABLE `xe_buyt`;
TRUNCATE TABLE `tuyen_duong`;
TRUNCATE TABLE `diem_dung`;
TRUNCATE TABLE `tuyen_duong_diem_dung`;
TRUNCATE TABLE `phan_cong_hoc_sinh`;
TRUNCATE TABLE `chuyen_di`;
TRUNCATE TABLE `diem_danh_chuyen_di`;

-- Bật lại việc kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;
-- 1. Bảng nguoi_dung (Users)
-- Mật khẩu được hash bằng bcrypt, ví dụ cho 'matkhau123'
INSERT INTO `nguoi_dung` (`id_nguoi_dung`, `ho_ten`, `ten_tai_khoan`, `mat_khau_bam`, `so_dien_thoai`, `vai_tro`) VALUES
(1, 'Trần Văn An', 'admin', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0901112222', 'quan_ly'),
(2, 'Nguyễn Thị Bình', 'phuhuynh_binh', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0912345678', 'phu_huynh'),
(3, 'Lê Minh Cường', 'phuhuynh_cuong', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0987654321', 'phu_huynh'),
(4, 'Phạm Văn Dũng', 'taixe_dung', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0905556677', 'tai_xe'),
(5, 'Võ Thị Em', 'taixe_em', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0908889900', 'tai_xe');

-- 2. Bảng xe_buyt (Buses)
INSERT INTO `xe_buyt` (`id_xe_buyt`, `bien_so_xe`, `so_ghe`, `hang`, `anh`, `vi_do_hien_tai`, `kinh_do_hien_tai`, `lan_cap_nhat_cuoi`) VALUES
(1, '51B-123.45', 29, 'Hyundai', 'https://example.com/images/bus1.jpg', 10.7769, 106.7009, NOW()),
(2, '51B-678.90', 16, 'Ford', 'https://example.com/images/bus2.jpg', 10.8231, 106.6297, NOW());

-- 3. Bảng diem_dung (Stops)
INSERT INTO `diem_dung` (`id_diem_dung`, `ten_diem_dung`, `dia_chi`, `vi_do`, `kinh_do`) VALUES
(1, 'Đại học sài gòn', 'An Dương Vương, phường 2, Quận 5, TP.HCM', 10.760676570555919, 106.68242830954644),
(2, 'Công viên Lê Văn Tám', 'Đ. Hai Bà Trưng, Đa Kao, Quận 1, TP.HCM', 10.7898, 106.6923),
(3, 'THPT nam kì khởi nghĩa', 'Đ. 3 tháng 2, Phường 16, Quận 11, TP.HCM', 10.758623274085513, 106.65055088549472),
(4, 'Landmark 81', '720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, TP.HCM', 10.7951, 106.7219),
(5, 'Đại học HUTECH', '475A Đ. Điện Biên Phủ, Phường 25, Bình Thạnh, TP.HCM', 10.7974, 106.7037),
(6, 'Vòng xoay Hàng Xanh', 'Phường 25, Bình Thạnh, TP.HCM', 10.7994, 106.7082);

-- 4. Bảng tuyen_duong (Routes)
INSERT INTO `tuyen_duong` (`id_tuyen_duong`, `ten_tuyen_duong`, `quang_duong`, `thoi_gian_du_kien`, `mo_ta`) VALUES
(1, 'Tuyến Quận 1', 10, 30, 'Tuyến qua trung tâm Quận 1, Quận 5.'),
(2, 'Tuyến Bình Thạnh', 8, 25, 'Tuyến đi qua khu vực Bình Thạnh, Landmark 81.');

-- 5. Bảng tuyen_duong_diem_dung (Route Stops Mapping)
INSERT INTO `tuyen_duong_diem_dung` (`id_diem_dung`, `id_tuyen_duong`, `thu_tu_diem_dung`) VALUES
-- Tuyến 1
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
-- Tuyến 2
(4, 2, 1),
(5, 2, 2),
(6, 2, 3);

-- 6. Bảng hoc_sinh (Students)
INSERT INTO `hoc_sinh` (`id_hoc_sinh`, `id_phu_huynh`, `id_diem_dung`, `ho_ten`, `lop`, `ghi_chu`) VALUES
(1, 2, 2, 'Nguyễn Hoàng Gia An', '1A', 'Dị ứng với đậu phộng'),
(2, 2, 3, 'Nguyễn Hoàng Gia Bảo', '3B', ''),
(3, 3, 5, 'Lê Tuệ Nhi', '2C', ''),
(4, 3, 6, 'Lê Tuấn Khang', '5A', 'Say xe nhẹ');


-- 7. Bảng phan_cong_hoc_sinh (Student Route Assignment)
INSERT INTO `phan_cong_hoc_sinh` (`id_hoc_sinh`, `id_tuyen_duong`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);

-- 8. Bảng chuyen_di (Trips)
-- Giả sử hôm nay là ngày 2025-10-17
INSERT INTO `chuyen_di` (`id_chuyen_di`, `id_tai_xe`, `id_tuyen_duong`, `id_xe_buyt`, `loai_chuyen_di`, `gio_khoi_hanh`, `ngay`, `trang_thai`, `thoi_gian_bat_dau_thuc_te`, `thoi_gian_ket_thuc_thuc_te`) VALUES
(1, 4, 1, 1, 'don_hoc_sinh', '06:30:00', '2025-10-17', 'hoan_thanh', '2025-10-17 06:32:00', '2025-10-17 07:15:00'),
(2, 4, 1, 1, 'tra_hoc_sinh', '16:30:00', '2025-10-17', 'cho_khoi_hanh', NULL, NULL),
(3, 5, 2, 2, 'don_hoc_sinh', '06:45:00', '2025-10-17', 'dang_di', '2025-10-17 06:45:00', NULL),
(4, 5, 2, 2, 'tra_hoc_sinh', '16:45:00', '2025-10-17', 'da_huy', NULL, NULL);

-- 9. Bảng diem_danh_chuyen_di (Trip Attendance)
INSERT INTO `diem_danh_chuyen_di` (`id_diem_danh`, `id_hoc_sinh`, `id_chuyen_di`, `id_diem_dung`, `trang_thai`, `thoi_gian`) VALUES
-- Chuyến đi 1 (sáng, tuyến 1, đã hoàn thành)
(1, 1, 1, 2, 'da_don', '2025-10-17 06:45:10'),
(2, 2, 1, 3, 'vang_mat', '2025-10-17 07:00:00'),
-- Chuyến đi 3 (sáng, tuyến 2, đang đi)
(3, 3, 3, 5, 'da_don', '2025-10-17 07:05:30');

-- 10. Bảng thong_bao (Notifications)
INSERT INTO `thong_bao` (`id_thong_bao`, `id_nguoi_nhan`, `id_nguoi_gui`, `da_xem`, `thoi_gian`, `tieu_de`, `noi_dung`) VALUES
(1, 2, 1, 0, '2025-10-16 17:00:00', 'Thông báo nghỉ lễ', 'Nhà trường thông báo học sinh sẽ được nghỉ lễ vào ngày 30/10/2025.'),
(2, 3, 5, 1, '2025-10-17 06:50:00', 'Xe đến trễ', 'Do kẹt xe, xe buýt tuyến Bình Thạnh dự kiến sẽ đến trễ 10 phút. Mong quý phụ huynh thông cảm.');