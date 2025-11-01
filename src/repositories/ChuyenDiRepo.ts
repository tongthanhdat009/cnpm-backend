import prisma from "../prisma/client";
import { Prisma } from "@prisma/client"; 
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
     * Chuyển tất cả chuyến đi của một tài xế sang tài xế khác
     * @param oldTaiXeId - id tài xế cũ
     * @param newTaiXeId - id tài xế thay thế
     */
    async reassignChuyenDiTaiXe(oldTaiXeId: number, newTaiXeId: number) {
        return await prisma.chuyen_di.updateMany({
            where: { id_tai_xe: oldTaiXeId },
            data: { id_tai_xe: newTaiXeId }
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

    /**
     * Tìm các chuyến đi đã được phân công cho tài xế HOẶC xe buýt
     * trong một ngày cụ thể, và không ở trạng thái "da_huy".
     * @param id_tai_xe ID tài xế
     * @param id_xe_buyt ID xe buýt
     * @param ngay Ngày cần kiểm tra (JS Date object)
     * @returns Danh sách các chuyến đi có khả năng trùng lịch
     */
    async findActiveTripsByDate(id_tai_xe: number,
        id_xe_buyt: number,
        ngay: Date,
        excludeChuyenDiId: number | null) {
        return await prisma.chuyen_di.findMany({
            where: {
                ngay: ngay,
                trang_thai: {
                    not: 'da_huy',
                },
                OR: [
                    { id_tai_xe: id_tai_xe },
                    { id_xe_buyt: id_xe_buyt },
                ],
                id_chuyen_di: excludeChuyenDiId ? { not: excludeChuyenDiId } : undefined,
            },
            include: {
                // Lấy thông tin tuyến đường để biết thời gian dự kiến
                tuyen_duong: {
                    select: {
                        id_tuyen_duong: true,
                        ten_tuyen_duong: true,
                        thoi_gian_du_kien: true,
                    },
                },
                nguoi_dung: { // Để biết ai bị trùng lịch
                    select: { 
                        id_nguoi_dung: true,
                        ho_ten: true }
                },
                xe_buyt: { // Để biết xe nào bị trùng lịch
                    select: { 
                        id_xe_buyt: true,
                        bien_so_xe: true }
                }
            },
        });
    }

    /**
     * Tạo nhiều chuyến đi cùng lúc
     * @param tripsData Mảng dữ liệu các chuyến đi cần tạo
     */
    async createManyChuyenDi(tripsData: Prisma.chuyen_diCreateManyInput[]) {
        return await prisma.chuyen_di.createMany({
            data: tripsData,
            skipDuplicates: false, // Không bỏ qua nếu trùng (để báo lỗi nếu cần)
        });
    }

    /**
     * Cập nhật chuyến đi
     * @param id - ID của chuyến đi
     * @param data - Dữ liệu cập nhật
     * @returns Chuyến đi đã cập nhật
     */
    async updateChuyenDi(id: number, data: any) {
        return await prisma.chuyen_di.update({
            where: { id_chuyen_di: id },
            data: data,
            include: {
                nguoi_dung: {
                    select: {
                        id_nguoi_dung: true,
                        ho_ten: true,
                        so_dien_thoai: true
                    }
                },
                tuyen_duong: {
                    select: {
                        id_tuyen_duong: true,
                        ten_tuyen_duong: true
                    }
                },
                xe_buyt: {
                    select: {
                        id_xe_buyt: true,
                        bien_so_xe: true
                    }
                }
            }
        });
    }

    /**
     * Xóa chuyến đi
     * @param id - ID của chuyến đi
     * @returns Kết quả xóa
     */
    async deleteChuyenDi(id: number) {
        return await prisma.chuyen_di.delete({
            where: { id_chuyen_di: id }
        });
    }
}
