import prisma from '../prisma/client';

export class HocSinhRepo {
  async getAll() {

    const data = await prisma.hoc_sinh.findMany({
      include: {
        phan_cong_hoc_sinh: {
          select: {
            id_tuyen_duong: true,
          },
        }
      },
      orderBy: { id_hoc_sinh: 'asc' },
    });

    return data;
  }

  async getById(id: number) {
    return await prisma.hoc_sinh.findUnique({
      where: { id_hoc_sinh: id },
      include: { diem_dung: true },
    });
  }
}

export default new HocSinhRepo();
