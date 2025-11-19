export declare class HocSinhService {
    private repo;
    getAll(): Promise<({
        phan_cong_hoc_sinh: {
            id_tuyen_duong: number | null;
        }[];
    } & {
        ho_ten: string | null;
        id_diem_dung: number | null;
        id_hoc_sinh: number;
        id_phu_huynh: number | null;
        lop: string | null;
        ghi_chu: string | null;
    })[]>;
    getById(id: number): Promise<({
        diem_dung: {
            id_diem_dung: number;
            ten_diem_dung: string;
            dia_chi: string | null;
            vi_do: import("@prisma/client/runtime/library").Decimal;
            kinh_do: import("@prisma/client/runtime/library").Decimal;
        } | null;
    } & {
        ho_ten: string | null;
        id_diem_dung: number | null;
        id_hoc_sinh: number;
        id_phu_huynh: number | null;
        lop: string | null;
        ghi_chu: string | null;
    }) | null>;
    getByPhuHuynh(idPhuHuynh: number): Promise<({
        nguoi_dung: {
            id_nguoi_dung: number;
            so_dien_thoai: string | null;
            ho_ten: string;
        } | null;
        diem_dung: {
            id_diem_dung: number;
            ten_diem_dung: string;
            dia_chi: string | null;
            vi_do: import("@prisma/client/runtime/library").Decimal;
            kinh_do: import("@prisma/client/runtime/library").Decimal;
        } | null;
    } & {
        ho_ten: string | null;
        id_diem_dung: number | null;
        id_hoc_sinh: number;
        id_phu_huynh: number | null;
        lop: string | null;
        ghi_chu: string | null;
    })[]>;
}
declare const _default: HocSinhService;
export default _default;
//# sourceMappingURL=HocSinhService.d.ts.map