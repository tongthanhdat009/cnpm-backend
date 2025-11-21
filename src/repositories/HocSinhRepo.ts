import prisma from '../prisma/client';

export class HocSinhRepo {
  async getAll() {
    return await prisma.hoc_sinh.findMany({
      include: {
        phan_cong_hoc_sinh: { select: { id_tuyen_duong: true } },
      },
      orderBy: { id_hoc_sinh: 'asc' },
    });
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
        nguoi_dung: { select: { id_nguoi_dung: true, ho_ten: true, so_dien_thoai: true } }
      },
      orderBy: { id_hoc_sinh: 'asc' },
    });
  }

  async create(data: any) {
    return await prisma.hoc_sinh.create({
      data: {
        ho_ten: data.ho_ten,
        lop: data.lop ?? null,
        ghi_chu: data.ghi_chu ?? null,
        id_phu_huynh: data.id_phu_huynh,
        id_diem_dung: data.id_diem_dung ?? null,
      },
    });
  }

  // ------ Thêm update ------
  async update(id: number, data: any) {
    return await prisma.hoc_sinh.update({
      where: { id_hoc_sinh: id },
      data: {
        ho_ten: data.ho_ten,
        lop: data.lop ?? null,
        ghi_chu: data.ghi_chu ?? null,
        id_phu_huynh: data.id_phu_huynh,
        id_diem_dung: data.id_diem_dung ?? null,
      },
    });
  }

  // ------ Thêm delete ------
  async delete(id: number) {
    return await prisma.hoc_sinh.delete({
      where: { id_hoc_sinh: id },
    });
  }
}

export default new HocSinhRepo();
