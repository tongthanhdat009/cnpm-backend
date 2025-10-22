import prisma from "../prisma/client";

export class TuyenDuongRepo {
  async getAll() {
    return await prisma.tuyen_duong.findMany({
      include: {
        tuyen_duong_diem_dung: {
          include: {
            diem_dung: true,
          },
        },
      },
    });
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
