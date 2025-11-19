export declare class DiemDungRepo {
    getAll(q?: string): Promise<{
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
    create(data: {
        ten_diem_dung: string;
        dia_chi?: string | null;
        vi_do: number;
        kinh_do: number;
    }): Promise<{
        id_diem_dung: number;
        ten_diem_dung: string;
        dia_chi: string | null;
        vi_do: import("@prisma/client/runtime/library").Decimal;
        kinh_do: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(id: number, data: Partial<{
        ten_diem_dung: string;
        dia_chi: string | null;
        vi_do: number;
        kinh_do: number;
    }>): Promise<{
        id_diem_dung: number;
        ten_diem_dung: string;
        dia_chi: string | null;
        vi_do: import("@prisma/client/runtime/library").Decimal;
        kinh_do: import("@prisma/client/runtime/library").Decimal;
    }>;
    delete(id: number): Promise<{
        id_diem_dung: number;
        ten_diem_dung: string;
        dia_chi: string | null;
        vi_do: import("@prisma/client/runtime/library").Decimal;
        kinh_do: import("@prisma/client/runtime/library").Decimal;
    }>;
}
declare const _default: DiemDungRepo;
export default _default;
//# sourceMappingURL=DiemDungRepo.d.ts.map