-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 29, 2025 lúc 08:08 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ssb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyen_di`
--

CREATE TABLE `chuyen_di` (
  `id_chuyen_di` int(11) NOT NULL,
  `id_tai_xe` int(11) DEFAULT NULL,
  `id_tuyen_duong` int(11) DEFAULT NULL,
  `id_xe_buyt` int(11) DEFAULT NULL,
  `loai_chuyen_di` varchar(30) DEFAULT NULL,
  `gio_khoi_hanh` time NOT NULL,
  `ngay` date NOT NULL,
  `trang_thai` enum('cho_khoi_hanh','dang_di','hoan_thanh','da_huy','bi_tre') DEFAULT 'cho_khoi_hanh',
  `thoi_gian_bat_dau_thuc_te` datetime DEFAULT NULL,
  `thoi_gian_ket_thuc_thuc_te` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyen_di`
--

INSERT INTO `chuyen_di` (`id_chuyen_di`, `id_tai_xe`, `id_tuyen_duong`, `id_xe_buyt`, `loai_chuyen_di`, `gio_khoi_hanh`, `ngay`, `trang_thai`, `thoi_gian_bat_dau_thuc_te`, `thoi_gian_ket_thuc_thuc_te`) VALUES
(1, 4, 2, 1, 'don_hoc_sinh', '06:30:00', '2025-10-17', 'hoan_thanh', '2025-10-17 06:32:00', '2025-10-17 07:15:00'),
(3, 5, 2, 2, 'don_hoc_sinh', '06:45:00', '2025-10-17', 'dang_di', '2025-10-17 06:45:00', NULL),
(4, 5, 1, 2, 'don_hoc_sinh', '16:45:00', '2025-10-17', 'cho_khoi_hanh', NULL, NULL),
(5, 4, 13, 1, 'don', '23:44:00', '2025-10-28', 'hoan_thanh', NULL, NULL),
(7, 4, 14, 1, 'don', '18:00:00', '2025-11-03', 'da_huy', NULL, NULL),
(8, 4, 14, 1, 'don', '18:00:00', '2025-11-04', 'cho_khoi_hanh', NULL, NULL),
(9, 4, 14, 1, 'don', '18:00:00', '2025-11-05', 'cho_khoi_hanh', NULL, NULL),
(10, 4, 14, 1, 'don', '18:00:00', '2025-11-06', 'cho_khoi_hanh', NULL, NULL),
(11, 4, 14, 1, 'don', '18:00:00', '2025-11-07', 'cho_khoi_hanh', NULL, NULL),
(12, 4, 14, 1, 'don', '18:00:00', '2025-11-08', 'cho_khoi_hanh', NULL, NULL),
(13, 4, 14, 1, 'don', '18:00:00', '2025-11-09', 'cho_khoi_hanh', NULL, NULL),
(14, 4, 14, 1, 'don', '14:06:00', '2025-10-30', 'cho_khoi_hanh', NULL, NULL),
(15, 4, 14, 1, 'don', '14:06:00', '2025-10-31', 'cho_khoi_hanh', NULL, NULL),
(16, 4, 14, 1, 'don', '14:06:00', '2025-11-01', 'cho_khoi_hanh', NULL, NULL),
(17, 4, 14, 1, 'don', '14:06:00', '2025-11-02', 'cho_khoi_hanh', NULL, NULL),
(18, 4, 14, 1, 'don', '14:06:00', '2025-11-03', 'cho_khoi_hanh', NULL, NULL),
(19, 4, 14, 1, 'don', '14:06:00', '2025-11-04', 'cho_khoi_hanh', NULL, NULL),
(20, 4, 14, 1, 'don', '14:06:00', '2025-11-05', 'cho_khoi_hanh', NULL, NULL),
(21, 4, 14, 1, 'don', '14:06:00', '2025-11-06', 'cho_khoi_hanh', NULL, NULL),
(22, 4, 14, 1, 'don', '14:06:00', '2025-11-07', 'cho_khoi_hanh', NULL, NULL),
(23, 4, 14, 1, 'don', '14:06:00', '2025-11-08', 'cho_khoi_hanh', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem_danh_chuyen_di`
--

CREATE TABLE `diem_danh_chuyen_di` (
  `id_diem_danh` int(11) NOT NULL,
  `id_hoc_sinh` int(11) DEFAULT NULL,
  `id_chuyen_di` int(11) DEFAULT NULL,
  `id_diem_dung` int(11) DEFAULT NULL,
  `trang_thai` enum('da_don','da_tra','vang_mat','chua_don') NOT NULL,
  `thoi_gian` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `diem_danh_chuyen_di`
--

INSERT INTO `diem_danh_chuyen_di` (`id_diem_danh`, `id_hoc_sinh`, `id_chuyen_di`, `id_diem_dung`, `trang_thai`, `thoi_gian`) VALUES
(14, 2, 5, 2, 'da_don', '2025-10-28 15:45:08'),
(31, 4, 7, 5, 'chua_don', '2025-10-28 15:51:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem_dung`
--

CREATE TABLE `diem_dung` (
  `id_diem_dung` int(11) NOT NULL,
  `ten_diem_dung` varchar(100) NOT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `vi_do` decimal(10,8) NOT NULL,
  `kinh_do` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `diem_dung`
--

INSERT INTO `diem_dung` (`id_diem_dung`, `ten_diem_dung`, `dia_chi`, `vi_do`, `kinh_do`) VALUES
(0, 'Đại học Sài Gòn', 'An Dương Vương, P.2, Q.5, TP.HCM', 10.76067657, 106.68242831),
(1, 'Đại học Sài Gòn', 'An Dương Vương, P.2, Q.5, TP.HCM', 10.76067657, 106.68242831),
(2, 'Công viên Lê Văn Tám', 'Hai Bà Trưng, Đa Kao, Q.1, TP.HCM', 10.78980000, 106.69230000),
(3, 'THPT Nam Kỳ Khởi Nghĩa', 'Đ. 3/2, P.16, Q.11, TP.HCM', 10.75862327, 106.65055088),
(4, 'Landmark 81', '720A Điện Biên Phủ, Bình Thạnh, TP.HCM', 10.79510000, 106.72190000),
(5, 'Đại học HUTECH', '475A Điện Biên Phủ, Bình Thạnh, TP.HCM', 10.79740000, 106.70370000),
(6, 'Vòng xoay Hàng Xanh', 'Phường 25, Bình Thạnh, TP.HCM', 10.79940000, 106.70820000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoc_sinh`
--

CREATE TABLE `hoc_sinh` (
  `id_hoc_sinh` int(11) NOT NULL,
  `id_phu_huynh` int(11) DEFAULT NULL,
  `id_diem_dung` int(11) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `lop` varchar(10) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoc_sinh`
--

INSERT INTO `hoc_sinh` (`id_hoc_sinh`, `id_phu_huynh`, `id_diem_dung`, `ho_ten`, `lop`, `ghi_chu`) VALUES
(1, 2, 4, 'Nguyễn Hoàng Gia An', '1A', 'Dị ứng với đậu phộng'),
(2, 2, 2, 'Nguyễn Hoàng Gia Bảo', '3B', ''),
(3, 3, 4, 'Lê Tuệ Nhi', '2C', ''),
(4, 3, 5, 'Lê Tuấn Khang', '5A', 'Say xe nhẹ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `id_nguoi_dung` int(11) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `ten_tai_khoan` varchar(100) NOT NULL,
  `mat_khau_bam` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `vai_tro` enum('quan_ly','phu_huynh','tai_xe') NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`id_nguoi_dung`, `ho_ten`, `ten_tai_khoan`, `mat_khau_bam`, `so_dien_thoai`, `vai_tro`, `ngay_tao`) VALUES
(1, 'Trần Văn An', 'admin', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0901112222', 'quan_ly', '2025-10-22 18:13:58'),
(2, 'Nguyễn Thị Bình', 'phuhuynh_binh', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0912345678', 'phu_huynh', '2025-10-22 18:13:58'),
(3, 'Lê Minh Cường', 'phuhuynh_cuong', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0987654321', 'phu_huynh', '2025-10-22 18:13:58'),
(4, 'Phạm Văn Dũng', 'taixe_dung', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0905556677', 'tai_xe', '2025-10-22 18:13:58'),
(5, 'Võ Thị Em', 'taixe_em', '$2b$10$PnZjYxZ9FdvLkcnQs6MIDOf2w0mkMoVueUQS95G57pUq8tng0Ufhu', '0908889900', 'tai_xe', '2025-10-22 18:13:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_cong_hoc_sinh`
--

CREATE TABLE `phan_cong_hoc_sinh` (
  `id_phan_cong` int(11) NOT NULL,
  `id_hoc_sinh` int(11) DEFAULT NULL,
  `id_tuyen_duong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phan_cong_hoc_sinh`
--

INSERT INTO `phan_cong_hoc_sinh` (`id_phan_cong`, `id_hoc_sinh`, `id_tuyen_duong`) VALUES
(26, 2, 13);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_bao`
--

CREATE TABLE `thong_bao` (
  `id_thong_bao` int(11) NOT NULL,
  `id_nguoi_nhan` int(11) DEFAULT NULL,
  `id_nguoi_gui` int(11) DEFAULT NULL,
  `da_xem` tinyint(1) DEFAULT NULL,
  `thoi_gian` datetime DEFAULT NULL,
  `tieu_de` varchar(100) NOT NULL,
  `noi_dung` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thong_bao`
--

INSERT INTO `thong_bao` (`id_thong_bao`, `id_nguoi_nhan`, `id_nguoi_gui`, `da_xem`, `thoi_gian`, `tieu_de`, `noi_dung`) VALUES
(1, 2, 1, 0, '2025-10-16 17:00:00', 'Thông báo nghỉ lễ', 'Học sinh được nghỉ lễ vào ngày 30/10/2025.'),
(2, 3, 5, 1, '2025-10-17 06:50:00', 'Xe đến trễ', 'Xe buýt tuyến Bình Thạnh dự kiến đến trễ 10 phút.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tuyen_duong`
--

CREATE TABLE `tuyen_duong` (
  `id_tuyen_duong` int(11) NOT NULL,
  `ten_tuyen_duong` varchar(100) NOT NULL,
  `quang_duong` int(11) NOT NULL,
  `thoi_gian_du_kien` int(11) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tuyen_duong`
--

INSERT INTO `tuyen_duong` (`id_tuyen_duong`, `ten_tuyen_duong`, `quang_duong`, `thoi_gian_du_kien`, `mo_ta`, `isDelete`) VALUES
(1, 'Tuyến Quận 1 1', 9257, 31, 'Tuyến qua trung tâm Quận 1, Quận 5.', 0),
(2, 'Tuyến Bình Thạnh', 13200, 41, 'Tuyến đi qua khu vực Bình Thạnh, Landmark 81.', 0),
(13, 'Test*', 9257, 31, '123', 1),
(14, 'Test', 33759, 104, '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tuyen_duong_diem_dung`
--

CREATE TABLE `tuyen_duong_diem_dung` (
  `id_tuyen_duong_diem_dung` int(11) NOT NULL,
  `id_diem_dung` int(11) DEFAULT NULL,
  `id_tuyen_duong` int(11) DEFAULT NULL,
  `thu_tu_diem_dung` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tuyen_duong_diem_dung`
--

INSERT INTO `tuyen_duong_diem_dung` (`id_tuyen_duong_diem_dung`, `id_diem_dung`, `id_tuyen_duong`, `thu_tu_diem_dung`) VALUES
(4, 0, 2, 1),
(5, 6, 2, 2),
(6, 1, 2, 3),
(55, 0, 1, 1),
(56, 2, 1, 2),
(57, 1, 1, 3),
(58, 0, 13, 1),
(59, 2, 13, 2),
(60, 1, 13, 3),
(61, 0, 14, 1),
(62, 2, 14, 2),
(63, 3, 14, 3),
(64, 4, 14, 4),
(65, 5, 14, 5),
(66, 6, 14, 6),
(67, 1, 14, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xe_buyt`
--

CREATE TABLE `xe_buyt` (
  `id_xe_buyt` int(11) NOT NULL,
  `bien_so_xe` varchar(20) NOT NULL,
  `so_ghe` int(11) DEFAULT NULL,
  `hang` varchar(50) DEFAULT NULL,
  `anh` varchar(255) DEFAULT NULL,
  `vi_do_hien_tai` decimal(10,8) DEFAULT NULL,
  `kinh_do_hien_tai` decimal(11,8) DEFAULT NULL,
  `lan_cap_nhat_cuoi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `xe_buyt`
--

INSERT INTO `xe_buyt` (`id_xe_buyt`, `bien_so_xe`, `so_ghe`, `hang`, `anh`, `vi_do_hien_tai`, `kinh_do_hien_tai`, `lan_cap_nhat_cuoi`) VALUES
(1, '51B-123.45', 29, 'Hyundai', 'https://example.com/images/bus1.jpg', 10.77690000, 106.70090000, '2025-10-22 18:13:58'),
(2, '51B-678.90', 16, 'Ford', 'https://example.com/images/bus2.jpg', 10.82310000, 106.62970000, '2025-10-22 18:13:58');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chuyen_di`
--
ALTER TABLE `chuyen_di`
  ADD PRIMARY KEY (`id_chuyen_di`),
  ADD KEY `id_tuyen_duong` (`id_tuyen_duong`),
  ADD KEY `id_xe_buyt` (`id_xe_buyt`),
  ADD KEY `id_tai_xe` (`id_tai_xe`);

--
-- Chỉ mục cho bảng `diem_danh_chuyen_di`
--
ALTER TABLE `diem_danh_chuyen_di`
  ADD PRIMARY KEY (`id_diem_danh`),
  ADD KEY `id_chuyen_di` (`id_chuyen_di`),
  ADD KEY `id_hoc_sinh` (`id_hoc_sinh`),
  ADD KEY `id_diem_dung` (`id_diem_dung`);

--
-- Chỉ mục cho bảng `diem_dung`
--
ALTER TABLE `diem_dung`
  ADD PRIMARY KEY (`id_diem_dung`);

--
-- Chỉ mục cho bảng `hoc_sinh`
--
ALTER TABLE `hoc_sinh`
  ADD PRIMARY KEY (`id_hoc_sinh`),
  ADD KEY `id_phu_huynh` (`id_phu_huynh`),
  ADD KEY `id_diem_dung` (`id_diem_dung`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`id_nguoi_dung`),
  ADD UNIQUE KEY `ten_tai_khoan` (`ten_tai_khoan`),
  ADD UNIQUE KEY `so_dien_thoai` (`so_dien_thoai`);

--
-- Chỉ mục cho bảng `phan_cong_hoc_sinh`
--
ALTER TABLE `phan_cong_hoc_sinh`
  ADD PRIMARY KEY (`id_phan_cong`),
  ADD KEY `id_hoc_sinh` (`id_hoc_sinh`),
  ADD KEY `id_tuyen_duong` (`id_tuyen_duong`);

--
-- Chỉ mục cho bảng `thong_bao`
--
ALTER TABLE `thong_bao`
  ADD PRIMARY KEY (`id_thong_bao`),
  ADD KEY `id_nguoi_gui` (`id_nguoi_gui`),
  ADD KEY `id_nguoi_nhan` (`id_nguoi_nhan`);

--
-- Chỉ mục cho bảng `tuyen_duong`
--
ALTER TABLE `tuyen_duong`
  ADD PRIMARY KEY (`id_tuyen_duong`);

--
-- Chỉ mục cho bảng `tuyen_duong_diem_dung`
--
ALTER TABLE `tuyen_duong_diem_dung`
  ADD PRIMARY KEY (`id_tuyen_duong_diem_dung`),
  ADD KEY `id_tuyen_duong` (`id_tuyen_duong`),
  ADD KEY `id_diem_dung` (`id_diem_dung`);

--
-- Chỉ mục cho bảng `xe_buyt`
--
ALTER TABLE `xe_buyt`
  ADD PRIMARY KEY (`id_xe_buyt`),
  ADD UNIQUE KEY `bien_so_xe` (`bien_so_xe`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chuyen_di`
--
ALTER TABLE `chuyen_di`
  MODIFY `id_chuyen_di` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `diem_danh_chuyen_di`
--
ALTER TABLE `diem_danh_chuyen_di`
  MODIFY `id_diem_danh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `diem_dung`
--
ALTER TABLE `diem_dung`
  MODIFY `id_diem_dung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `hoc_sinh`
--
ALTER TABLE `hoc_sinh`
  MODIFY `id_hoc_sinh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `id_nguoi_dung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `phan_cong_hoc_sinh`
--
ALTER TABLE `phan_cong_hoc_sinh`
  MODIFY `id_phan_cong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `thong_bao`
--
ALTER TABLE `thong_bao`
  MODIFY `id_thong_bao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tuyen_duong`
--
ALTER TABLE `tuyen_duong`
  MODIFY `id_tuyen_duong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `tuyen_duong_diem_dung`
--
ALTER TABLE `tuyen_duong_diem_dung`
  MODIFY `id_tuyen_duong_diem_dung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `xe_buyt`
--
ALTER TABLE `xe_buyt`
  MODIFY `id_xe_buyt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chuyen_di`
--
ALTER TABLE `chuyen_di`
  ADD CONSTRAINT `chuyen_di_ibfk_1` FOREIGN KEY (`id_tuyen_duong`) REFERENCES `tuyen_duong` (`id_tuyen_duong`),
  ADD CONSTRAINT `chuyen_di_ibfk_2` FOREIGN KEY (`id_xe_buyt`) REFERENCES `xe_buyt` (`id_xe_buyt`),
  ADD CONSTRAINT `chuyen_di_ibfk_3` FOREIGN KEY (`id_tai_xe`) REFERENCES `nguoi_dung` (`id_nguoi_dung`);

--
-- Các ràng buộc cho bảng `diem_danh_chuyen_di`
--
ALTER TABLE `diem_danh_chuyen_di`
  ADD CONSTRAINT `diem_danh_chuyen_di_ibfk_1` FOREIGN KEY (`id_chuyen_di`) REFERENCES `chuyen_di` (`id_chuyen_di`) ON DELETE CASCADE,
  ADD CONSTRAINT `diem_danh_chuyen_di_ibfk_2` FOREIGN KEY (`id_hoc_sinh`) REFERENCES `hoc_sinh` (`id_hoc_sinh`),
  ADD CONSTRAINT `diem_danh_chuyen_di_ibfk_3` FOREIGN KEY (`id_diem_dung`) REFERENCES `diem_dung` (`id_diem_dung`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `hoc_sinh`
--
ALTER TABLE `hoc_sinh`
  ADD CONSTRAINT `hoc_sinh_ibfk_1` FOREIGN KEY (`id_phu_huynh`) REFERENCES `nguoi_dung` (`id_nguoi_dung`) ON DELETE SET NULL,
  ADD CONSTRAINT `hoc_sinh_ibfk_2` FOREIGN KEY (`id_diem_dung`) REFERENCES `diem_dung` (`id_diem_dung`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `phan_cong_hoc_sinh`
--
ALTER TABLE `phan_cong_hoc_sinh`
  ADD CONSTRAINT `phan_cong_hoc_sinh_ibfk_1` FOREIGN KEY (`id_hoc_sinh`) REFERENCES `hoc_sinh` (`id_hoc_sinh`) ON DELETE CASCADE,
  ADD CONSTRAINT `phan_cong_hoc_sinh_ibfk_2` FOREIGN KEY (`id_tuyen_duong`) REFERENCES `tuyen_duong` (`id_tuyen_duong`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `thong_bao`
--
ALTER TABLE `thong_bao`
  ADD CONSTRAINT `thong_bao_ibfk_1` FOREIGN KEY (`id_nguoi_gui`) REFERENCES `nguoi_dung` (`id_nguoi_dung`),
  ADD CONSTRAINT `thong_bao_ibfk_2` FOREIGN KEY (`id_nguoi_nhan`) REFERENCES `nguoi_dung` (`id_nguoi_dung`);

--
-- Các ràng buộc cho bảng `tuyen_duong_diem_dung`
--
ALTER TABLE `tuyen_duong_diem_dung`
  ADD CONSTRAINT `tuyen_duong_diem_dung_ibfk_1` FOREIGN KEY (`id_tuyen_duong`) REFERENCES `tuyen_duong` (`id_tuyen_duong`) ON DELETE CASCADE,
  ADD CONSTRAINT `tuyen_duong_diem_dung_ibfk_2` FOREIGN KEY (`id_diem_dung`) REFERENCES `diem_dung` (`id_diem_dung`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
