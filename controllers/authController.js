const db = require("../config/db");
const bcrypt = require("bcrypt");

/**
 * Xử lý đăng ký tài khoản mới
 * POST /api/v1/auth/register
 */
const register = async (req, res) => {
  try {
    const { ho_ten, ten_tai_khoan, mat_khau, so_dien_thoai, vai_tro } =
      req.body;

    // Validate input
    if (!ho_ten || !ten_tai_khoan || !mat_khau || !vai_tro) {
      return res.status(400).json({
        success: false,
        message:
          "Vui lòng nhập đầy đủ thông tin: họ tên, tên tài khoản, mật khẩu và vai trò",
      });
    }

    // Validate vai_tro
    const validRoles = ["quan_ly", "phu_huynh", "tai_xe"];
    if (!validRoles.includes(vai_tro)) {
      return res.status(400).json({
        success: false,
        message:
          "Vai trò không hợp lệ. Chỉ chấp nhận: quan_ly, phu_huynh, tai_xe",
      });
    }

    // Validate độ dài mật khẩu
    if (mat_khau.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      });
    }

    // Kiểm tra tên tài khoản đã tồn tại chưa
    const [existingUser] = await db.query(
      "SELECT id_nguoi_dung FROM nguoi_dung WHERE ten_tai_khoan = ?",
      [ten_tai_khoan]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Tên tài khoản đã tồn tại",
      });
    }

    // Kiểm tra số điện thoại đã tồn tại chưa (nếu có)
    if (so_dien_thoai) {
      const [existingPhone] = await db.query(
        "SELECT id_nguoi_dung FROM nguoi_dung WHERE so_dien_thoai = ?",
        [so_dien_thoai]
      );

      if (existingPhone.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Số điện thoại đã được sử dụng",
        });
      }
    }

    // Băm mật khẩu
    const saltRounds = 10;
    const mat_khau_bam = await bcrypt.hash(mat_khau, saltRounds);

    // Tạo tài khoản mới
    const [result] = await db.query(
      "INSERT INTO nguoi_dung (ho_ten, ten_tai_khoan, mat_khau_bam, so_dien_thoai, vai_tro) VALUES (?, ?, ?, ?, ?)",
      [ho_ten, ten_tai_khoan, mat_khau_bam, so_dien_thoai || null, vai_tro]
    );

    // Lấy thông tin người dùng vừa tạo
    const [newUser] = await db.query(
      "SELECT id_nguoi_dung, ho_ten, ten_tai_khoan, vai_tro, so_dien_thoai, ngay_tao FROM nguoi_dung WHERE id_nguoi_dung = ?",
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Tạo tài khoản thành công",
      data: newUser[0],
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
    });
  }
};

/**
 * Xử lý đăng nhập
 * POST /api/v1/auth/login
 */
const login = async (req, res) => {
  try {
    const { ten_tai_khoan, mat_khau } = req.body;

    // Validate input
    if (!ten_tai_khoan || !mat_khau) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ tên tài khoản và mật khẩu",
      });
    }

    // Tìm người dùng trong database
    const [rows] = await db.query(
      "SELECT id_nguoi_dung, ho_ten, ten_tai_khoan, mat_khau_bam, vai_tro, so_dien_thoai FROM nguoi_dung WHERE ten_tai_khoan = ?",
      [ten_tai_khoan]
    );

    // Kiểm tra tài khoản có tồn tại không
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Tên tài khoản hoặc mật khẩu không đúng",
      });
    }

    const user = rows[0];

    // So sánh mật khẩu
    // Nếu mật khẩu đã được băm bằng bcrypt
    const isPasswordValid = await bcrypt.compare(mat_khau, user.mat_khau_bam);

    // Nếu mật khẩu chưa băm (lưu plain text), dùng cách này:
    // const isPasswordValid = mat_khau === user.mat_khau_bam;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Tên tài khoản hoặc mật khẩu không đúng",
      });
    }

    // Đăng nhập thành công, trả về thông tin người dùng (không trả về mật khẩu)
    const userData = {
      id_nguoi_dung: user.id_nguoi_dung,
      ho_ten: user.ho_ten,
      ten_tai_khoan: user.ten_tai_khoan,
      vai_tro: user.vai_tro,
      so_dien_thoai: user.so_dien_thoai,
    };

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
    });
  }
};

module.exports = {
  login,
  register,
};
