import prisma from "../prisma/client";
export class XeBuytRepository {
    async getAllXeBuyt() {
        return await prisma.xe_buyt.findMany({
            select: {
                id_xe_buyt: true,
                bien_so_xe: true,
                so_ghe: true,
                hang: true,
                vi_do_hien_tai: true,
                kinh_do_hien_tai: true,
                anh: true
            },
            orderBy: {
                id_xe_buyt: 'asc'
            }
        });
    }
    async getXeBuytById(id: number){
        return await prisma.xe_buyt.findUnique({
            where: { id_xe_buyt: id },
            select: {
                id_xe_buyt: true,
                bien_so_xe: true,
                so_ghe: true,
                hang: true,
                vi_do_hien_tai: true,
                kinh_do_hien_tai: true,
                anh: true
            },
        });
    }
}