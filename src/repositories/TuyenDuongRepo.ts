import prisma from "../prisma/client";

export class TuyenDuongRepo {
async getAll() {
  const today = new Date();

  const data = await prisma.tuyen_duong.findMany({
    where: {
      isDelete: false, // ✅ chỉ lấy tuyến chưa bị xóa
    },
    select: {
      id_tuyen_duong: true,
      ten_tuyen_duong: true,
      quang_duong: true,
      thoi_gian_du_kien: true,
      mo_ta: true,
      tuyen_duong_diem_dung: {
        select: {
          thu_tu_diem_dung: true,
          id_diem_dung: true,
        },
      },
      phan_cong_hoc_sinh: {
        select: {
          id_hoc_sinh: true,
        },
      },
      // ✅ chỉ đếm số chuyến đi có ngày < hôm nay
      _count: {
        select: {
          chuyen_di: {
            where: {
              trang_thai: { not: 'cho_khoi_hanh' },
            },
          },
        },
      },
    },
  });

  const result = data.map(td => ({
    ...td,
    phan_cong_hoc_sinh: td.phan_cong_hoc_sinh.map(pc => pc.id_hoc_sinh),
    // ✅ Nếu có ít nhất 1 chuyến trước hôm nay => true
    is_use: td._count.chuyen_di > 0,
  }));

  return result;
}

  async checkNameExists(ten_tuyen_duong: string): Promise<boolean> {
    const count = await prisma.tuyen_duong.count({
      where: { ten_tuyen_duong },
    });
    return count > 0;
  }

  async create(data: {
    ten_tuyen_duong: string;
    quang_duong: number;
    thoi_gian_du_kien?: number | null;
    mo_ta?: string | null;
    tuyen_duong_diem_dung: Array<{ so_thu_tu: number; id_diem_dung: number }>;
  }) {
    // Map input so_thu_tu -> thu_tu_diem_dung for DB
    const diemDungCreates = data.tuyen_duong_diem_dung.map((d) => ({
      thu_tu_diem_dung: d.so_thu_tu,
      id_diem_dung: d.id_diem_dung,
    }));

    const created = await prisma.tuyen_duong.create({
      data: {
        ten_tuyen_duong: data.ten_tuyen_duong,
        quang_duong: data.quang_duong,
        thoi_gian_du_kien: data.thoi_gian_du_kien ?? null,
        mo_ta: data.mo_ta ?? null,
        tuyen_duong_diem_dung: {
          create: diemDungCreates,
        },
      },
      include: {
        tuyen_duong_diem_dung: true,
      },
    });

    // Chuẩn hóa output: đổi về key frontend quen dùng
    return {
      id_tuyen_duong: created.id_tuyen_duong,
      ten_tuyen_duong: created.ten_tuyen_duong,
      quang_duong: created.quang_duong,
      thoi_gian_du_kien: created.thoi_gian_du_kien,
      mo_ta: created.mo_ta,
      tuyen_duong_diem_dung: created.tuyen_duong_diem_dung
        .sort((a, b) => a.thu_tu_diem_dung - b.thu_tu_diem_dung)
        .map((d) => ({
          so_thu_tu: d.thu_tu_diem_dung,
          id_diem_dung: d.id_diem_dung!,
        })),
    };
  }
        
          
  async getTuyenDuongById(id: number) {
    return await prisma.tuyen_duong.findUnique({
      where: { id_tuyen_duong: id },
      include: {
        tuyen_duong_diem_dung: {
          include: {
            diem_dung: true,
          },
        },
      },
    });
  }

  // Kiểm tra xem tuyến đường đã được tham chiếu bởi ít nhất 1 chuyen_di hay chưa
  async isTuyenDuongUsed(id_tuyen_duong: number): Promise<boolean> {
    const count = await prisma.chuyen_di.count({
      where: { id_tuyen_duong, trang_thai: { not: 'cho_khoi_hanh' } },
    });
    return count > 0;
  }

  /**
   * Xóa tuyến đường theo rule:
   * - Xóa tất cả chuyen_di với trang_thai = 'cho_khoi_hanh' (chưa khởi hành)
   * - Nếu tuyến đã được sử dụng (isTuyenDuongUsed == true) => soft delete: set isDelete = true và thêm dấu '*' vào tên (nếu chưa có)
   * - Nếu chưa được sử dụng => hard delete (xóa record tuyen_duong)
   * Trả về thông tin tóm tắt
   */
  async deleteTuyenDuong(id_tuyen_duong: number) {
    // 1) Xóa các chuyến chưa khởi hành
    const deletedTrips = await prisma.chuyen_di.deleteMany({
      where: { id_tuyen_duong, trang_thai: 'cho_khoi_hanh' },
    });

    // 2) Kiểm tra xem tuyến có được sử dụng (còn chuyến với trạng thái khác 'cho_khoi_hanh')
    const used = await this.isTuyenDuongUsed(id_tuyen_duong);

    if (used) {
      // Soft delete: set isDelete = true and append '*' to name if not already
      const tuyen = await prisma.tuyen_duong.findUnique({ where: { id_tuyen_duong } });
      if (!tuyen) {
        return { type: 'not_found' as const, deletedTrips: deletedTrips.count };
      }

      let newName = tuyen.ten_tuyen_duong;
      if (!newName.endsWith('*')) newName = `${newName}*`;

      await prisma.tuyen_duong.update({
        where: { id_tuyen_duong },
        data: { isDelete: true, ten_tuyen_duong: newName },
      });

      return { type: 'soft' as const, deletedTrips: deletedTrips.count };
    }

    // Not used => hard delete the route (this will cascade to related records if DB configured)
    await prisma.tuyen_duong.delete({ where: { id_tuyen_duong } });
    return { type: 'hard' as const, deletedTrips: deletedTrips.count };
  }

  // Thêm học sinh vào tuyến đường (tạo bản ghi phan_cong_hoc_sinh)
  async assignHocSinhToTuyen(id_tuyen_duong: number, id_hoc_sinh: number) {
    // Kiểm tra tồn tại
    const tuyen = await prisma.tuyen_duong.findUnique({ where: { id_tuyen_duong } });
    if (!tuyen) return { type: 'not_found_tuyen' as const };

    const hs = await prisma.hoc_sinh.findUnique({ where: { id_hoc_sinh } });
    if (!hs) return { type: 'not_found_hoc_sinh' as const };

    // Tránh trùng
    const existed = await prisma.phan_cong_hoc_sinh.findFirst({ where: { id_tuyen_duong, id_hoc_sinh } });
    if (existed) return { type: 'existed' as const };

    const created = await prisma.phan_cong_hoc_sinh.create({
      data: { id_tuyen_duong, id_hoc_sinh },
    });

    // Sau khi phân công, tạo bản ghi điểm danh cho tất cả chuyến đi của tuyến (trừ chuyến đã hoàn thành)
    // Sử dụng id_diem_dung của học sinh; nếu học sinh chưa có điểm dừng, bỏ qua bước điểm danh
    if (hs.id_diem_dung != null) {
      const trips = await prisma.chuyen_di.findMany({
        where: { id_tuyen_duong, trang_thai: 'cho_khoi_hanh' },
        select: { id_chuyen_di: true },
      });
      console.log("Trips to create attendance for:", trips);

      const now = new Date();
      for (const trip of trips) {
        // Tránh trùng lặp nếu đã tồn tại bản ghi điểm danh
        const existedAttendance = await prisma.diem_danh_chuyen_di.findFirst({
          where: {
            id_chuyen_di: trip.id_chuyen_di,
            id_hoc_sinh: id_hoc_sinh,
          },
        });
        if (!existedAttendance) {
          await prisma.diem_danh_chuyen_di.create({
            data: {
              id_chuyen_di: trip.id_chuyen_di,
              id_hoc_sinh: id_hoc_sinh,
              id_diem_dung: hs.id_diem_dung,
              // Giả định trạng thái khởi tạo là 'vang_mat' như trạng thái chờ, có thể đổi nếu bạn muốn
              trang_thai: 'chua_don',
              thoi_gian: now,
            },
          });
        }
      }
    }

    return { type: 'created' as const, record: created };
  }

  // Xóa học sinh khỏi tuyến đường (xóa bản ghi phan_cong_hoc_sinh)
  async removeHocSinhFromTuyen(id_tuyen_duong: number, id_hoc_sinh: number) {
    const outcome = await prisma.$transaction(async (tx) => {
      // Lấy danh sách chuyến đi chưa hoàn thành của tuyến
      const trips = await tx.chuyen_di.findMany({
        where: { id_tuyen_duong, trang_thai: 'cho_khoi_hanh'},
        select: { id_chuyen_di: true },
      });

      const tripIds = trips.map(t => t.id_chuyen_di);
      let deletedAttendance = 0;
      if (tripIds.length > 0) {
        const delAtt = await tx.diem_danh_chuyen_di.deleteMany({
          where: {
            id_hoc_sinh,
            id_chuyen_di: { in: tripIds },
          },
        });
        deletedAttendance = delAtt.count;
      }

      const delAssign = await tx.phan_cong_hoc_sinh.deleteMany({
        where: { id_tuyen_duong, id_hoc_sinh },
      });

      if (delAssign.count === 0) {
        return { type: 'not_found' as const, deletedAttendance };
      }

      return { type: 'deleted' as const, deletedCount: delAssign.count, deletedAttendance };
    });

    return outcome;
  }

}
