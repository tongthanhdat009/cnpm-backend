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
}

export default new DiemDungRepo();
