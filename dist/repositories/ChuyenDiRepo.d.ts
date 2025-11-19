import { Prisma } from "@prisma/client";
export declare class ChuyenDiRepository {
    /**
     * Lấy tất cả chuyến đi với đầy đủ thông tin liên quan
     * @returns Danh sách tất cả chuyến đi
     */
    getAllChuyenDi(): Promise<({
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
    })[]>;
    /**
     * Lấy chuyến đi theo ID
     * @param id - ID của chuyến đi
     * @returns Thông tin chuyến đi hoặc null
     */
    getChuyenDiById(id: number): Promise<({
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
    }) | null>;
    /**
     * Lấy chuyến đi theo tài xế
     * @param idTaiXe - ID của tài xế
     * @returns Danh sách chuyến đi
     */
    getChuyenDiByTaiXe(idTaiXe: number): Promise<({
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
    })[]>;
    /**
     * Chuyển tất cả chuyến đi của một tài xế sang tài xế khác
     * @param oldTaiXeId - id tài xế cũ
     * @param newTaiXeId - id tài xế thay thế
     */
    reassignChuyenDiTaiXe(oldTaiXeId: number, newTaiXeId: number): Promise<Prisma.BatchPayload>;
    /**
     * Lấy chuyến đi theo tuyến đường
     * @param idTuyenDuong - ID của tuyến đường
     * @returns Danh sách chuyến đi
     */
    getChuyenDiByTuyenDuong(idTuyenDuong: number): Promise<({
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
    })[]>;
    /**
     * Lấy chuyến đi theo ngày
     * @param ngay - Ngày cần lọc (YYYY-MM-DD)
     * @returns Danh sách chuyến đi
     */
    getChuyenDiByNgay(ngay: Date): Promise<({
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
    })[]>;
    /**
     * Lấy chuyến đi theo trạng thái
     * @param trangThai - Trạng thái chuyến đi
     * @returns Danh sách chuyến đi
     */
    getChuyenDiByTrangThai(trangThai: 'cho_khoi_hanh' | 'dang_di' | 'hoan_thanh' | 'da_huy' | 'bi_tre'): Promise<({
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
    })[]>;
    /**
     * Lấy danh sách chuyến đi của một học sinh
     * @param idHocSinh - ID của học sinh
     * @returns Danh sách chuyến đi có học sinh này
     */
    getChuyenDiByHocSinh(idHocSinh: number): Promise<({
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
    })[]>;
    /**
     * Tìm các chuyến đi đã được phân công cho tài xế HOẶC xe buýt
     * trong một ngày cụ thể, và không ở trạng thái "da_huy".
     * @param id_tai_xe ID tài xế
     * @param id_xe_buyt ID xe buýt
     * @param ngay Ngày cần kiểm tra (JS Date object)
     * @returns Danh sách các chuyến đi có khả năng trùng lịch
     */
    findActiveTripsByDate(id_tai_xe: number, id_xe_buyt: number, ngay: Date, excludeChuyenDiId: number | null): Promise<({
        nguoi_dung: {
            id_nguoi_dung: number;
            ho_ten: string;
        } | null;
        tuyen_duong: {
            id_tuyen_duong: number;
            ten_tuyen_duong: string;
            thoi_gian_du_kien: number | null;
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
    })[]>;
    /**
     * Tạo nhiều chuyến đi cùng lúc
     * @param tripsData Mảng dữ liệu các chuyến đi cần tạo
     */
    createManyChuyenDi(tripsData: Prisma.chuyen_diCreateManyInput[]): Promise<Prisma.BatchPayload>;
    /**
     * Tạo một chuyến đi và tự động tạo điểm danh cho các học sinh trong tuyến
     * @param tripData Dữ liệu chuyến đi
     * @returns Chuyến đi đã tạo với thông tin điểm danh
     */
    createChuyenDiWithAttendance(tripData: any): Promise<({
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
    }) | null>;
    /**
     * Cập nhật chuyến đi
     * @param id - ID của chuyến đi
     * @param data - Dữ liệu cập nhật
     * @returns Chuyến đi đã cập nhật
     */
    updateChuyenDi(id: number, data: any): Promise<{
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
    }>;
    /**
     * Xóa chuyến đi
     * @param id - ID của chuyến đi
     * @returns Kết quả xóa
     */
    deleteChuyenDi(id: number): Promise<{
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
    }>;
    /** Kiểm tra chuyến có bản ghi điểm danh nào đang ở trạng thái 'chua_don' không */
    hasChuaDonAttendance(id_chuyen_di: number): Promise<boolean>;
    /**
     * Cập nhật trạng thái chuyến đi; nếu chuyển sang 'hoan_thanh' thì tự động set
     * tất cả điểm danh của chuyến đó từ 'da_don' -> 'da_tra'.
     */
    updateTrangThai(id: number, trang_thai: 'cho_khoi_hanh' | 'dang_di' | 'hoan_thanh' | 'da_huy' | 'bi_tre'): Promise<{
        updatedTrip: {
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
        updatedAttendanceCount: number;
    } | null>;
    /**
     * Lấy danh sách ID phụ huynh có con trong chuyến đi
     * @param id_chuyen_di - ID của chuyến đi
     * @returns Mảng các ID phụ huynh
     */
    getParentIdsByTripId(id_chuyen_di: number): Promise<number[]>;
}
//# sourceMappingURL=ChuyenDiRepo.d.ts.map