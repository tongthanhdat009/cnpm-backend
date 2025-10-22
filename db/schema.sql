-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2025 lúc 08:02 PM
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem_danh_chuyen_di`
--

CREATE TABLE `diem_danh_chuyen_di` (
  `id_diem_danh` int(11) NOT NULL,
  `id_hoc_sinh` int(11) DEFAULT NULL,
  `id_chuyen_di` int(11) DEFAULT NULL,
  `id_diem_dung` int(11) DEFAULT NULL,
  `trang_thai` enum('da_don','da_tra','vang_mat') NOT NULL,
  `thoi_gian` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_cong_hoc_sinh`
--

CREATE TABLE `phan_cong_hoc_sinh` (
  `id_phan_cong` int(11) NOT NULL,
  `id_hoc_sinh` int(11) DEFAULT NULL,
  `id_tuyen_duong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tuyen_duong`
--

CREATE TABLE `tuyen_duong` (
  `id_tuyen_duong` int(11) NOT NULL,
  `ten_tuyen_duong` varchar(100) NOT NULL,
  `quang_duong` int(11) NOT NULL,
  `thoi_gian_du_kien` int(11) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD UNIQUE KEY `noi_dung` (`noi_dung`),
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
  MODIFY `id_chuyen_di` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `diem_danh_chuyen_di`
--
ALTER TABLE `diem_danh_chuyen_di`
  MODIFY `id_diem_danh` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `diem_dung`
--
ALTER TABLE `diem_dung`
  MODIFY `id_diem_dung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hoc_sinh`
--
ALTER TABLE `hoc_sinh`
  MODIFY `id_hoc_sinh` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `id_nguoi_dung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phan_cong_hoc_sinh`
--
ALTER TABLE `phan_cong_hoc_sinh`
  MODIFY `id_phan_cong` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thong_bao`
--
ALTER TABLE `thong_bao`
  MODIFY `id_thong_bao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tuyen_duong`
--
ALTER TABLE `tuyen_duong`
  MODIFY `id_tuyen_duong` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tuyen_duong_diem_dung`
--
ALTER TABLE `tuyen_duong_diem_dung`
  MODIFY `id_tuyen_duong_diem_dung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `xe_buyt`
--
ALTER TABLE `xe_buyt`
  MODIFY `id_xe_buyt` int(11) NOT NULL AUTO_INCREMENT;

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
