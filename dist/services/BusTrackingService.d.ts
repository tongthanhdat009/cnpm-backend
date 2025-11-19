export declare class BusTrackingService {
    /**
     * Cập nhật vị trí xe buýt và broadcast qua WebSocket
     */
    updateBusLocation(idXeBuyt: number, viDo: number, kinhDo: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id_xe_buyt: number;
            bien_so_xe: string;
            vi_do: string | undefined;
            kinh_do: string | undefined;
            lan_cap_nhat_cuoi: Date;
            active_trips_count: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    /**
     * Lấy vị trí hiện tại của xe buýt
     */
    getBusLocation(idXeBuyt: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id_xe_buyt: number;
            bien_so_xe: string;
            vi_do: string | undefined;
            kinh_do: string | undefined;
            lan_cap_nhat_cuoi: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    /**
     * Lấy vị trí xe của chuyến đi đang hoạt động
     */
    getActiveTripBusLocation(idChuyenDi: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id_chuyen_di: number;
            trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null;
            tuyen_duong: string | undefined;
            xe_buyt: {
                id_xe_buyt: number;
                bien_so_xe: string;
                vi_do: string | undefined;
                kinh_do: string | undefined;
                lan_cap_nhat_cuoi: Date;
            };
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    /**
     * Lấy danh sách chuyến đi đang hoạt động của học sinh (cho phụ huynh)
     */
    getActiveTripsForStudent(idHocSinh: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id_diem_danh: number;
            trang_thai_diem_danh: import(".prisma/client").$Enums.diem_danh_chuyen_di_trang_thai;
            diem_dung: {
                id_diem_dung: number;
                ten_diem_dung: string;
                dia_chi: string | null;
                vi_do: import("@prisma/client/runtime/library").Decimal;
                kinh_do: import("@prisma/client/runtime/library").Decimal;
            } | null;
            chuyen_di: {
                id_chuyen_di: number | undefined;
                loai_chuyen_di: string | null | undefined;
                gio_khoi_hanh: Date | undefined;
                ngay: Date | undefined;
                trang_thai: import(".prisma/client").$Enums.chuyen_di_trang_thai | null | undefined;
                tuyen_duong: ({
                    tuyen_duong_diem_dung: ({
                        diem_dung: {
                            id_diem_dung: number;
                            ten_diem_dung: string;
                            dia_chi: string | null;
                            vi_do: import("@prisma/client/runtime/library").Decimal;
                            kinh_do: import("@prisma/client/runtime/library").Decimal;
                        } | null;
                    } & {
                        id_tuyen_duong: number | null;
                        id_tuyen_duong_diem_dung: number;
                        id_diem_dung: number | null;
                        thu_tu_diem_dung: number;
                    })[];
                } & {
                    isDelete: boolean;
                    id_tuyen_duong: number;
                    ten_tuyen_duong: string;
                    quang_duong: number;
                    thoi_gian_du_kien: number | null;
                    mo_ta: string | null;
                }) | null | undefined;
                xe_buyt: {
                    id_xe_buyt: number | undefined;
                    bien_so_xe: string | undefined;
                    vi_do: string | undefined;
                    kinh_do: string | undefined;
                    lan_cap_nhat_cuoi: Date | undefined;
                };
                tai_xe: {
                    id_nguoi_dung: number;
                    ten_tai_khoan: string;
                    so_dien_thoai: string | null;
                    ho_ten: string;
                    mat_khau_bam: string;
                    vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
                    ngay_tao: Date;
                    isDelete: boolean;
                } | null | undefined;
            };
        }[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=BusTrackingService.d.ts.map