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
              ngay: { lt: today },
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




  async checkNameExists(ten_tuyen_duong: string) {
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

}
