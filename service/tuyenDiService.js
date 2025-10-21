const repo = require('../repository/tuyenDiRepository');

async function getAllTuyenDi() {
  return await repo.findAllTuyenDuong();
}

module.exports = {
  getAllTuyenDi,
};
