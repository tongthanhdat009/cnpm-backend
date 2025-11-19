export declare class DiemDungService {
    private repo;
    getAll(params?: {
        q?: string;
    }): Promise<{
        id_diem_dung: number;
        ten_diem_dung: string;
        dia_chi: string | null;
        vi_do: import("@prisma/client/runtime/library").Decimal;
        kinh_do: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    getById(id: number): Promise<{
        id_diem_dung: number;
        ten_diem_dung: string;
        dia_chi: string | null;
        vi_do: import("@prisma/client/runtime/library").Decimal;
        kinh_do: import("@prisma/client/runtime/library").Decimal;
    } | null>;
    getUnassignedStudentCounts(): Promise<{
        id_diem_dung: number;
        so_luong_hoc_sinh_con: number;
    }[]>;
    create(payload: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id_diem_dung: number;
            ten_diem_dung: string;
            dia_chi: string | null;
            vi_do: import("@prisma/client/runtime/library").Decimal;
            kinh_do: import("@prisma/client/runtime/library").Decimal;
        };
    }>;
    update(id: number, payload: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id_diem_dung: number;
            ten_diem_dung: string;
            dia_chi: string | null;
            vi_do: import("@prisma/client/runtime/library").Decimal;
            kinh_do: import("@prisma/client/runtime/library").Decimal;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
declare const _default: DiemDungService;
export default _default;
//# sourceMappingURL=DiemDungService.d.ts.map