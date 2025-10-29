import { chuyen_di_trang_thai } from "@prisma/client";
import { ChuyenDiRepository } from "../repositories/ChuyenDiRepo";
import { TuyenDuongRepo } from "../repositories/TuyenDuongRepo";
import { Prisma } from "@prisma/client"; // (MỚI) Import Prisma types
import e from "express";

interface ConflictCheckInput {
    id_tai_xe: number;
    id_xe_buyt: number;
    id_tuyen_duong: number;
    ngay: Date;
    gio_khoi_hanh_str: string; // "HH:mm:ss"
}


export class ChuyenDiService {
    private chuyenDiRepo: ChuyenDiRepository;
    private tuyenDuongRepo: TuyenDuongRepo;
    
    constructor() {
        this.chuyenDiRepo = new ChuyenDiRepository();
        this.tuyenDuongRepo = new TuyenDuongRepo();
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
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByTaiXe(idTaiXe);
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
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByTuyenDuong(idTuyenDuong);
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
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByNgay(ngay);
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
            const chuyenDis = await this.chuyenDiRepo.getChuyenDiByTrangThai(trangThai);
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
    
    // kiểm tra trùng lịch
    private async checkScheduleConflict(
        checkData: ConflictCheckInput,
        excludeChuyenDiId: number | null = null
    ) {
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
        const existingTrips = await this.chuyenDiRepo.findActiveTripsByDate(
            id_tai_xe,
            id_xe_buyt,
            ngay,
            excludeChuyenDiId
        );

        // 4. Kiểm tra overlap
        for (const existing of existingTrips) {
            if (!existing.tuyen_duong?.thoi_gian_du_kien) continue; 

            const existingDatePart = new Date(existing.ngay);
            const existingTimePart = new Date(existing.gio_khoi_hanh);
            const existingStartTime = new Date(existingDatePart);
            existingStartTime.setUTCHours(
                existingTimePart.getUTCHours(),
                existingTimePart.getUTCMinutes(),
                existingTimePart.getUTCSeconds()
            );

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
    async createRecurringChuyenDi(data: any) {
        try {
            const {
                ngay_bat_dau,
                ngay_ket_thuc,
                gio_khoi_hanh, // "HH:mm:ss"
                lap_lai_cac_ngay,
                id_tuyen_duong,
                id_tai_xe,
                id_xe_buyt,
                loai_chuyen_di
            } = data;

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

            for (let day = new Date(startDate); day <= endDate; day.setUTCDate(day.getUTCDate() + 1)) {
                const dayOfWeek = day.getUTCDay();
                
                if (lap_lai_cac_ngay.includes(dayOfWeek)) {
                    const ngayChuyenDi = new Date(day); 
                    
                    // (SỬA) Gọi hàm helper để kiểm tra
                    const conflictCheck = await this.checkScheduleConflict({
                        id_tai_xe: id_tai_xe,
                        id_xe_buyt: id_xe_buyt,
                        id_tuyen_duong: id_tuyen_duong,
                        ngay: ngayChuyenDi,
                        gio_khoi_hanh_str: gio_khoi_hanh
                    }, null); // null vì đang tạo mới

                    if (!conflictCheck.success) {
                        conflicts.push(conflictCheck.errors ? conflictCheck.errors[0] : { ngay: ngayChuyenDi, reason: conflictCheck.message });
                    } else {
                        // (SỬA) Tạo newStartTime ở đây để lưu vào DB
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
                            loai_chuyen_di: loai_chuyen_di as any,
                            gio_khoi_hanh: newStartTime,
                            ngay: newStartTime,
                            trang_thai: 'cho_khoi_hanh' as chuyen_di_trang_thai,
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

            const result = await this.chuyenDiRepo.createManyChuyenDi(tripsToCreate);

            return {
                success: true,
                message: `Tạo thành công ${result.count} chuyến đi cho tuyến "${tuyenDuong.ten_tuyen_duong}"`,
                data: result
            };

        } catch (error: any) {
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
    async updateChuyenDi(id: number, data: any) { 
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
                 existingChuyenDi.trang_thai === 'da_huy' ) {
                 // Cho phép sửa trạng thái nếu chỉ sửa trạng thái
                if (Object.keys(data).length === 1 && data.trang_thai) {
                   // Bỏ qua, cho phép sửa trạng thái
                } else {
                    return {
                        success: false,
                        message: `Không thể cập nhật thông tin chuyến đi đã ${existingChuyenDi.trang_thai}.`
                    };
                }
            }
            // 2. Chuẩn bị dữ liệu để kiểm tra conflict
            // Lấy giá trị mới HOẶC giá trị cũ nếu không có giá trị mới
            const checkData: ConflictCheckInput = {
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
            const updateData: Prisma.chuyen_diUpdateInput = {};
            if (data.id_tai_xe !== undefined) updateData.nguoi_dung = { connect: { id_nguoi_dung: data.id_tai_xe } };
            if (data.id_xe_buyt !== undefined) updateData.xe_buyt = { connect: { id_xe_buyt: data.id_xe_buyt } };
            if (data.id_tuyen_duong !== undefined) updateData.tuyen_duong = { connect: { id_tuyen_duong: data.id_tuyen_duong } };
            if (data.trang_thai !== undefined) updateData.trang_thai = data.trang_thai;
            
            // Nếu ngày hoặc giờ thay đổi, cập nhật cả 2
            if (data.ngay || data.gio_khoi_hanh) {
                const newStartTime = new Date(checkData.ngay);
                const [hours = 0, minutes = 0, seconds = 0] = checkData.gio_khoi_hanh_str.split(':').map(Number);
                newStartTime.setUTCHours(hours, minutes, seconds, 0);
                const now = new Date(); // Lấy thời gian hiện tại
                
                // Chỉ kiểm tra nếu chuyến đi CHƯA bắt đầu ('cho_khoi_hanh' hoặc 'bi_tre')
                if ((existingChuyenDi.trang_thai === 'cho_khoi_hanh' || existingChuyenDi.trang_thai === 'bi_tre') &&
                    newStartTime < now)
                {
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
        } catch (error: any) {
             console.error("Lỗi updateChuyenDi:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
    async deleteChuyenDi(id: number) {
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
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi xóa chuyến đi",
                error: error.message
            };
        }
    }
}