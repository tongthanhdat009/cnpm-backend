import { RegisterData } from './AuthService';
export declare class TaiXeService {
    private nguoiDungRepo;
    private chuyenDiRepo;
    constructor();
    getAllTaiXe(): Promise<{
        success: boolean;
        message: string;
        data: {
            id_nguoi_dung: number;
            ten_tai_khoan: string;
            so_dien_thoai: string | null;
            ho_ten: string;
            vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            ngay_tao: Date;
        }[];
        total: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        total?: undefined;
    }>;
    getTaiXeById(id: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id_nguoi_dung: number;
            ten_tai_khoan: string;
            so_dien_thoai: string | null;
            ho_ten: string;
            vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            ngay_tao: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    createTaiXe(payload: Omit<RegisterData, 'vai_tro'>): Promise<{
        success: boolean;
        message: string;
        data: import("./AuthService").UserResponse;
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: any;
        data?: undefined;
    }>;
    updateTaiXe(id: number, payload: Partial<{
        ho_ten: string;
        ten_tai_khoan: string;
        mat_khau: string;
        so_dien_thoai: string;
    }>): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
        code?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id_nguoi_dung: number;
            ten_tai_khoan: string;
            so_dien_thoai: string | null;
            ho_ten: string;
            vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            ngay_tao: Date;
        };
        error?: undefined;
        code?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        code: any;
        data?: undefined;
    }>;
    deleteTaiXe(id: number, replaceWithId?: number): Promise<{
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
                vi_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
                kinh_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
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
        code: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
        code?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        code: string;
        data: {
            conflicts: any[];
            trips: ({
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
                    vi_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
                    kinh_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
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
            id?: undefined;
            ho_ten?: undefined;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id: number;
            ho_ten: string;
            conflicts?: undefined;
            trips?: undefined;
        };
        code?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        code: any;
        data?: undefined;
    }>;
}
declare const _default: TaiXeService;
export default _default;
//# sourceMappingURL=TaiXeService.d.ts.map