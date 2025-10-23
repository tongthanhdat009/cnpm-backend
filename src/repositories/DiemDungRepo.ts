import prisma from '../prisma/client';

export class DiemDungRepo {
  async getAll() {
    const data = await prisma.diem_dung.findMany({
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
}

export default new DiemDungRepo();
