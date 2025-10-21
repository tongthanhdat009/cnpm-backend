const db = require('../database');

/**
 * Repository for tuyen_duong (routes)
 */
async function findAllTuyenDuong() {
  // Include related route stops (tuyen_duong_diem_dungs) with their diem_dung
  return await db.tuyen_duong.findAll({
    include: [
      {
        model: db.tuyen_duong_diem_dung,
        as: 'tuyen_duong_diem_dungs',
        include: [
          {
            model: db.diem_dung,
            as: 'id_diem_dung_diem_dung',
          },
        ],
      },
      {
        model: db.chuyen_di,
        as: 'chuyen_dis',
      },
      {
        model: db.phan_cong_hoc_sinh,
        as: 'phan_cong_hoc_sinhs',
      },
    ],
  });
}

module.exports = {
  findAllTuyenDuong,
};
