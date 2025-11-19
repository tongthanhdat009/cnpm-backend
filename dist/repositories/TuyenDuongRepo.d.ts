export declare class TuyenDuongRepo {
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
    checkNameExists(ten_tuyen_duong: string): Promise<boolean>;
    create(data: {
        ten_tuyen_duong: string;
        quang_duong: number;
        thoi_gian_du_kien?: number | null;
        mo_ta?: string | null;
        tuyen_duong_diem_dung: Array<{
            so_thu_tu: number;
            id_diem_dung: number;
        }>;
    }): Promise<{
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
    update(data: {
        id_tuyen_duong: number;
        ten_tuyen_duong?: string;
        quang_duong?: number;
        thoi_gian_du_kien?: number | null;
        mo_ta?: string | null;
        diem_dung_ids?: number[];
    }): Promise<{
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
    isTuyenDuongUsed(id_tuyen_duong: number): Promise<boolean>;
    /**
     * Xóa tuyến đường theo rule:
     * - Xóa tất cả chuyen_di với trang_thai = 'cho_khoi_hanh' (chưa khởi hành)
     * - Nếu tuyến đã được sử dụng (isTuyenDuongUsed == true) => soft delete: set isDelete = true và thêm dấu '*' vào tên (nếu chưa có)
     * - Nếu chưa được sử dụng => hard delete (xóa record tuyen_duong)
     * Trả về thông tin tóm tắt
     */
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
}
//# sourceMappingURL=TuyenDuongRepo.d.ts.map