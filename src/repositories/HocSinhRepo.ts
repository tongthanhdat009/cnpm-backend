import prisma from '../prisma/client';

export class HocSinhRepo {
  async getAll() {
    const data = await prisma.hoc_sinh.findMany({
      select: {
        id_hoc_sinh: true,
        id_phu_huynh: true,
        id_diem_dung: true,
        ho_ten: true,
        lop: true,
        ghi_chu: true,
        diem_dung: {
          select: {
            id_diem_dung: true,
            ten_diem_dung: true,
            dia_chi: true,
            vi_do: true,
            kinh_do: true,
          },
        },
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
