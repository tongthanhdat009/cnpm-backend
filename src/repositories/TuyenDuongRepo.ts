import prisma from "../prisma/client";

export class TuyenDuongRepo {
  async getAll() {
    return await prisma.tuyen_duong.findMany({
      select: {
        id_tuyen_duong: true,
        ten_tuyen_duong: true,
        mo_ta: true,
        tuyen_duong_diem_dung: {
          select: {
            thu_tu_diem_dung: true,
            diem_dung: {
              select: {
                id_diem_dung: true,
                ten_diem_dung: true,
                dia_chi: true,
                kinh_do: true,
                vi_do: true,
              },
            },
          },
        },
        phan_cong_hoc_sinh: {
          select: {
            hoc_sinh: {
              select: {
                id_hoc_sinh: true,
                ho_ten: true,
              },
            },
          },
        },
      },
    });
  }
  async checkNameExists(ten_tuyen_duong: string) {
    const count = await prisma.tuyen_duong.count({
      where: { ten_tuyen_duong },
    });
    return count > 0;
  }

  async create(data: any) {
    return await prisma.tuyen_duong.create({
      data: {
        ten_tuyen_duong: data.ten_tuyen_duong,
        mo_ta: data.mo_ta,
        tuyen_duong_diem_dung: {
          create: data.tuyen_duong_diem_dung.map((item: any) => ({
            diem_dung: {
              connect: { id_diem_dung: item.id_diem_dung },
            },
            thu_tu_diem_dung: item.thu_tu_diem_dung,
          }))
        }
      }
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
