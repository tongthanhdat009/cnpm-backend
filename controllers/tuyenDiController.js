const tuyenDiService = require('../service/tuyenDiService');

const getAllTuyenDi = async (req, res) => {
  try {
    const tuyenDis = await tuyenDiService.getAllTuyenDi();
    res.status(200).json({ success: true, data: tuyenDis });
  } catch (error) {
    console.error('Error fetching tuyen di:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getAllTuyenDi,
};
