import { Prisma } from "@prisma/client";
export declare class ChuyenDiService {
    private chuyenDiRepo;
    private tuyenDuongRepo;
    constructor();
    /**
     * Lấy tất cả chuyến đi
     */
    getAllChuyenDi(): Promise<{
        success: boolean;
        message: string;
        data: ({
            nguoi_dung: {
                id_nguoi_dung: number;
                so_dien_thoai: string | null;
                ho_ten: string;
                vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            } | null;
            tuyen_duong: {
                id_tuyen_duong: number;
                ten_tuyen_duong: string;
                mo_ta: string | null;
            } | null;
            diem_danh_chuyen_di: ({
                hoc_sinh: {
                    ho_ten: string | null;
                    id_hoc_sinh: number;
                    lop: string | null;
                } | null;
                diem_dung: {
                    id_diem_dung: number;
                    ten_diem_dung: string;
                    dia_chi: string | null;
                } | null;
            } & {
                id_diem_dung: number | null;
                id_hoc_sinh: number | null;
                trang_thai: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
                id_chuyen_di: number | null;
                id_diem_danh: number;
                thoi_gian: Date;
            })[];
            xe_buyt: {
                id_xe_buyt: number;
                bien_so_xe: string;
                so_ghe: number | null;
                hang: string | null;
                vi_do_hien_tai: Prisma.Decimal | null;
                kinh_do_hien_tai: Prisma.Decimal | null;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        })[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    /**
     * Lấy chuyến đi theo ID
     */
    getChuyenDiById(id: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            nguoi_dung: {
                id_nguoi_dung: number;
                so_dien_thoai: string | null;
                ho_ten: string;
                vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            } | null;
            tuyen_duong: {
                id_tuyen_duong: number;
                ten_tuyen_duong: string;
                mo_ta: string | null;
                tuyen_duong_diem_dung: ({
                    diem_dung: {
                        id_diem_dung: number;
                        ten_diem_dung: string;
                        dia_chi: string | null;
                        vi_do: Prisma.Decimal;
                        kinh_do: Prisma.Decimal;
                    } | null;
                } & {
                    id_tuyen_duong: number | null;
                    id_tuyen_duong_diem_dung: number;
                    id_diem_dung: number | null;
                    thu_tu_diem_dung: number;
                })[];
            } | null;
            diem_danh_chuyen_di: ({
                hoc_sinh: {
                    ho_ten: string | null;
                    id_diem_dung: number | null;
                    id_hoc_sinh: number;
                    id_phu_huynh: number | null;
                    lop: string | null;
                    ghi_chu: string | null;
                } | null;
                diem_dung: {
                    id_diem_dung: number;
                    ten_diem_dung: string;
                    dia_chi: string | null;
                    vi_do: Prisma.Decimal;
                    kinh_do: Prisma.Decimal;
                } | null;
            } & {
                id_diem_dung: number | null;
                id_hoc_sinh: number | null;
                trang_thai: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
                id_chuyen_di: number | null;
                id_diem_danh: number;
                thoi_gian: Date;
            })[];
            xe_buyt: {
                id_xe_buyt: number;
                bien_so_xe: string;
                so_ghe: number | null;
                hang: string | null;
                anh: string | null;
                vi_do_hien_tai: Prisma.Decimal | null;
                kinh_do_hien_tai: Prisma.Decimal | null;
                lan_cap_nhat_cuoi: Date;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    /**
     * Lấy chuyến đi theo tài xế
     */
    getChuyenDiByTaiXe(idTaiXe: number): Promise<{
        success: boolean;
        message: string;
        data: ({
            tuyen_duong: {
                isDelete: boolean;
                id_tuyen_duong: number;
                ten_tuyen_duong: string;
                quang_duong: number;
                thoi_gian_du_kien: number | null;
                mo_ta: string | null;
            } | null;
            xe_buyt: {
                id_xe_buyt: number;
                bien_so_xe: string;
                so_ghe: number | null;
                hang: string | null;
                anh: string | null;
                vi_do_hien_tai: Prisma.Decimal | null;
                kinh_do_hien_tai: Prisma.Decimal | null;
                lan_cap_nhat_cuoi: Date;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        })[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    /**
     * Lấy chuyến đi theo tuyến đường
     */
    getChuyenDiByTuyenDuong(idTuyenDuong: number): Promise<{
        success: boolean;
        message: string;
        data: ({
            nguoi_dung: {
                so_dien_thoai: string | null;
                ho_ten: string;
            } | null;
            xe_buyt: {
                bien_so_xe: string;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        })[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    /**
     * Lấy chuyến đi theo ngày
     */
    getChuyenDiByNgay(ngay: Date): Promise<{
        success: boolean;
        message: string;
        data: ({
            nguoi_dung: {
                so_dien_thoai: string | null;
                ho_ten: string;
            } | null;
            tuyen_duong: {
                ten_tuyen_duong: string;
            } | null;
            xe_buyt: {
                bien_so_xe: string;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        })[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    /**
     * Lấy chuyến đi theo trạng thái
     */
    getChuyenDiByTrangThai(trangThai: 'cho_khoi_hanh' | 'dang_di' | 'hoan_thanh' | 'da_huy' | 'bi_tre'): Promise<{
        success: boolean;
        message: string;
        data: ({
            nguoi_dung: {
                ho_ten: string;
            } | null;
            tuyen_duong: {
                ten_tuyen_duong: string;
            } | null;
            xe_buyt: {
                bien_so_xe: string;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        })[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    /**
     * Lấy danh sách chuyến đi của một học sinh
     */
    getChuyenDiByHocSinh(idHocSinh: number): Promise<{
        success: boolean;
        message: string;
        data: ({
            nguoi_dung: {
                id_nguoi_dung: number;
                so_dien_thoai: string | null;
                ho_ten: string;
                vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            } | null;
            tuyen_duong: {
                id_tuyen_duong: number;
                ten_tuyen_duong: string;
                mo_ta: string | null;
                tuyen_duong_diem_dung: ({
                    diem_dung: {
                        id_diem_dung: number;
                        ten_diem_dung: string;
                        dia_chi: string | null;
                        vi_do: Prisma.Decimal;
                        kinh_do: Prisma.Decimal;
                    } | null;
                } & {
                    id_tuyen_duong: number | null;
                    id_tuyen_duong_diem_dung: number;
                    id_diem_dung: number | null;
                    thu_tu_diem_dung: number;
                })[];
            } | null;
            diem_danh_chuyen_di: ({
                hoc_sinh: {
                    ho_ten: string | null;
                    id_hoc_sinh: number;
                    lop: string | null;
                } | null;
                diem_dung: {
                    id_diem_dung: number;
                    ten_diem_dung: string;
                    dia_chi: string | null;
                    vi_do: Prisma.Decimal;
                    kinh_do: Prisma.Decimal;
                } | null;
            } & {
                id_diem_dung: number | null;
                id_hoc_sinh: number | null;
                trang_thai: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
                id_chuyen_di: number | null;
                id_diem_danh: number;
                thoi_gian: Date;
            })[];
            xe_buyt: {
                id_xe_buyt: number;
                bien_so_xe: string;
                so_ghe: number | null;
                hang: string | null;
                vi_do_hien_tai: Prisma.Decimal | null;
                kinh_do_hien_tai: Prisma.Decimal | null;
                lan_cap_nhat_cuoi: Date;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        })[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    private checkScheduleConflict;
    /**
     * Tạo lịch trình lặp lại
     */
    createRecurringChuyenDi(data: any): Promise<{
        success: boolean;
        message: string;
        errors?: undefined;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        errors: ({
            ngay: string | undefined;
            conflict_with_trip_id: number;
            reason: string;
        } | {
            ngay: Date;
            reason: string | undefined;
        } | undefined)[];
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            count: number;
            trips: (({
                nguoi_dung: {
                    id_nguoi_dung: number;
                    so_dien_thoai: string | null;
                    ho_ten: string;
                } | null;
                tuyen_duong: {
                    id_tuyen_duong: number;
                    ten_tuyen_duong: string;
                } | null;
                diem_danh_chuyen_di: ({
                    hoc_sinh: {
                        ho_ten: string | null;
                        id_hoc_sinh: number;
                        lop: string | null;
                    } | null;
                    diem_dung: {
                        id_diem_dung: number;
                        ten_diem_dung: string;
                    } | null;
                } & {
                    id_diem_dung: number | null;
                    id_hoc_sinh: number | null;
                    trang_thai: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
                    id_chuyen_di: number | null;
                    id_diem_danh: number;
                    thoi_gian: Date;
                })[];
                xe_buyt: {
                    id_xe_buyt: number;
                    bien_so_xe: string;
                } | null;
            } & {
                id_tuyen_duong: number | null;
                trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
                id_chuyen_di: number;
                id_tai_xe: number | null;
                id_xe_buyt: number | null;
                loai_chuyen_di: string | null;
                gio_khoi_hanh: Date;
                ngay: Date;
                thoi_gian_bat_dau_thuc_te: Date | null;
                thoi_gian_ket_thuc_thuc_te: Date | null;
            }) | null)[];
        };
        errors?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        errors?: undefined;
        data?: undefined;
    }>;
    /**
     * Cập nhật chuyến đi (ĐÃ CẬP NHẬT)
     */
    updateChuyenDi(id: number, data: any): Promise<{
        success: boolean;
        message: string;
        errors?: undefined;
    } | {
        success: boolean;
        message: string;
        errors: {
            ngay: string | undefined;
            conflict_with_trip_id: number;
            reason: string;
        }[];
    } | {
        success: boolean;
        message?: undefined;
        errors?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            nguoi_dung: {
                id_nguoi_dung: number;
                so_dien_thoai: string | null;
                ho_ten: string;
            } | null;
            tuyen_duong: {
                id_tuyen_duong: number;
                ten_tuyen_duong: string;
            } | null;
            xe_buyt: {
                id_xe_buyt: number;
                bien_so_xe: string;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            id_xe_buyt: number | null;
            loai_chuyen_di: string | null;
            gio_khoi_hanh: Date;
            ngay: Date;
            thoi_gian_bat_dau_thuc_te: Date | null;
            thoi_gian_ket_thuc_thuc_te: Date | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteChuyenDi(id: number): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    /**
     * Cập nhật trạng thái chuyến đi. Nếu đặt về 'hoan_thanh', tự động đổi các điểm danh 'da_don' => 'da_tra'.
     */
    updateTrangThai(id: number, trang_thai: 'cho_khoi_hanh' | 'dang_di' | 'hoan_thanh' | 'da_huy' | 'bi_tre'): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            chuyen_di: {
                id_tuyen_duong: number | null;
                trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
                id_chuyen_di: number;
                id_tai_xe: number | null;
                id_xe_buyt: number | null;
                loai_chuyen_di: string | null;
                gio_khoi_hanh: Date;
                ngay: Date;
                thoi_gian_bat_dau_thuc_te: Date | null;
                thoi_gian_ket_thuc_thuc_te: Date | null;
            };
            autoUpdatedAttendance: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    /**
     * Gửi cảnh báo sự cố cho phụ huynh có con trong chuyến đi
     */
    sendIncidentWarning(id: number, incidentData: {
        noi_dung: string;
    }, senderId?: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            parent_count: number;
            sent_count: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=ChuyenDiService.d.ts.map