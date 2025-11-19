import { Prisma } from '@prisma/client';
export declare class ThongBaoService {
    createThongBao(data: Prisma.thong_baoCreateInput): Promise<{
        success: boolean;
        message: string;
        data: {
            nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: {
                ho_ten: string;
            } | null;
            nguoi_dung_thong_bao_id_nguoi_nhanTonguoi_dung: {
                ho_ten: string;
            } | null;
        } & {
            thoi_gian: Date | null;
            da_xem: boolean | null;
            tieu_de: string;
            noi_dung: string;
            id_thong_bao: number;
            id_nguoi_nhan: number | null;
            id_nguoi_gui: number | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllThongBao(userId?: number): Promise<{
        success: boolean;
        data: ({
            nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: {
                ho_ten: string;
            } | null;
        } & {
            thoi_gian: Date | null;
            da_xem: boolean | null;
            tieu_de: string;
            noi_dung: string;
            id_thong_bao: number;
            id_nguoi_nhan: number | null;
            id_nguoi_gui: number | null;
        })[];
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getThongBaoByIdNguoiDung(id: number): Promise<{
        success: boolean;
        data: ({
            nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: {
                ho_ten: string;
                vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            } | null;
        } & {
            thoi_gian: Date | null;
            da_xem: boolean | null;
            tieu_de: string;
            noi_dung: string;
            id_thong_bao: number;
            id_nguoi_nhan: number | null;
            id_nguoi_gui: number | null;
        })[];
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
declare const _default: ThongBaoService;
export default _default;
//# sourceMappingURL=ThongBaoService.d.ts.map