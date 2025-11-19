"use strict";
/**
 * Utility functions để xử lý múi giờ Việt Nam (UTC+7)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatVietnamTime = exports.createVietnamDateTime = exports.toVietnamTime = exports.getVietnamTime = void 0;
/**
 * Lấy thời gian hiện tại theo múi giờ Việt Nam (UTC+7)
 */
const getVietnamTime = () => {
    const now = new Date();
    // Chuyển sang múi giờ Việt Nam (UTC+7)
    const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    return vietnamTime;
};
exports.getVietnamTime = getVietnamTime;
/**
 * Chuyển đổi một Date object sang múi giờ Việt Nam
 * @param date - Date object cần chuyển đổi
 */
const toVietnamTime = (date) => {
    return new Date(date.getTime() + (7 * 60 * 60 * 1000));
};
exports.toVietnamTime = toVietnamTime;
/**
 * Tạo Date object từ chuỗi ngày và giờ theo múi giờ Việt Nam
 * @param dateStr - Ngày theo format YYYY-MM-DD
 * @param timeStr - Giờ theo format HH:mm:ss hoặc HH:mm
 */
const createVietnamDateTime = (dateStr, timeStr) => {
    const [hours = 0, minutes = 0, seconds = 0] = timeStr.split(':').map(Number);
    // Tạo Date từ string (UTC)
    const date = new Date(dateStr + 'T00:00:00Z');
    // Set giờ theo UTC (đã bao gồm +7)
    date.setUTCHours(hours, minutes, seconds, 0);
    return date;
};
exports.createVietnamDateTime = createVietnamDateTime;
/**
 * Format Date object sang string theo múi giờ Việt Nam
 * @param date - Date object cần format
 * @param format - 'date' | 'time' | 'datetime'
 */
const formatVietnamTime = (date, format = 'datetime') => {
    const vnDate = new Date(date.getTime() + (7 * 60 * 60 * 1000));
    const isoString = vnDate.toISOString();
    if (format === 'date') {
        return isoString.split('T')[0] || '';
    }
    if (format === 'time') {
        return isoString.substr(11, 8);
    }
    return isoString.replace('T', ' ').substr(0, 19);
};
exports.formatVietnamTime = formatVietnamTime;
//# sourceMappingURL=timezone.js.map