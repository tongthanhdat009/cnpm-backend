export declare class XeBuytRepository {
    getAllXeBuyt(): Promise<{
        id_xe_buyt: number;
        bien_so_xe: string;
        so_ghe: number | null;
        hang: string | null;
        anh: string | null;
        vi_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
        kinh_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    getXeBuytById(id: number): Promise<{
        id_xe_buyt: number;
        bien_so_xe: string;
        so_ghe: number | null;
        hang: string | null;
        anh: string | null;
        vi_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
        kinh_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
    } | null>;
}
//# sourceMappingURL=XeBuytRepo.d.ts.map