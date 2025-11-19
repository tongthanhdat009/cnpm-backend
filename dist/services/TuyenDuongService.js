"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuyenDuongService = void 0;
const TuyenDuongRepo_1 = require("../repositories/TuyenDuongRepo");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
class TuyenDuongService {
    constructor() {
        this.repo = new TuyenDuongRepo_1.TuyenDuongRepo();
    }
    async getAll() {
        const result = await this.repo.getAll();
        return result;
    }
    async create(data) {
        // Prepare stops and validate input/business rules
        const stops = Array.isArray(data?.tuyen_duong_diem_dung)
            ? data.tuyen_duong_diem_dung
            : [];
        await this.validateTuyenDuong(data, stops);
        // Gọi repo tạo tuyến đường
        const result = await this.repo.create({
            ten_tuyen_duong: data.ten_tuyen_duong,
            quang_duong: data.quang_duong,
            thoi_gian_du_kien: data.thoi_gian_du_kien,
            mo_ta: data.mo_ta ?? null,
            tuyen_duong_diem_dung: stops,
        });
        return result;
    }
    // Private validation helper
    async validateTuyenDuong(data, stops) {
        const s = Array.isArray(stops) ? stops : (Array.isArray(data?.tuyen_duong_diem_dung) ? data.tuyen_duong_diem_dung : []);
        if (s.length < 3) {
            throw new Error("Danh sách điểm dừng phải có ít nhất 3 điểm");
        }
        if (data.ten_tuyen_duong == null || data.ten_tuyen_duong.trim() === "") {
            throw new Error("Tên tuyến đường không được để trống");
        }
        if (await this.repo.checkNameExists(data.ten_tuyen_duong)) {
            throw new Error("Tên tuyến đường đã tồn tại");
        }
    }
    async getTuyenDuongById(id) {
        const result = await this.repo.getTuyenDuongById(id);
        return result;
    }
    async deleteTuyenDuong(id_tuyen_duong) {
        const result = await this.repo.deleteTuyenDuong(id_tuyen_duong);
        return result;
    }
    async update(data) {
        const id = Number(data.id_tuyen_duong || data.id);
        if (!id || Number.isNaN(id)) {
            throw new Error('ID tuyến đường không hợp lệ');
        }
        // Check if route has been used
        const used = await this.repo.isTuyenDuongUsed(id);
        if (used) {
            throw new Error('Tuyến đường đã được sử dụng, không thể cập nhật');
        }
        // If changing name, ensure uniqueness
        if (data.ten_tuyen_duong) {
            // Get current record to compare name
            const current = await this.repo.getTuyenDuongById(id);
            if (current && current.ten_tuyen_duong !== data.ten_tuyen_duong) {
                const exists = await this.repo.checkNameExists(data.ten_tuyen_duong);
                if (exists)
                    throw new Error('Tên tuyến đường đã tồn tại');
            }
        }
        // Normalize diem_dung_ids -> tuyen_duong_diem_dung format if provided
        const diemIds = Array.isArray(data.diem_dung_ids)
            ? data.diem_dung_ids.map((v) => Number(v))
            : undefined;
        const payload = {
            id_tuyen_duong: id,
            ten_tuyen_duong: data.ten_tuyen_duong,
            quang_duong: data.quang_duong,
            thoi_gian_du_kien: data.thoi_gian_du_kien,
            mo_ta: data.mo_ta ?? null,
            diem_dung_ids: diemIds,
        };
        const updated = await this.repo.update(payload);
        return updated;
    }
    async assignHocSinhToTuyen(id_tuyen_duong, id_hoc_sinh) {
        return await this.repo.assignHocSinhToTuyen(id_tuyen_duong, id_hoc_sinh);
    }
    async removeHocSinhFromTuyen(id_tuyen_duong, id_hoc_sinh) {
        return await this.repo.removeHocSinhFromTuyen(id_tuyen_duong, id_hoc_sinh);
    }
    /**
     * Tính toán thời lượng di chuyển dự kiến của một tuyến đường
     * @param {number} id_tuyen_duong - ID của tuyến đường
     * @returns {number} - Thời lượng dự kiến (phút)
     */
    async getThoiLuongDuKien(id_tuyen_duong) {
        const GOONG_API_KEY = process.env.VITE_GOONG_API_KEY;
        if (!GOONG_API_KEY) {
            throw new Error('GOONG_API_KEY chưa được cấu hình');
        }
        // 1. Dùng Prisma lấy tất cả điểm dừng của tuyến, sắp xếp theo thứ tự
        const tuyen = await prisma.tuyen_duong.findUnique({
            where: { id_tuyen_duong: id_tuyen_duong },
            include: {
                tuyen_duong_diem_dung: {
                    include: {
                        diem_dung: true, // Lấy thông tin vĩ độ, kinh độ
                    },
                    orderBy: {
                        thu_tu_diem_dung: 'asc', // Rất quan trọng: phải đúng thứ tự
                    },
                },
            },
        });
        if (!tuyen || tuyen.tuyen_duong_diem_dung.length < 2) {
            throw new Error('Tuyến đường không hợp lệ hoặc có ít hơn 2 điểm dừng.');
        }
        // 2. Chuẩn bị tọa độ cho Goong Map - Filter out null values
        const stops = tuyen.tuyen_duong_diem_dung
            .map(td => td.diem_dung)
            .filter((dd) => dd !== null);
        if (stops.length < 2) {
            throw new Error('Không đủ điểm dừng hợp lệ để tính toán.');
        }
        // Định dạng: "lat,lng"
        const firstStop = stops[0]; // Non-null assertion vì đã kiểm tra stops.length >= 2
        const lastStop = stops[stops.length - 1]; // Non-null assertion vì đã kiểm tra stops.length >= 2
        const origin = `${firstStop.vi_do},${firstStop.kinh_do}`;
        const destination = `${lastStop.vi_do},${lastStop.kinh_do}`;
        // Các điểm dừng ở giữa, định dạng: "lat,lng|lat,lng|..."
        const waypoints = stops
            .slice(1, -1) // Bỏ điểm đầu và điểm cuối
            .map(stop => `${stop.vi_do},${stop.kinh_do}`)
            .join('|');
        console.log('🚌 Tính toán tuyến đường:', {
            id_tuyen_duong,
            origin,
            destination,
            waypoints,
            so_diem_dung: stops.length
        });
        // 3. Gọi Goong Map Directions API
        const url = 'https://rsapi.goong.io/Direction';
        try {
            const response = await axios_1.default.get(url, {
                params: {
                    origin: origin,
                    destination: destination,
                    waypoints: waypoints.length > 0 ? waypoints : undefined,
                    vehicle: 'car', // 'car' là lựa chọn tốt nhất cho xe buýt
                    api_key: GOONG_API_KEY,
                },
            });
            console.log('✅ Goong API Response:', JSON.stringify(response.data, null, 2));
            // 4. Lấy thời lượng (Goong Map trả về bằng giây)
            if (response.data && response.data.routes && response.data.routes.length > 0) {
                const route = response.data.routes[0];
                const durationInSeconds = route.legs?.reduce((total, leg) => total + (leg.duration?.value || 0), 0) || route.duration;
                const distanceInMeters = route.legs?.reduce((total, leg) => total + (leg.distance?.value || 0), 0) || route.distance;
                // Chuyển sang phút và làm tròn lên
                const durationInMinutes = Math.ceil(durationInSeconds / 60);
                console.log('📊 Kết quả tính toán:', {
                    durationInSeconds,
                    durationInMinutes,
                    distanceInMeters
                });
                return {
                    id_tuyen_duong: id_tuyen_duong,
                    ten_tuyen_duong: tuyen.ten_tuyen_duong,
                    thoi_luong_phut: durationInMinutes,
                    thoi_luong_giay: durationInSeconds,
                    khoang_cach_met: distanceInMeters,
                    so_diem_dung: stops.length,
                };
            }
            else {
                console.error('❌ Không có routes trong response:', response.data);
                throw new Error('Không thể tính toán lộ trình.');
            }
        }
        catch (error) {
            console.error('❌ Lỗi khi gọi Goong Map API:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            // Trả về thông tin cơ bản nếu không tính được
            return {
                id_tuyen_duong: id_tuyen_duong,
                ten_tuyen_duong: tuyen.ten_tuyen_duong,
                thoi_luong_phut: null,
                thoi_luong_giay: null,
                khoang_cach_met: null,
                so_diem_dung: stops.length,
                error: error.message
            };
        }
    }
}
exports.TuyenDuongService = TuyenDuongService;
exports.default = new TuyenDuongService();
//# sourceMappingURL=TuyenDuongService.js.map