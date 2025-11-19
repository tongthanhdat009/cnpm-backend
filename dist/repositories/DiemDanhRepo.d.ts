import { diem_danh_chuyen_di_trang_thai } from '@prisma/client';
export declare class DiemDanhRepo {
    findByIdWithTripStatus(id_diem_danh: number): Promise<{
        chuyen_di: {
            tuyen_duong: {
                ten_tuyen_duong: string;
            } | null;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            loai_chuyen_di: string | null;
        } | null;
        trang_thai: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
        id_chuyen_di: number | null;
        id_diem_danh: number;
    } | null>;
    updateTrangThai(id_diem_danh: number, trang_thai: diem_danh_chuyen_di_trang_thai): Promise<({
        chuyen_di: {
            tuyen_duong: {
                ten_tuyen_duong: string;
            } | null;
            id_chuyen_di: number;
            id_tai_xe: number | null;
            loai_chuyen_di: string | null;
        } | null;
        hoc_sinh: {
            ho_ten: string | null;
            id_hoc_sinh: number;
            id_phu_huynh: number | null;
        } | null;
    } & {
        id_diem_dung: number | null;
        id_hoc_sinh: number | null;
        trang_thai: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
        id_chuyen_di: number | null;
        id_diem_danh: number;
        thoi_gian: Date;
    }) | null>;
}
declare const _default: DiemDanhRepo;
export default _default;
//# sourceMappingURL=DiemDanhRepo.d.ts.map