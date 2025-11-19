export declare class XeBuytService {
    private repo;
    constructor();
    getAllXeBuyt(): Promise<{
        success: boolean;
        message: string;
        data: {
            id_xe_buyt: number;
            bien_so_xe: string;
            so_ghe: number | null;
            hang: string | null;
            anh: string | null;
            vi_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
            kinh_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
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
    getXeBuytById(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id_xe_buyt: number;
            bien_so_xe: string;
            so_ghe: number | null;
            hang: string | null;
            anh: string | null;
            vi_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
            kinh_do_hien_tai: import("@prisma/client/runtime/library").Decimal | null;
        } | null;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=XeBuytService.d.ts.map