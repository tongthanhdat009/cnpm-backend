/**
 * Utility functions để xử lý múi giờ Việt Nam (UTC+7)
 */

/**
 * Lấy thời gian hiện tại theo múi giờ Việt Nam (UTC+7)
 */
export const getVietnamTime = (): Date => {
    const now = new Date();
    // Chuyển sang múi giờ Việt Nam (UTC+7)
    const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    return vietnamTime;
};

/**
 * Chuyển đổi một Date object sang múi giờ Việt Nam
 * @param date - Date object cần chuyển đổi
 */
export const toVietnamTime = (date: Date): Date => {
    return new Date(date.getTime() + (7 * 60 * 60 * 1000));
};

/**
 * Tạo Date object từ chuỗi ngày và giờ theo múi giờ Việt Nam
 * @param dateStr - Ngày theo format YYYY-MM-DD
 * @param timeStr - Giờ theo format HH:mm:ss hoặc HH:mm
 */
export const createVietnamDateTime = (dateStr: string, timeStr: string): Date => {
    const [hours = 0, minutes = 0, seconds = 0] = timeStr.split(':').map(Number);
    
    // Tạo Date từ string (UTC)
    const date = new Date(dateStr + 'T00:00:00Z');
    
    // Set giờ theo UTC (đã bao gồm +7)
    date.setUTCHours(hours, minutes, seconds, 0);
    
    return date;
};

/**
 * Format Date object sang string theo múi giờ Việt Nam
 * @param date - Date object cần format
 * @param format - 'date' | 'time' | 'datetime'
 */
export const formatVietnamTime = (date: Date, format: 'date' | 'time' | 'datetime' = 'datetime'): string => {
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
