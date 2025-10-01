CREATE TABLE `nguoi_dung` (
  `id_nguoi_dung` INT PRIMARY KEY AUTO_INCREMENT,
  `ho_ten` VARCHAR(100) NOT NULL,
  `ten_tai_khoan` VARCHAR(100) UNIQUE NOT NULL,
  `mat_khau_bam` VARCHAR(255) NOT NULL,
  `so_dien_thoai` VARCHAR(20) UNIQUE,
  `vai_tro` ENUM ('quan_ly', 'phu_huynh', 'tai_xe') NOT NULL,
  `ngay_tao` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `thong_bao` (
  `id_thong_bao` INT PRIMARY KEY AUTO_INCREMENT,
  `id_nguoi_nhan` INT,
  `id_nguoi_gui` INT,
  `da_xem` bool,
  `thoi_gian` datetime,
  `tieu_de` VARCHAR(100) NOT NULL,
  `noi_dung` VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE `hoc_sinh` (
  `id_hoc_sinh` INT PRIMARY KEY AUTO_INCREMENT,
  `id_phu_huynh` INT,
  `id_diem_dung` INT,
  `ho_ten` VARCHAR(100),
  `lop` VARCHAR(10),
  `ghi_chu` TEXT
);

CREATE TABLE `xe_buyt` (
  `id_xe_buyt` INT PRIMARY KEY AUTO_INCREMENT,
  `bien_so_xe` VARCHAR(20) UNIQUE NOT NULL,
  `so_ghe` INT,
  `hang` VARCHAR(50),
  `anh` varchar(255),
  `vi_do_hien_tai` DECIMAL(10,8),
  `kinh_do_hien_tai` DECIMAL(11,8),
  `lan_cap_nhat_cuoi` TIMESTAMP
);

CREATE TABLE `tuyen_duong` (
  `id_tuyen_duong` INT PRIMARY KEY AUTO_INCREMENT,
  `ten_tuyen_duong` VARCHAR(100) NOT NULL,
  `mo_ta` TEXT
);

CREATE TABLE `diem_dung` (
  `id_diem_dung` INT PRIMARY KEY AUTO_INCREMENT,
  `ten_diem_dung` VARCHAR(100) NOT NULL,
  `dia_chi` VARCHAR(255),
  `vi_do` DECIMAL(10,8) NOT NULL,
  `kinh_do` DECIMAL(11,8) NOT NULL
);

CREATE TABLE `tuyen_duong_diem_dung` (
  `id_tuyen_duong_diem_dung` INT PRIMARY KEY AUTO_INCREMENT,
  `id_diem_dung` INT,
  `id_tuyen_duong` INT,
  `thu_tu_diem_dung` INT NOT NULL
);

CREATE TABLE `phan_cong_hoc_sinh` (
  `id_phan_cong` INT PRIMARY KEY AUTO_INCREMENT,
  `id_hoc_sinh` INT,
  `id_tuyen_duong` INT
);

CREATE TABLE `chuyen_di` (
  `id_chuyen_di` INT PRIMARY KEY AUTO_INCREMENT,
  `id_tai_xe` INT,
  `id_tuyen_duong` INT,
  `id_xe_buyt` INT,
  `loai_chuyen_di` varchar(30),
  `gio_khoi_hanh` TIME NOT NULL,
  `ngay` DATE NOT NULL,
  `trang_thai` ENUM ('cho_khoi_hanh', 'dang_di', 'hoan_thanh', 'da_huy', 'bi_tre') DEFAULT 'cho_khoi_hanh',
  `thoi_gian_bat_dau_thuc_te` DATETIME,
  `thoi_gian_ket_thuc_thuc_te` DATETIME
);

CREATE TABLE `diem_danh_chuyen_di` (
  `id_diem_danh` INT PRIMARY KEY AUTO_INCREMENT,
  `id_hoc_sinh` INT,
  `id_chuyen_di` INT,
  `id_diem_dung` INT,
  `trang_thai` ENUM ('da_don', 'da_tra', 'vang_mat') NOT NULL,
  `thoi_gian` DATETIME NOT NULL
);

ALTER TABLE `hoc_sinh` ADD FOREIGN KEY (`id_phu_huynh`) REFERENCES `nguoi_dung` (`id_nguoi_dung`) ON DELETE SET NULL;

ALTER TABLE `tuyen_duong_diem_dung` ADD FOREIGN KEY (`id_tuyen_duong`) REFERENCES `tuyen_duong` (`id_tuyen_duong`) ON DELETE CASCADE;

ALTER TABLE `tuyen_duong_diem_dung` ADD FOREIGN KEY (`id_diem_dung`) REFERENCES `diem_dung` (`id_diem_dung`) ON DELETE CASCADE;

ALTER TABLE `phan_cong_hoc_sinh` ADD FOREIGN KEY (`id_hoc_sinh`) REFERENCES `hoc_sinh` (`id_hoc_sinh`) ON DELETE CASCADE;

ALTER TABLE `phan_cong_hoc_sinh` ADD FOREIGN KEY (`id_tuyen_duong`) REFERENCES `tuyen_duong` (`id_tuyen_duong`) ON DELETE CASCADE;

ALTER TABLE `hoc_sinh` ADD FOREIGN KEY (`id_diem_dung`) REFERENCES `diem_dung` (`id_diem_dung`) ON DELETE CASCADE;

ALTER TABLE `chuyen_di` ADD FOREIGN KEY (`id_tuyen_duong`) REFERENCES `tuyen_duong` (`id_tuyen_duong`);

ALTER TABLE `chuyen_di` ADD FOREIGN KEY (`id_xe_buyt`) REFERENCES `xe_buyt` (`id_xe_buyt`);

ALTER TABLE `chuyen_di` ADD FOREIGN KEY (`id_tai_xe`) REFERENCES `nguoi_dung` (`id_nguoi_dung`);

ALTER TABLE `diem_danh_chuyen_di` ADD FOREIGN KEY (`id_chuyen_di`) REFERENCES `chuyen_di` (`id_chuyen_di`) ON DELETE CASCADE;

ALTER TABLE `diem_danh_chuyen_di` ADD FOREIGN KEY (`id_hoc_sinh`) REFERENCES `hoc_sinh` (`id_hoc_sinh`);

ALTER TABLE `thong_bao` ADD FOREIGN KEY (`id_nguoi_gui`) REFERENCES `nguoi_dung` (`id_nguoi_dung`);

ALTER TABLE `thong_bao` ADD FOREIGN KEY (`id_nguoi_nhan`) REFERENCES `nguoi_dung` (`id_nguoi_dung`);

ALTER TABLE `diem_danh_chuyen_di` ADD FOREIGN KEY (`id_diem_dung`) REFERENCES `diem_dung` (`id_diem_dung`) ON DELETE CASCADE;

