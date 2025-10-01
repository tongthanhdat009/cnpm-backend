-- Dữ liệu mẫu cho hệ thống xe buýt trường học

-- Xóa dữ liệu cũ (tùy chọn, để làm sạch trước khi chèn)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `nguoi_dung`;
TRUNCATE TABLE `thong_bao`;
TRUNCATE TABLE `hoc_sinh`;
TRUNCATE TABLE `xe_buyt`;
TRUNCATE TABLE `tuyen_duong`;
TRUNCATE TABLE `diem_dung`;
TRUNCATE TABLE `tuyen_duong_diem_dung`;
TRUNCATE TABLE `phan_cong_hoc_sinh`;
TRUNCATE TABLE `lich_trinh`;
TRUNCATE TABLE `chuyen_di`;
TRUNCATE TABLE `diem_danh_chuyen_di`;
SET FOREIGN_KEY_CHECKS = 1;


-- 1. Bảng nguoi_dung (Thêm người dùng với các vai trò khác nhau)
INSERT INTO `nguoi_dung` (`id_nguoi_dung`, `ho_ten`, `ten_tai_khoan`, `mat_khau_bam`, `so_dien_thoai`, `vai_tro`) VALUES
(1, 'Trần Văn Quản Lý', 'quanly01', 'hashed_password_1', '0901112222', 'quan_ly'),
(2, 'Nguyễn Thị Phụ Huynh A', 'phuhuynhA', 'hashed_password_2', '0903334444', 'phu_huynh'),
(3, 'Lê Văn Phụ Huynh B', 'phuhuynhB', 'hashed_password_3', '0905556666', 'phu_huynh'),
(4, 'Phạm Hùng Tài Xế', 'taixe01', 'hashed_password_4', '0987654321', 'tai_xe'),
(5, 'Võ Minh Tài Xế', 'taixe02', 'hashed_password_5', '0912345678', 'tai_xe');

-- 2. Bảng xe_buyt (Thêm thông tin xe buýt)
INSERT INTO `xe_buyt` (`id_xe_buyt`, `bien_so_xe`, `so_ghe`, `mau_xe`, `vi_do_hien_tai`, `kinh_do_hien_tai`) VALUES
(1, '51A-123.45', 29, 'Vàng', 10.7766, 106.6955),
(2, '51B-678.90', 16, 'Xanh', 10.8231, 106.6297);

-- 3. Bảng diem_dung (Thêm các điểm dừng)
INSERT INTO `diem_dung` (`id_diem_dung`, `ten_diem_dung`, `dia_chi`, `vi_do`, `kinh_do`) VALUES
(1, 'Nhà thờ Đức Bà', '01 Công xã Paris, Bến Nghé, Quận 1', 10.7798, 106.6994),
(2, 'Chung cư The Manor', '91 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh', 10.7925, 106.7161),
(3, 'Công viên Hoàng Văn Thụ', 'Đường Hoàng Văn Thụ, Phường 2, Tân Bình', 10.8037, 106.6635),
(4, 'Trường THPT X', '123 Đường ABC, Phường Y, Quận Z', 10.8511, 106.7554);

-- 4. Bảng tuyen_duong (Thêm các tuyến đường)
INSERT INTO `tuyen_duong` (`id_tuyen_duong`, `ten_tuyen_duong`, `mo_ta`) VALUES
(1, 'Tuyến Quận 1 - Bình Thạnh', 'Tuyến đường buổi sáng đón học sinh từ Quận 1 đến trường.'),
(2, 'Tuyến Tân Bình - Trường', 'Tuyến đường buổi chiều trả học sinh về khu vực Tân Bình.');

-- 5. Bảng tuyen_duong_diem_dung (Gán điểm dừng vào tuyến đường theo thứ tự)
INSERT INTO `tuyen_duong_diem_dung` (`id_tuyen_duong`, `id_diem_dung`, `thu_tu_diem_dung`) VALUES
(1, 1, 1), -- Tuyến 1 bắt đầu ở điểm dừng 1
(1, 2, 2), -- Tiếp theo đến điểm dừng 2
(1, 4, 3), -- Cuối cùng là trường học
(2, 4, 1), -- Tuyến 2 bắt đầu ở trường học
(2, 3, 2); -- Trả học sinh ở điểm dừng 3

-- 6. Bảng hoc_sinh (Thêm học sinh và gán phụ huynh, điểm dừng)
INSERT INTO `hoc_sinh` (`id_hoc_sinh`, `id_phu_huynh`, `id_diem_dung`, `ho_ten`, `lop`) VALUES
(1, 2, 1, 'Nguyễn Văn An', '6A1'),
(2, 2, 1, 'Nguyễn Thị Bình', '8A2'),
(3, 3, 2, 'Lê Thị Cẩm', '7A5');

-- 7. Bảng phan_cong_hoc_sinh (Phân công học sinh đi theo tuyến nào)
INSERT INTO `phan_cong_hoc_sinh` (`id_hoc_sinh`, `id_tuyen_duong`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- 8. Bảng lich_trinh (Lập lịch trình cho tài xế, xe và tuyến đường)
INSERT INTO `lich_trinh` (`id_lich_trinh`, `id_tuyen_duong`, `id_xe_buyt`, `id_tai_xe`, `ngay_bat_dau`, `ngay_ket_thuc`, `gio_khoi_hanh`, `loai_lich_trinh`) VALUES
(1, 1, 1, 4, '2025-09-01', '2026-05-31', '06:30:00', 'don_buoi_sang'),
(2, 2, 2, 5, '2025-09-01', '2026-05-31', '16:30:00', 'tra_buoi_chieu');

-- 9. Bảng chuyen_di (Tạo ra các chuyến đi cụ thể từ lịch trình)
INSERT INTO `chuyen_di` (`id_chuyen_di`, `id_lich_trinh`, `trang_thai`, `thoi_gian_bat_dau_thuc_te`) VALUES
(1, 1, 'dang_di', '2025-09-29 06:32:00'),
(2, 2, 'cho_khoi_hanh', NULL);

-- 10. Bảng diem_danh_chuyen_di (Thực hiện điểm danh cho chuyến đi)
INSERT INTO `diem_danh_chuyen_di` (`id_chuyen_di`, `id_hoc_sinh`, `trang_thai`, `thoi_gian`) VALUES
(1, 1, 'da_don', '2025-09-29 06:45:10'),
(1, 3, 'da_don', '2025-09-29 07:05:25'),
(1, 2, 'vang_mat', '2025-09-29 06:45:15');

-- 11. Bảng thong_bao (Gửi một vài thông báo)
INSERT INTO `thong_bao` (`id_nguoi_nhan`, `id_nguoi_gui`, `da_xem`, `thoi_gian`, `tieu_de`, `noi_dung`) VALUES
(2, 1, false, '2025-09-28 22:00:00', 'Thông báo nghỉ lễ', 'Nhà trường thông báo học sinh được nghỉ lễ Quốc Khánh vào ngày 2/9.'),
(4, 1, true, '2025-09-29 08:00:00', 'Lịch bảo dưỡng xe', 'Yêu cầu tài xế Phạm Hùng đưa xe 51A-123.45 đi bảo dưỡng vào cuối tuần.');