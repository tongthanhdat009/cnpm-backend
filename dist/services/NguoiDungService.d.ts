export declare class NguoiDungService {
    private repo;
    constructor();
    /**
     * Lấy tất cả người dùng
     */
    getAllNguoiDung(): Promise<{
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
    /**
     * Lấy người dùng theo ID
     */
    getNguoiDungById(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id_nguoi_dung: number;
            ten_tai_khoan: string;
            so_dien_thoai: string | null;
            ho_ten: string;
            vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
            ngay_tao: Date;
        } | null;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    /**
     * Lấy người dùng theo vai trò
     */
    getNguoiDungByVaiTro(vaiTro: string): Promise<{
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
}
//# sourceMappingURL=NguoiDungService.d.ts.map