import prisma from "../prisma/client";
import { broadcastToTripRoom } from "../websocket";

export class BusTrackingService {
    /**
     * Cập nhật vị trí xe buýt và broadcast qua WebSocket
     */
    async updateBusLocation(idXeBuyt: number, viDo: number, kinhDo: number) {
        try {
            // Cập nhật vị trí xe trong database
            const updatedBus = await prisma.xe_buyt.update({
                where: { id_xe_buyt: idXeBuyt },
                data: {
                    vi_do_hien_tai: viDo,
                    kinh_do_hien_tai: kinhDo,
                    lan_cap_nhat_cuoi: new Date()
                }
            });

            // Tìm TẤT CẢ các chuyến đi đang hoạt động của xe này
            const activeTrips = await prisma.chuyen_di.findMany({
                where: {
                    id_xe_buyt: idXeBuyt,
                    trang_thai: 'dang_di'
                },
                include: {
                    tuyen_duong: true,
                    nguoi_dung: true,
                    diem_danh_chuyen_di: {
                        include: {
                            hoc_sinh: {
                                include: {
                                    nguoi_dung: true // phụ huynh
                                }
                            }
                        }
                    }
                }
            });

            // 🚀 Broadcast vị trí cho từng chuyến đi - ROOM-BASED (Siêu nhanh!)
            for (const activeTrip of activeTrips) {
                const locationUpdate = {
                    type: 'bus_location_update',
                    data: {
                        id_chuyen_di: activeTrip.id_chuyen_di,
                        id_xe_buyt: idXeBuyt,
                        bien_so_xe: updatedBus.bien_so_xe,
                        vi_do: viDo.toString(),
                        kinh_do: kinhDo.toString(),
                        thoi_gian: new Date().toISOString(),
                        tuyen_duong: activeTrip.tuyen_duong?.ten_tuyen_duong
                    }
                };

                // Chỉ gửi đến clients trong room của chuyến này - O(k) complexity
                broadcastToTripRoom(activeTrip.id_chuyen_di, locationUpdate);
            }

            return {
                success: true,
                message: "Cập nhật vị trí xe thành công",
                data: {
                    id_xe_buyt: updatedBus.id_xe_buyt,
                    bien_so_xe: updatedBus.bien_so_xe,
                    vi_do: updatedBus.vi_do_hien_tai?.toString(),
                    kinh_do: updatedBus.kinh_do_hien_tai?.toString(),
                    lan_cap_nhat_cuoi: updatedBus.lan_cap_nhat_cuoi,
                    active_trips_count: activeTrips.length
                }
            };
        } catch (error: any) {
            console.error("Error updating bus location:", error);
            return {
                success: false,
                message: "Lỗi khi cập nhật vị trí xe",
                error: error.message
            };
        }
    }

    /**
     * Lấy vị trí hiện tại của xe buýt
     */
    async getBusLocation(idXeBuyt: number) {
        try {
            const bus = await prisma.xe_buyt.findUnique({
                where: { id_xe_buyt: idXeBuyt },
                select: {
                    id_xe_buyt: true,
                    bien_so_xe: true,
                    vi_do_hien_tai: true,
                    kinh_do_hien_tai: true,
                    lan_cap_nhat_cuoi: true
                }
            });

            if (!bus) {
                return {
                    success: false,
                    message: "Không tìm thấy xe buýt"
                };
            }

            return {
                success: true,
                message: "Lấy vị trí xe thành công",
                data: {
                    id_xe_buyt: bus.id_xe_buyt,
                    bien_so_xe: bus.bien_so_xe,
                    vi_do: bus.vi_do_hien_tai?.toString(),
                    kinh_do: bus.kinh_do_hien_tai?.toString(),
                    lan_cap_nhat_cuoi: bus.lan_cap_nhat_cuoi
                }
            };
        } catch (error: any) {
            console.error("Error getting bus location:", error);
            return {
                success: false,
                message: "Lỗi khi lấy vị trí xe",
                error: error.message
            };
        }
    }

    /**
     * Lấy vị trí xe của chuyến đi đang hoạt động
     */
    async getActiveTripBusLocation(idChuyenDi: number) {
        try {
            const trip = await prisma.chuyen_di.findUnique({
                where: { id_chuyen_di: idChuyenDi },
                include: {
                    xe_buyt: {
                        select: {
                            id_xe_buyt: true,
                            bien_so_xe: true,
                            vi_do_hien_tai: true,
                            kinh_do_hien_tai: true,
                            lan_cap_nhat_cuoi: true
                        }
                    },
                    tuyen_duong: {
                        select: {
                            ten_tuyen_duong: true
                        }
                    }
                }
            });

            if (!trip) {
                return {
                    success: false,
                    message: "Không tìm thấy chuyến đi"
                };
            }

            if (!trip.xe_buyt) {
                return {
                    success: false,
                    message: "Chuyến đi chưa được gán xe"
                };
            }

            return {
                success: true,
                message: "Lấy vị trí xe của chuyến đi thành công",
                data: {
                    id_chuyen_di: trip.id_chuyen_di,
                    trang_thai: trip.trang_thai,
                    tuyen_duong: trip.tuyen_duong?.ten_tuyen_duong,
                    xe_buyt: {
                        id_xe_buyt: trip.xe_buyt.id_xe_buyt,
                        bien_so_xe: trip.xe_buyt.bien_so_xe,
                        vi_do: trip.xe_buyt.vi_do_hien_tai?.toString(),
                        kinh_do: trip.xe_buyt.kinh_do_hien_tai?.toString(),
                        lan_cap_nhat_cuoi: trip.xe_buyt.lan_cap_nhat_cuoi
                    }
                }
            };
        } catch (error: any) {
            console.error("Error getting active trip bus location:", error);
            return {
                success: false,
                message: "Lỗi khi lấy vị trí xe của chuyến đi",
                error: error.message
            };
        }
    }

    /**
     * Lấy danh sách chuyến đi đang hoạt động của học sinh (cho phụ huynh)
     */
    async getActiveTripsForStudent(idHocSinh: number) {
        try {
            const activeTrips = await prisma.diem_danh_chuyen_di.findMany({
                where: {
                    id_hoc_sinh: idHocSinh,
                    chuyen_di: {
                        trang_thai: 'dang_di'
                    }
                },
                include: {
                    chuyen_di: {
                        include: {
                            tuyen_duong: {
                                include: {
                                    tuyen_duong_diem_dung: {
                                        include: {
                                            diem_dung: true
                                        },
                                        orderBy: {
                                            thu_tu_diem_dung: 'asc'
                                        }
                                    }
                                }
                            },
                            xe_buyt: true,
                            nguoi_dung: true
                        }
                    },
                    diem_dung: true
                }
            });

            return {
                success: true,
                message: "Lấy danh sách chuyến đi đang hoạt động thành công",
                data: activeTrips.map(dd => ({
                    id_diem_danh: dd.id_diem_danh,
                    trang_thai_diem_danh: dd.trang_thai,
                    diem_dung: dd.diem_dung,
                    chuyen_di: {
                        id_chuyen_di: dd.chuyen_di?.id_chuyen_di,
                        loai_chuyen_di: dd.chuyen_di?.loai_chuyen_di,
                        gio_khoi_hanh: dd.chuyen_di?.gio_khoi_hanh,
                        ngay: dd.chuyen_di?.ngay,
                        trang_thai: dd.chuyen_di?.trang_thai,
                        tuyen_duong: dd.chuyen_di?.tuyen_duong,
                        xe_buyt: {
                            id_xe_buyt: dd.chuyen_di?.xe_buyt?.id_xe_buyt,
                            bien_so_xe: dd.chuyen_di?.xe_buyt?.bien_so_xe,
                            vi_do: dd.chuyen_di?.xe_buyt?.vi_do_hien_tai?.toString(),
                            kinh_do: dd.chuyen_di?.xe_buyt?.kinh_do_hien_tai?.toString(),
                            lan_cap_nhat_cuoi: dd.chuyen_di?.xe_buyt?.lan_cap_nhat_cuoi
                        },
                        tai_xe: dd.chuyen_di?.nguoi_dung
                    }
                }))
            };
        } catch (error: any) {
            console.error("Error getting active trips for student:", error);
            return {
                success: false,
                message: "Lỗi khi lấy danh sách chuyến đi",
                error: error.message
            };
        }
    }
}
