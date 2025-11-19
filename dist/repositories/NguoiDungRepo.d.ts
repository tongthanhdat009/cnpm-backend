import { nguoi_dung_vai_tro } from "@prisma/client";
export declare class NguoiDungRepository {
    getAllNguoiDung(): Promise<{
        id_nguoi_dung: number;
        ten_tai_khoan: string;
        so_dien_thoai: string | null;
        ho_ten: string;
        vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
        ngay_tao: Date;
    }[]>;
    getNguoiDungById(id: number): Promise<{
        id_nguoi_dung: number;
        ten_tai_khoan: string;
        so_dien_thoai: string | null;
        ho_ten: string;
        vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
        ngay_tao: Date;
    } | null>;
    getNguoiDungByVaiTro(vaiTro: nguoi_dung_vai_tro): Promise<{
        id_nguoi_dung: number;
        ten_tai_khoan: string;
        so_dien_thoai: string | null;
        ho_ten: string;
        vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
        ngay_tao: Date;
    }[]>;
}
export declare const nguoiDungRepo: NguoiDungRepository;
//# sourceMappingURL=NguoiDungRepo.d.ts.map