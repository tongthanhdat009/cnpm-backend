import prisma from '../prisma/client';
import { diem_danh_chuyen_di_trang_thai } from '@prisma/client';

export class DiemDanhRepo {
  async findByIdWithTripStatus(id_diem_danh: number) {
    return prisma.diem_danh_chuyen_di.findUnique({
      where: { id_diem_danh },
      select: {
        id_diem_danh: true,
        id_chuyen_di: true,
        trang_thai: true,
        chuyen_di: { select: { id_chuyen_di: true, trang_thai: true } },
      },
    });
  }

  async updateTrangThai(id_diem_danh: number, trang_thai: diem_danh_chuyen_di_trang_thai) {
    // Ensure the record exists first to return clean 404 semantics
    const existed = await prisma.diem_danh_chuyen_di.findUnique({ where: { id_diem_danh } });
    if (!existed) return null;

    const updated = await prisma.diem_danh_chuyen_di.update({
      where: { id_diem_danh },
      data: { trang_thai },
    });

    return updated;
  }
}

export default new DiemDanhRepo();
