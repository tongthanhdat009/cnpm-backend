import prisma from '../prisma/client';

export class DiemDungRepo {
  async getAll(q?: string) {
    const where: any = {};
    if (q && q.trim()) {
      where.OR = [
        { ten_diem_dung: { contains: q.trim(), mode: 'insensitive' } as any },
        { dia_chi: { contains: q.trim(), mode: 'insensitive' } as any },
      ];
    }
    const data = await prisma.diem_dung.findMany({
      where,
      select: {
        id_diem_dung: true,
        ten_diem_dung: true,
        dia_chi: true,
        vi_do: true,
        kinh_do: true,
      },
      orderBy: { id_diem_dung: 'asc' },
    });

    return data;
  }

  async getById(id: number) {
    return await prisma.diem_dung.findUnique({
      where: { id_diem_dung: id },
    });
  }

  // Trả về danh sách { id_diem_dung, so_luong_hoc_sinh_con }
  async getUnassignedStudentCounts() {
    const result = await prisma.$queryRaw`
      SELECT hoc_sinh.id_diem_dung AS id_diem_dung, COUNT(hoc_sinh.id_hoc_sinh) AS so_luong_hoc_sinh_con
      FROM hoc_sinh
      WHERE hoc_sinh.id_hoc_sinh NOT IN (
        SELECT phan_cong_hoc_sinh.id_hoc_sinh
        FROM phan_cong_hoc_sinh
      )
      GROUP BY hoc_sinh.id_diem_dung;
    `;

    // Prisma may return BigInt for count/ids depending on DB driver. Convert to numbers/strings to be JSON-safe.
    const mapped = (result as any[]).map(row => ({
      id_diem_dung: typeof row.id_diem_dung === 'bigint' ? Number(row.id_diem_dung) : row.id_diem_dung,
      so_luong_hoc_sinh_con: typeof row.so_luong_hoc_sinh_con === 'bigint' ? Number(row.so_luong_hoc_sinh_con) : Number(row.so_luong_hoc_sinh_con)
    }));

    return mapped as Array<{ id_diem_dung: number; so_luong_hoc_sinh_con: number }>;
  }

  async create(data: { ten_diem_dung: string; dia_chi?: string | null; vi_do: number; kinh_do: number }) {
    return await prisma.diem_dung.create({
      data: {
        ten_diem_dung: data.ten_diem_dung,
        dia_chi: data.dia_chi ?? null,
        vi_do: new (require('@prisma/client').Prisma.Decimal)(data.vi_do),
        kinh_do: new (require('@prisma/client').Prisma.Decimal)(data.kinh_do),
      },
    });
  }

  async update(id: number, data: Partial<{ ten_diem_dung: string; dia_chi: string | null; vi_do: number; kinh_do: number }>) {
    const payload: any = {};
    if (data.ten_diem_dung !== undefined) payload.ten_diem_dung = data.ten_diem_dung;
    if (data.dia_chi !== undefined) payload.dia_chi = data.dia_chi;
    if (data.vi_do !== undefined) payload.vi_do = new (require('@prisma/client').Prisma.Decimal)(data.vi_do);
    if (data.kinh_do !== undefined) payload.kinh_do = new (require('@prisma/client').Prisma.Decimal)(data.kinh_do);
    return await prisma.diem_dung.update({ where: { id_diem_dung: id }, data: payload });
  }

  async hasDependencies(id: number) {
    // Kiểm tra xem trạm có đang được sử dụng trong điểm danh chuyến đi nào không
    const countDiemDanh = await prisma.diem_danh_chuyen_di.count({
      where: { id_diem_dung: id }
    });
    if (countDiemDanh > 0) return true;

    // Kiểm tra xem trạm có thuộc tuyến đường nào đang có chuyến đi không
    const countTuyenDuong = await prisma.tuyen_duong_diem_dung.count({
      where: {
        id_diem_dung: id,
        tuyen_duong: {
          chuyen_di: {
            some: {} // Có ít nhất 1 chuyến đi sử dụng tuyến đường này
          }
        }
      }
    });
    if (countTuyenDuong > 0) return true;

    return false;
  }

  async delete(id: number) {
    return await prisma.diem_dung.delete({ where: { id_diem_dung: id } });
  }
}

export default new DiemDungRepo();
