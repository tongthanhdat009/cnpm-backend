"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChuyenDiService = void 0;
const ChuyenDiRepo_1 = require("../repositories/ChuyenDiRepo");
const TuyenDuongRepo_1 = require("../repositories/TuyenDuongRepo");
const client_1 = require("@prisma/client"); // (MỚI) Import Prisma types
const ThongBaoService_1 = __importDefault(require("./ThongBaoService"));
class ChuyenDiService {
    constructor() {
        this.chuyenDiRepo = new ChuyenDiRepo_1.ChuyenDiRepository();
        this.tuyenDuongRepo = new TuyenDuongRepo_1.TuyenDuongRepo();
    }
    /**
     * Lấy tất cả chuyến đi
     */
    async getAllChuyenDi() {
        try {
            const chuyenDis = await this.chuyenDiRepo.getAllChuyenDi();
            return {
                success: true,
                message: "Lấy danh sách chuyến đi thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        }
        catch (error) {
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
    async getChuyenDiById(id) {
        try {
            const chuyenDi = await this.chuyenDiRepo.getChuyenDiById(id);
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
        }
        catch (error) {
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
    async getChuyenDiByTaiXe(idTaiXe) {
        try {
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByTaiXe(idTaiXe);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi của tài xế thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        }
        catch (error) {
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
    async getChuyenDiByTuyenDuong(idTuyenDuong) {
        try {
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByTuyenDuong(idTuyenDuong);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi theo tuyến đường thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        }
        catch (error) {
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
    async getChuyenDiByNgay(ngay) {
        try {
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByNgay(ngay);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi theo ngày thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        }
        catch (error) {
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
    async getChuyenDiByTrangThai(trangThai) {
        try {
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByTrangThai(trangThai);
            return {
                success: true,
                message: `Lấy danh sách chuyến đi ${trangThai} thành công`,
                data: chuyenDis,
                total: chuyenDis.length
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi theo trạng thái",
                error: error.message
            };
        }
    }
    /**
     * Lấy danh sách chuyến đi của một học sinh
     */
    async getChuyenDiByHocSinh(idHocSinh) {
        try {
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByHocSinh(idHocSinh);
            return {
                success: true,
                message: "Lấy danh sách chuyến đi của học sinh thành công",
                data: chuyenDis,
                total: chuyenDis.length
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi của học sinh",
                error: error.message
            };
        }
    }
    // kiểm tra trùng lịch
    async checkScheduleConflict(checkData, excludeChuyenDiId = null) {
        const { id_tai_xe, id_xe_buyt, id_tuyen_duong, ngay, gio_khoi_hanh_str } = checkData;
        // 1. Lấy thời gian dự kiến của tuyến đường
        const tuyenDuong = await this.tuyenDuongRepo.getTuyenDuongById(id_tuyen_duong);
        if (!tuyenDuong || tuyenDuong.thoi_gian_du_kien == null) {
            return {
                success: false,
                message: `Tuyến đường (ID: ${id_tuyen_duong}) không hợp lệ hoặc chưa có thời gian dự kiến`
            };
        }
        const thoiGianDuKienPhut = tuyenDuong.thoi_gian_du_kien;
        // 2. Tính toán thời gian bắt đầu/kết thúc (UTC) của chuyến đi mới
        const [hours = 0, minutes = 0, seconds = 0] = gio_khoi_hanh_str.split(':').map(Number);
        const newStartTime = new Date(ngay); // 'ngay' đã là UTC Date
        newStartTime.setUTCHours(hours, minutes, seconds || 0, 0);
        const newEndTime = new Date(newStartTime.getTime() + thoiGianDuKienPhut * 60000);
        // 3. Tìm các chuyến đi đã có (loại trừ chính nó nếu đang update)
        const existingTrips = await this.chuyenDiRepo.findActiveTripsByDate(id_tai_xe, id_xe_buyt, ngay, excludeChuyenDiId);
        // 4. Kiểm tra overlap
        for (const existing of existingTrips) {
            if (!existing.tuyen_duong?.thoi_gian_du_kien)
                continue;
            const existingDatePart = new Date(existing.ngay);
            const existingTimePart = new Date(existing.gio_khoi_hanh);
            const existingStartTime = new Date(existingDatePart);
            existingStartTime.setUTCHours(existingTimePart.getUTCHours(), existingTimePart.getUTCMinutes(), existingTimePart.getUTCSeconds());
            const existingDuration = existing.tuyen_duong.thoi_gian_du_kien;
            const existingEndTime = new Date(existingStartTime.getTime() + existingDuration * 60000);
            // Logic (StartA < EndB) && (EndA > StartB)
            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                const reason = existing.id_tai_xe === id_tai_xe
                    ? `Tài xế "${existing.nguoi_dung?.ho_ten}" đã có lịch`
                    : `Xe "${existing.xe_buyt?.bien_so_xe}" đã có lịch`;
                return {
                    success: false,
                    message: `Trùng lịch vào ngày ${ngay.toISOString().split('T')[0]}. ${reason} (Chuyến ${existing.id_chuyen_di}).`,
                    errors: [{
                            ngay: ngay.toISOString().split('T')[0],
                            conflict_with_trip_id: existing.id_chuyen_di,
                            reason: reason
                        }]
                };
            }
        }
        // Không tìm thấy trùng lịch
        return { success: true };
    }
    /**
     * Tạo lịch trình lặp lại
     */
    async createRecurringChuyenDi(data) {
        try {
            const { ngay_bat_dau, ngay_ket_thuc, gio_khoi_hanh, // "HH:mm:ss"
            lap_lai_cac_ngay, id_tuyen_duong, id_tai_xe, id_xe_buyt, loai_chuyen_di } = data;
            const startDate = new Date(ngay_bat_dau + 'T00:00:00Z');
            const endDate = new Date(ngay_ket_thuc + 'T23:59:59Z');
            const now = new Date();
            const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
            if (startDate < todayUTC) {
                return { success: false, message: "Ngày bắt đầu phải từ ngày hiện tại trở đi" };
            }
            if (endDate < startDate) {
                return { success: false, message: "Ngày kết thúc không được trước ngày bắt đầu" };
            }
            const tuyenDuong = await this.tuyenDuongRepo.getTuyenDuongById(id_tuyen_duong);
            if (!tuyenDuong || tuyenDuong.thoi_gian_du_kien == null) {
                return { success: false, message: "Tuyến đường không hợp lệ hoặc chưa có thời gian dự kiến" };
            }
            const tripsToCreate = [];
            const conflicts = [];
            const createdTrips = [];
            for (let day = new Date(startDate); day <= endDate; day.setUTCDate(day.getUTCDate() + 1)) {
                const dayOfWeek = day.getUTCDay();
                if (lap_lai_cac_ngay.includes(dayOfWeek)) {
                    const ngayChuyenDi = new Date(day);
                    const conflictCheck = await this.checkScheduleConflict({
                        id_tai_xe: id_tai_xe,
                        id_xe_buyt: id_xe_buyt,
                        id_tuyen_duong: id_tuyen_duong,
                        ngay: ngayChuyenDi,
                        gio_khoi_hanh_str: gio_khoi_hanh
                    }, null);
                    if (!conflictCheck.success) {
                        conflicts.push(conflictCheck.errors ? conflictCheck.errors[0] : { ngay: ngayChuyenDi, reason: conflictCheck.message });
                    }
                    else {
                        const [h, m, s] = gio_khoi_hanh.split(':').map(Number);
                        const newStartTime = new Date(ngayChuyenDi);
                        newStartTime.setUTCHours(h, m, s || 0, 0);
                        const isToday = ngayChuyenDi.toISOString().split('T')[0] === todayUTC.toISOString().split('T')[0];
                        if (isToday && newStartTime < now) {
                            console.warn(`Bỏ qua tạo chuyến ngày ${ngayChuyenDi.toISOString().split('T')[0]} lúc ${gio_khoi_hanh} vì đã qua giờ hiện tại.`);
                            continue;
                        }
                        tripsToCreate.push({
                            id_tai_xe: id_tai_xe,
                            id_tuyen_duong: id_tuyen_duong,
                            id_xe_buyt: id_xe_buyt,
                            loai_chuyen_di: loai_chuyen_di,
                            gio_khoi_hanh: newStartTime,
                            ngay: newStartTime,
                            trang_thai: 'cho_khoi_hanh',
                        });
                    }
                }
            }
            if (conflicts.length > 0) {
                return { success: false, message: "Phát hiện trùng lịch. Vui lòng kiểm tra lại.", errors: conflicts };
            }
            if (tripsToCreate.length === 0) {
                return { success: false, message: "Không có chuyến đi nào được tạo. Vui lòng kiểm tra lại ngày." };
            }
            // Tạo từng chuyến đi và tự động tạo điểm danh cho học sinh
            for (const tripData of tripsToCreate) {
                try {
                    const createdTrip = await this.chuyenDiRepo.createChuyenDiWithAttendance(tripData);
                    createdTrips.push(createdTrip);
                }
                catch (error) {
                    console.error(`Lỗi khi tạo chuyến đi ngày ${tripData.ngay}:`, error);
                }
            }
            return {
                success: true,
                message: `Tạo thành công ${createdTrips.length} chuyến đi cho tuyến "${tuyenDuong.ten_tuyen_duong}" với điểm danh học sinh`,
                data: {
                    count: createdTrips.length,
                    trips: createdTrips
                }
            };
        }
        catch (error) {
            console.error("Lỗi createRecurringChuyenDi:", error);
            return {
                success: false,
                message: "Lỗi server khi tạo lịch trình",
                error: error.message
            };
        }
    }
    /**
     * Cập nhật chuyến đi (ĐÃ CẬP NHẬT)
     */
    async updateChuyenDi(id, data) {
        try {
            // 1. Kiểm tra chuyến đi có tồn tại
            const existingChuyenDi = await this.chuyenDiRepo.getChuyenDiById(id);
            if (!existingChuyenDi) {
                return {
                    success: false,
                    message: `Không tìm thấy chuyến đi với ID ${id}`
                };
            }
            // (Business Logic) Không cho sửa chuyến đã hoàn thành hoặc đã hủy
            if (existingChuyenDi.trang_thai === 'hoan_thanh' ||
                existingChuyenDi.trang_thai === 'da_huy') {
                // Cho phép sửa trạng thái nếu chỉ sửa trạng thái
                if (Object.keys(data).length === 1 && data.trang_thai) {
                    // Bỏ qua, cho phép sửa trạng thái
                }
                else {
                    return {
                        success: false,
                        message: `Không thể cập nhật thông tin chuyến đi đã ${existingChuyenDi.trang_thai}.`
                    };
                }
            }
            // 2. Chuẩn bị dữ liệu để kiểm tra conflict
            // Lấy giá trị mới HOẶC giá trị cũ nếu không có giá trị mới
            const checkData = {
                id_tai_xe: data.id_tai_xe ?? existingChuyenDi.id_tai_xe,
                id_xe_buyt: data.id_xe_buyt ?? existingChuyenDi.id_xe_buyt,
                id_tuyen_duong: data.id_tuyen_duong ?? existingChuyenDi.id_tuyen_duong,
                ngay: data.ngay ? new Date(data.ngay + 'T00:00:00Z') : new Date(existingChuyenDi.ngay),
                gio_khoi_hanh_str: data.gio_khoi_hanh ??
                    // Chuyển đổi Date object 'gio_khoi_hanh' về "HH:mm:ss"
                    new Date(existingChuyenDi.gio_khoi_hanh).toISOString().substr(11, 8)
            };
            // 3. Kiểm tra conflict (loại trừ chính nó)
            // Chỉ kiểm tra nếu thông tin liên quan đến lịch trình bị thay đổi
            const needsCheck = data.id_tai_xe || data.id_xe_buyt || data.id_tuyen_duong || data.ngay || data.gio_khoi_hanh;
            if (needsCheck) {
                const conflictCheck = await this.checkScheduleConflict(checkData, id);
                if (!conflictCheck.success) {
                    return conflictCheck; // Trả về lỗi trùng lịch
                }
            }
            // 4. Chuẩn bị dữ liệu cập nhật cho Prisma
            const updateData = {};
            if (data.id_tai_xe !== undefined)
                updateData.nguoi_dung = { connect: { id_nguoi_dung: data.id_tai_xe } };
            if (data.id_xe_buyt !== undefined)
                updateData.xe_buyt = { connect: { id_xe_buyt: data.id_xe_buyt } };
            if (data.id_tuyen_duong !== undefined)
                updateData.tuyen_duong = { connect: { id_tuyen_duong: data.id_tuyen_duong } };
            if (data.trang_thai !== undefined)
                updateData.trang_thai = data.trang_thai;
            // Nếu ngày hoặc giờ thay đổi, cập nhật cả 2
            if (data.ngay || data.gio_khoi_hanh) {
                const newStartTime = new Date(checkData.ngay);
                const [hours = 0, minutes = 0, seconds = 0] = checkData.gio_khoi_hanh_str.split(':').map(Number);
                newStartTime.setUTCHours(hours, minutes, seconds, 0);
                const now = new Date(); // Lấy thời gian hiện tại
                // Chỉ kiểm tra nếu chuyến đi CHƯA bắt đầu ('cho_khoi_hanh' hoặc 'bi_tre')
                if ((existingChuyenDi.trang_thai === 'cho_khoi_hanh' || existingChuyenDi.trang_thai === 'bi_tre') &&
                    newStartTime < now) {
                    return {
                        success: false,
                        message: "Không thể dời lịch chuyến đi về một thời điểm trong quá khứ."
                    };
                }
                updateData.ngay = newStartTime;
                updateData.gio_khoi_hanh = newStartTime;
            }
            // 5. Cập nhật
            const updatedChuyenDi = await this.chuyenDiRepo.updateChuyenDi(id, updateData);
            return {
                success: true,
                message: "Cập nhật chuyến đi thành công",
                data: updatedChuyenDi
            };
        }
        catch (error) {
            console.error("Lỗi updateChuyenDi:", error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') { // Lỗi không tìm thấy (ví dụ: tài xế, xe buýt mới không tồn tại)
                    return { success: false, message: "Lỗi liên kết dữ liệu: Một trong các ID (tài xế, xe) không tồn tại." };
                }
            }
            return {
                success: false,
                message: "Lỗi khi cập nhật chuyến đi",
                error: error.message
            };
        }
    }
    async deleteChuyenDi(id) {
        try {
            const existingChuyenDi = await this.chuyenDiRepo.getChuyenDiById(id);
            if (!existingChuyenDi) {
                return {
                    success: false,
                    message: `Không tìm thấy chuyến đi với ID ${id}`
                };
            }
            if (existingChuyenDi.trang_thai === 'dang_di' || existingChuyenDi.trang_thai === 'hoan_thanh') {
                return {
                    success: false,
                    message: `Không thể xóa chuyến đi đang diễn ra hoặc đã hoàn thành.`
                };
            }
            await this.chuyenDiRepo.deleteChuyenDi(id);
            return {
                success: true,
                message: "Xóa chuyến đi thành công"
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi xóa chuyến đi",
                error: error.message
            };
        }
    }
    /**
     * Cập nhật trạng thái chuyến đi. Nếu đặt về 'hoan_thanh', tự động đổi các điểm danh 'da_don' => 'da_tra'.
     */
    async updateTrangThai(id, trang_thai) {
        try {
            const allowed = ['cho_khoi_hanh', 'dang_di', 'hoan_thanh', 'da_huy', 'bi_tre'];
            if (!allowed.includes(trang_thai)) {
                return { success: false, message: 'Trạng thái không hợp lệ' };
            }
            // Kiểm tra tồn tại và trạng thái hiện tại
            const existing = await this.chuyenDiRepo.getChuyenDiById(id);
            if (!existing) {
                return { success: false, message: `Không tìm thấy chuyến đi với ID ${id}` };
            }
            // Ràng buộc hoàn thành: chỉ cho phép từ 'dang_di' -> 'hoan_thanh'
            if (trang_thai === 'hoan_thanh') {
                if (existing.trang_thai !== 'dang_di') {
                    return { success: false, message: "Chỉ có thể hoàn thành chuyến đang ở trạng thái 'dang_di'." };
                }
                // Không cho hoàn thành nếu còn bất kỳ điểm danh 'chua_don'
                const hasChuaDon = await this.chuyenDiRepo.hasChuaDonAttendance(id);
                if (hasChuaDon) {
                    return { success: false, message: "Không thể hoàn thành: còn học sinh ở trạng thái 'chua_don'." };
                }
            }
            const result = await this.chuyenDiRepo.updateTrangThai(id, trang_thai);
            if (!result) {
                return { success: false, message: `Không tìm thấy chuyến đi với ID ${id}` };
            }
            return {
                success: true,
                message: 'Cập nhật trạng thái chuyến đi thành công',
                data: {
                    chuyen_di: result.updatedTrip,
                    autoUpdatedAttendance: result.updatedAttendanceCount,
                },
            };
        }
        catch (error) {
            return { success: false, message: 'Lỗi khi cập nhật trạng thái chuyến đi', error: error.message };
        }
    }
    /**
     * Gửi cảnh báo sự cố cho phụ huynh có con trong chuyến đi
     */
    async sendIncidentWarning(id, incidentData, senderId) {
        try {
            // Lấy thông tin chuyến đi
            const chuyenDi = await this.chuyenDiRepo.getChuyenDiById(id);
            if (!chuyenDi) {
                return { success: false, message: `Không tìm thấy chuyến đi với ID ${id}` };
            }
            // Lấy danh sách phụ huynh có con trong chuyến đi
            const parentIds = await this.chuyenDiRepo.getParentIdsByTripId(id);
            if (parentIds.length === 0) {
                return { success: false, message: 'Không có phụ huynh nào để gửi cảnh báo' };
            }
            // Import WebSocket service
            const { sendMessageToUsers } = await Promise.resolve().then(() => __importStar(require('../websocket')));
            const tieuDe = '⚠️ Cảnh báo sự cố';
            const noiDung = `Chuyến đi ${chuyenDi.tuyen_duong?.ten_tuyen_duong || 'Không xác định'} (${chuyenDi.xe_buyt?.bien_so_xe || 'N/A'}): ${incidentData.noi_dung}`;
            // Lưu thông báo cho từng phụ huynh vào database
            const savePromises = parentIds.map(parentId => ThongBaoService_1.default.createThongBao({
                tieu_de: tieuDe,
                noi_dung: noiDung,
                nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: senderId ? {
                    connect: { id_nguoi_dung: senderId }
                } : undefined,
                nguoi_dung_thong_bao_id_nguoi_nhanTonguoi_dung: {
                    connect: { id_nguoi_dung: parentId }
                },
                da_xem: false,
                thoi_gian: new Date()
            }));
            await Promise.all(savePromises);
            // Gửi WebSocket notification đến phụ huynh (realtime)
            const message = {
                type: 'incident_warning',
                data: {
                    id_chuyen_di: id,
                    tieu_de: tieuDe,
                    noi_dung: incidentData.noi_dung,
                    ten_tuyen_duong: chuyenDi.tuyen_duong?.ten_tuyen_duong || 'Không xác định',
                    bien_so_xe: chuyenDi.xe_buyt?.bien_so_xe || 'Không xác định',
                    thoi_gian: new Date().toISOString(),
                    loai_chuyen_di: chuyenDi.loai_chuyen_di
                }
            };
            const sentCount = sendMessageToUsers(parentIds, message);
            console.log(`📢 Đã gửi và lưu cảnh báo sự cố chuyến ${id} đến ${parentIds.length} phụ huynh (${sentCount} đang online)`);
            return {
                success: true,
                message: `Đã gửi cảnh báo sự cố đến ${parentIds.length} phụ huynh`,
                data: {
                    parent_count: parentIds.length,
                    sent_count: sentCount
                }
            };
        }
        catch (error) {
            console.error('Lỗi sendIncidentWarning:', error);
            return {
                success: false,
                message: 'Lỗi khi gửi cảnh báo sự cố',
                error: error.message
            };
        }
    }
}
exports.ChuyenDiService = ChuyenDiService;
//# sourceMappingURL=ChuyenDiService.js.map