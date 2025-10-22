import { TuyenDuongRepo } from "../repositories/TuyenDuongRepo";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export class TuyenDuongService {
  private repo: TuyenDuongRepo;

  constructor() {
    this.repo = new TuyenDuongRepo();
  }

  async getAll() {
    const result = await this.repo.getAll();
    return result;
  }

  async create(data: any) {
    // Chuẩn hóa input và kiểm tra tối thiểu 2 điểm dừng
    const stops = Array.isArray(data?.tuyen_duong_diem_dung)
      ? data.tuyen_duong_diem_dung
      : [];

    if (stops.length < 3) {
      throw new Error("Danh sách điểm dừng phải có ít nhất 3 điểm");
    }

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

  async getTuyenDuongById(id: number) {
    const result = await this.repo.getTuyenDuongById(id);
    return result;
  }

  /**
   * Tính toán thời lượng di chuyển dự kiến của một tuyến đường
   * @param {number} id_tuyen_duong - ID của tuyến đường
   * @returns {number} - Thời lượng dự kiến (phút)
   */
  async getThoiLuongDuKien(id_tuyen_duong: number) {
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
      .filter((dd): dd is NonNullable<typeof dd> => dd !== null);
    
    if (stops.length < 2) {
      throw new Error('Không đủ điểm dừng hợp lệ để tính toán.');
    }

    // Định dạng: "lat,lng"
    const firstStop = stops[0]!; // Non-null assertion vì đã kiểm tra stops.length >= 2
    const lastStop = stops[stops.length - 1]!; // Non-null assertion vì đã kiểm tra stops.length >= 2
    
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
      const response = await axios.get(url, {
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
        const durationInSeconds = route.legs?.reduce((total: number, leg: any) => total + (leg.duration?.value || 0), 0) || route.duration;
        const distanceInMeters = route.legs?.reduce((total: number, leg: any) => total + (leg.distance?.value || 0), 0) || route.distance;
        
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
      } else {
        console.error('❌ Không có routes trong response:', response.data);
        throw new Error('Không thể tính toán lộ trình.');
      }
    } catch (error: any) {
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
export default new TuyenDuongService();