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

  async getByPhuHuynh(idPhuHuynh: number) {
    return await prisma.hoc_sinh.findMany({
      where: { id_phu_huynh: idPhuHuynh },
      include: { 
        diem_dung: true,
        nguoi_dung: {
          select: {
            id_nguoi_dung: true,
            ho_ten: true,
            so_dien_thoai: true
          }
        }
      },
      orderBy: { id_hoc_sinh: 'asc' },
    });
  }
}

export default new HocSinhRepo();
