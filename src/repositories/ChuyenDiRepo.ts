import prisma from "../prisma/client";

export class ChuyenDiRepository {
    /**
     * Lấy tất cả chuyến đi với đầy đủ thông tin liên quan
     * @returns Danh sách tất cả chuyến đi
     */
    async getAllChuyenDi() {
        return await prisma.chuyen_di.findMany({
            include: {
                nguoi_dung: {
                    select: {
                        id_nguoi_dung: true,
                        ho_ten: true,
                        so_dien_thoai: true,
                        vai_tro: true
                    }
                },
                tuyen_duong: {
                    select: {
                        id_tuyen_duong: true,
                        ten_tuyen_duong: true,
                        mo_ta: true
                    }
                },
                xe_buyt: {
                    select: {
                        id_xe_buyt: true,
                        bien_so_xe: true,
                        so_ghe: true,
                        hang: true,
                        vi_do_hien_tai: true,
                        kinh_do_hien_tai: true
                    }
                },
                diem_danh_chuyen_di: {
                    include: {
                        hoc_sinh: {
                            select: {
                                id_hoc_sinh: true,
                                ho_ten: true,
                                lop: true
                            }
                        },
                        diem_dung: {
                            select: {
                                id_diem_dung: true,
                                ten_diem_dung: true,
                                dia_chi: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                ngay: 'desc'
            }
        });
    }

    /**
     * Lấy chuyến đi theo ID
     * @param id - ID của chuyến đi
     * @returns Thông tin chuyến đi hoặc null
     */
    async getChuyenDiById(id: number) {
        return await prisma.chuyen_di.findUnique({
            where: { id_chuyen_di: id },
            include: {
                nguoi_dung: {
                    select: {
                        id_nguoi_dung: true,
                        ho_ten: true,
                        so_dien_thoai: true,
                        vai_tro: true
                    }
                },
                tuyen_duong: {
                    select: {
                        id_tuyen_duong: true,
                        ten_tuyen_duong: true,
                        mo_ta: true,
                        tuyen_duong_diem_dung: {
                            include: {
                                diem_dung: true
                            },
                            orderBy: {
                                thu_tu_diem_dung: 'asc'
                            }
                        }
                    }
                },
                xe_buyt: true,
                diem_danh_chuyen_di: {
                    include: {
                        hoc_sinh: true,
                        diem_dung: true
                    }
                }
            }
        });
    }

    /**
     * Lấy chuyến đi theo tài xế
     * @param idTaiXe - ID của tài xế
     * @returns Danh sách chuyến đi
     */
    async getChuyenDiByTaiXe(idTaiXe: number) {
        return await prisma.chuyen_di.findMany({
            where: { id_tai_xe: idTaiXe },
            include: {
                tuyen_duong: true,
                xe_buyt: true
            },
            orderBy: {
                ngay: 'desc'
            }
        });
    }

    /**
     * Lấy chuyến đi theo tuyến đường
     * @param idTuyenDuong - ID của tuyến đường
     * @returns Danh sách chuyến đi
     */
    async getChuyenDiByTuyenDuong(idTuyenDuong: number) {
        return await prisma.chuyen_di.findMany({
            where: { id_tuyen_duong: idTuyenDuong },
            include: {
                nguoi_dung: {
                    select: {
                        ho_ten: true,
                        so_dien_thoai: true
                    }
                },
                xe_buyt: {
                    select: {
                        bien_so_xe: true
                    }
                }
            },
            orderBy: {
                ngay: 'desc'
            }
        });
    }

    /**
     * Lấy chuyến đi theo ngày
     * @param ngay - Ngày cần lọc (YYYY-MM-DD)
     * @returns Danh sách chuyến đi
     */
    async getChuyenDiByNgay(ngay: Date) {
        return await prisma.chuyen_di.findMany({
            where: {
                ngay: ngay
            },
            include: {
                nguoi_dung: {
                    select: {
                        ho_ten: true,
                        so_dien_thoai: true
                    }
                },
                tuyen_duong: {
                    select: {
                        ten_tuyen_duong: true
                    }
                },
                xe_buyt: {
                    select: {
                        bien_so_xe: true
                    }
                }
            },
            orderBy: {
                gio_khoi_hanh: 'asc'
            }
        });
    }

    /**
     * Lấy chuyến đi theo trạng thái
     * @param trangThai - Trạng thái chuyến đi
     * @returns Danh sách chuyến đi
     */
    async getChuyenDiByTrangThai(trangThai: 'cho_khoi_hanh' | 'dang_di' | 'hoan_thanh' | 'da_huy' | 'bi_tre') {
        return await prisma.chuyen_di.findMany({
            where: { trang_thai: trangThai },
            include: {
                nguoi_dung: {
                    select: {
                        ho_ten: true
                    }
                },
                tuyen_duong: {
                    select: {
                        ten_tuyen_duong: true
                    }
                },
                xe_buyt: {
                    select: {
                        bien_so_xe: true
                    }
                }
            },
            orderBy: {
                ngay: 'desc'
            }
        });
    }
}
