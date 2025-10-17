const express = require("express");
const router = express.Router();
const {
  diem_dung,
  tuyen_duong_diem_dung,
  tuyen_duong,
} = require("../database");

/**
 * GET /api/diem-dung
 * Lấy tất cả thông tin điểm dừng kèm theo tuyến đường
 */
router.get("/", async (req, res) => {
  try {
    const diemDungList = await diem_dung.findAll({
      attributes: [
        "id_diem_dung",
        "ten_diem_dung",
        "dia_chi",
        "vi_do",
        "kinh_do",
      ],
      include: [
        {
          model: tuyen_duong_diem_dung,
          as: "tuyen_duong_diem_dungs", // Sử dụng alias đúng từ init-models
          required: false, // LEFT JOIN để lấy cả điểm dừng chưa có tuyến
          attributes: ["thu_tu_diem_dung"],
          include: [
            {
              model: tuyen_duong,
              as: "id_tuyen_duong_tuyen_duong", // Sử dụng alias đúng từ init-models
              attributes: ["id_tuyen_duong", "ten_tuyen_duong", "mo_ta"],
            },
          ],
        },
      ],
      order: [["id_diem_dung", "ASC"]],
    });

    // Format lại dữ liệu để dễ sử dụng
    const formattedData = diemDungList.map((diemDung) => ({
      id_diem_dung: diemDung.id_diem_dung,
      ten_diem_dung: diemDung.ten_diem_dung,
      dia_chi: diemDung.dia_chi,
      toa_do: {
        vi_do: parseFloat(diemDung.vi_do),
        kinh_do: parseFloat(diemDung.kinh_do),
      },
      tuyen_duong:
        diemDung.tuyen_duong_diem_dungs
          ?.map((td) => ({
            id_tuyen_duong: td.id_tuyen_duong_tuyen_duong?.id_tuyen_duong,
            ten_tuyen_duong: td.id_tuyen_duong_tuyen_duong?.ten_tuyen_duong,
            mo_ta: td.id_tuyen_duong_tuyen_duong?.mo_ta,
            thu_tu_diem_dung: td.thu_tu_diem_dung,
          }))
          .filter((td) => td.id_tuyen_duong) || [],
    }));

    res.status(200).json({
      success: true,
      message: "Lấy danh sách điểm dừng thành công",
      data: formattedData,
      total: formattedData.length,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách điểm dừng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách điểm dừng",
      error: error.message,
    });
  }
});

/**
 * GET /api/diem-dung/:id
 * Lấy thông tin chi tiết một điểm dừng theo ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const diemDung = await diem_dung.findByPk(id, {
      include: [
        {
          model: tuyen_duong_diem_dung,
          as: "tuyen_duong_diem_dungs",
          required: false,
          attributes: ["thu_tu_diem_dung"],
          include: [
            {
              model: tuyen_duong,
              as: "id_tuyen_duong_tuyen_duong",
              attributes: ["id_tuyen_duong", "ten_tuyen_duong", "mo_ta"],
            },
          ],
        },
      ],
    });

    if (!diemDung) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy điểm dừng",
      });
    }

    const formattedData = {
      id_diem_dung: diemDung.id_diem_dung,
      ten_diem_dung: diemDung.ten_diem_dung,
      dia_chi: diemDung.dia_chi,
      toa_do: {
        vi_do: parseFloat(diemDung.vi_do),
        kinh_do: parseFloat(diemDung.kinh_do),
      },
      tuyen_duong:
        diemDung.tuyen_duong_diem_dungs
          ?.map((td) => ({
            id_tuyen_duong: td.id_tuyen_duong_tuyen_duong?.id_tuyen_duong,
            ten_tuyen_duong: td.id_tuyen_duong_tuyen_duong?.ten_tuyen_duong,
            mo_ta: td.id_tuyen_duong_tuyen_duong?.mo_ta,
            thu_tu_diem_dung: td.thu_tu_diem_dung,
          }))
          .filter((td) => td.id_tuyen_duong) || [],
    };

    res.status(200).json({
      success: true,
      message: "Lấy thông tin điểm dừng thành công",
      data: formattedData,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin điểm dừng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thông tin điểm dừng",
      error: error.message,
    });
  }
});

/**
 * GET /api/diem-dung/tuyen/:id_tuyen_duong
 * Lấy danh sách điểm dừng theo tuyến đường
 */
router.get("/tuyen/:id_tuyen_duong", async (req, res) => {
  try {
    const { id_tuyen_duong } = req.params;

    const diemDungList = await diem_dung.findAll({
      include: [
        {
          model: tuyen_duong_diem_dung,
          as: "tuyen_duong_diem_dungs",
          where: { id_tuyen_duong },
          attributes: ["thu_tu_diem_dung"],
          include: [
            {
              model: tuyen_duong,
              as: "id_tuyen_duong_tuyen_duong",
              attributes: ["id_tuyen_duong", "ten_tuyen_duong", "mo_ta"],
            },
          ],
        },
      ],
      order: [
        [
          { model: tuyen_duong_diem_dung, as: "tuyen_duong_diem_dungs" },
          "thu_tu_diem_dung",
          "ASC",
        ],
      ],
    });

    const formattedData = diemDungList.map((diemDung) => ({
      id_diem_dung: diemDung.id_diem_dung,
      ten_diem_dung: diemDung.ten_diem_dung,
      dia_chi: diemDung.dia_chi,
      toa_do: {
        vi_do: parseFloat(diemDung.vi_do),
        kinh_do: parseFloat(diemDung.kinh_do),
      },
      thu_tu_diem_dung: diemDung.tuyen_duong_diem_dungs[0]?.thu_tu_diem_dung,
      tuyen_duong: {
        id_tuyen_duong:
          diemDung.tuyen_duong_diem_dungs[0]?.id_tuyen_duong_tuyen_duong
            ?.id_tuyen_duong,
        ten_tuyen_duong:
          diemDung.tuyen_duong_diem_dungs[0]?.id_tuyen_duong_tuyen_duong
            ?.ten_tuyen_duong,
        mo_ta:
          diemDung.tuyen_duong_diem_dungs[0]?.id_tuyen_duong_tuyen_duong?.mo_ta,
      },
    }));

    res.status(200).json({
      success: true,
      message: "Lấy danh sách điểm dừng theo tuyến thành công",
      data: formattedData,
      total: formattedData.length,
    });
  } catch (error) {
    console.error("Lỗi khi lấy điểm dừng theo tuyến:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy điểm dừng theo tuyến",
      error: error.message,
    });
  }
});

module.exports = router;
