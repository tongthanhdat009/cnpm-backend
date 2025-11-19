/**
 * Utility functions để xử lý múi giờ Việt Nam (UTC+7)
 */
/**
 * Lấy thời gian hiện tại theo múi giờ Việt Nam (UTC+7)
 */
export declare const getVietnamTime: () => Date;
/**
 * Chuyển đổi một Date object sang múi giờ Việt Nam
 * @param date - Date object cần chuyển đổi
 */
export declare const toVietnamTime: (date: Date) => Date;
/**
 * Tạo Date object từ chuỗi ngày và giờ theo múi giờ Việt Nam
 * @param dateStr - Ngày theo format YYYY-MM-DD
 * @param timeStr - Giờ theo format HH:mm:ss hoặc HH:mm
 */
export declare const createVietnamDateTime: (dateStr: string, timeStr: string) => Date;
/**
 * Format Date object sang string theo múi giờ Việt Nam
 * @param date - Date object cần format
 * @param format - 'date' | 'time' | 'datetime'
 */
export declare const formatVietnamTime: (date: Date, format?: "date" | "time" | "datetime") => string;
//# sourceMappingURL=timezone.d.ts.map