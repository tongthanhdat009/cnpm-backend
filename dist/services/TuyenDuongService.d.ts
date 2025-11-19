export declare class TuyenDuongService {
    private repo;
    constructor();
    getAll(): Promise<{
        phan_cong_hoc_sinh: (number | null)[];
        is_use: boolean;
        _count: {
            chuyen_di: number;
        };
        id_tuyen_duong: number;
        ten_tuyen_duong: string;
        quang_duong: number;
        thoi_gian_du_kien: number | null;
        mo_ta: string | null;
        tuyen_duong_diem_dung: {
            id_diem_dung: number | null;
            thu_tu_diem_dung: number;
        }[];
    }[]>;
    create(data: any): Promise<{
        id_tuyen_duong: number;
        ten_tuyen_duong: string;
        quang_duong: number;
        thoi_gian_du_kien: number | null;
        mo_ta: string | null;
        tuyen_duong_diem_dung: {
            so_thu_tu: number;
            id_diem_dung: number;
        }[];
    }>;
    private validateTuyenDuong;
    getTuyenDuongById(id: number): Promise<({
        tuyen_duong_diem_dung: ({
            diem_dung: {
                id_diem_dung: number;
                ten_diem_dung: string;
                dia_chi: string | null;
                vi_do: import("@prisma/client/runtime/library").Decimal;
                kinh_do: import("@prisma/client/runtime/library").Decimal;
            } | null;
        } & {
            id_tuyen_duong: number | null;
            id_tuyen_duong_diem_dung: number;
            id_diem_dung: number | null;
            thu_tu_diem_dung: number;
        })[];
    } & {
        isDelete: boolean;
        id_tuyen_duong: number;
        ten_tuyen_duong: string;
        quang_duong: number;
        thoi_gian_du_kien: number | null;
        mo_ta: string | null;
    }) | null>;
    deleteTuyenDuong(id_tuyen_duong: number): Promise<{
        type: "not_found";
        deletedTrips: number;
    } | {
        type: "soft";
        deletedTrips: number;
    } | {
        type: "hard";
        deletedTrips: number;
    }>;
    update(data: any): Promise<{
        type: "not_found";
        record?: undefined;
    } | {
        type: "updated";
        record: ({
            tuyen_duong_diem_dung: {
                id_tuyen_duong: number | null;
                id_tuyen_duong_diem_dung: number;
                id_diem_dung: number | null;
                thu_tu_diem_dung: number;
            }[];
        } & {
            isDelete: boolean;
            id_tuyen_duong: number;
            ten_tuyen_duong: string;
            quang_duong: number;
            thoi_gian_du_kien: number | null;
            mo_ta: string | null;
        }) | null;
    }>;
    assignHocSinhToTuyen(id_tuyen_duong: number, id_hoc_sinh: number): Promise<{
        type: "not_found_tuyen";
        record?: undefined;
    } | {
        type: "not_found_hoc_sinh";
        record?: undefined;
    } | {
        type: "existed";
        record?: undefined;
    } | {
        type: "created";
        record: {
            id_tuyen_duong: number | null;
            id_phan_cong: number;
            id_hoc_sinh: number | null;
        };
    }>;
    removeHocSinhFromTuyen(id_tuyen_duong: number, id_hoc_sinh: number): Promise<{
        type: "not_found";
        deletedAttendance: number;
        deletedCount?: undefined;
    } | {
        type: "deleted";
        deletedCount: number;
        deletedAttendance: number;
    }>;
    /**
     * Tính toán thời lượng di chuyển dự kiến của một tuyến đường
     * @param {number} id_tuyen_duong - ID của tuyến đường
     * @returns {number} - Thời lượng dự kiến (phút)
     */
    getThoiLuongDuKien(id_tuyen_duong: number): Promise<{
        id_tuyen_duong: number;
        ten_tuyen_duong: string;
        thoi_luong_phut: number;
        thoi_luong_giay: any;
        khoang_cach_met: any;
        so_diem_dung: number;
        error?: undefined;
    } | {
        id_tuyen_duong: number;
        ten_tuyen_duong: string;
        thoi_luong_phut: null;
        thoi_luong_giay: null;
        khoang_cach_met: null;
        so_diem_dung: number;
        error: any;
    }>;
}
declare const _default: TuyenDuongService;
export default _default;
//# sourceMappingURL=TuyenDuongService.d.ts.map