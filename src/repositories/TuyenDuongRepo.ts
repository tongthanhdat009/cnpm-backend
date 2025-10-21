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
}
