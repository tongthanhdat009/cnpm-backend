import { ChuyenDiRepository } from "../repositories/ChuyenDiRepo";

export class ChuyenDiService {
    private repo: ChuyenDiRepository;
    
    constructor() {
        this.repo = new ChuyenDiRepository();
    }

    /**
     * Lấy tất cả chuyến đi
     */
    async getAllChuyenDi() {
        try {
            const chuyenDis = await this.repo.getAllChuyenDi();
            return {
                success: true,
                message: "Lấy danh sách chuyến đi thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi",
                error: error.message
            };
        }
    }

    /**
     * Lấy chuyến đi theo ID
     */
    async getChuyenDiById(id: number) {
        try {
            const chuyenDi = await this.repo.getChuyenDiById(id);
            
            if (!chuyenDi) {
                return {
                    success: false,
                    message: `Không tìm thấy chuyến đi với ID ${id}`
                };
            }

            return {
                success: true,
                message: "Lấy thông tin chuyến đi thành công",
                data: chuyenDi
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy thông tin chuyến đi",
                error: error.message
            };
        }
    }

    /**
     * Lấy chuyến đi theo tài xế
     */
    async getChuyenDiByTaiXe(idTaiXe: number) {
        try {
            const chuyenDis = await this.repo.getChuyenDiByTaiXe(idTaiXe);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi của tài xế thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi của tài xế",
                error: error.message
            };
        }
    }

    /**
     * Lấy chuyến đi theo tuyến đường
     */
    async getChuyenDiByTuyenDuong(idTuyenDuong: number) {
        try {
            const chuyenDis = await this.repo.getChuyenDiByTuyenDuong(idTuyenDuong);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi theo tuyến đường thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi theo tuyến đường",
                error: error.message
            };
        }
    }

    /**
     * Lấy chuyến đi theo ngày
     */
    async getChuyenDiByNgay(ngay: Date) {
        try {
            const chuyenDis = await this.repo.getChuyenDiByNgay(ngay);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi theo ngày thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi theo ngày",
                error: error.message
            };
        }
    }

    /**
     * Lấy chuyến đi theo trạng thái
     */
    async getChuyenDiByTrangThai(trangThai: 'cho_khoi_hanh' | 'dang_di' | 'hoan_thanh' | 'da_huy' | 'bi_tre') {
        try {
            const chuyenDis = await this.repo.getChuyenDiByTrangThai(trangThai);
            return {
                success: true,
                message: `Lấy danh sách chuyến đi ${trangThai} thành công`,
                data: chuyenDis,
                total: chuyenDis.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi theo trạng thái",
                error: error.message
            };
        }
    }
}