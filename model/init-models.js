var DataTypes = require("sequelize").DataTypes;
var _chuyen_di = require("./chuyen_di");
var _diem_danh_chuyen_di = require("./diem_danh_chuyen_di");
var _diem_dung = require("./diem_dung");
var _hoc_sinh = require("./hoc_sinh");
var _nguoi_dung = require("./nguoi_dung");
var _phan_cong_hoc_sinh = require("./phan_cong_hoc_sinh");
var _thong_bao = require("./thong_bao");
var _tuyen_duong = require("./tuyen_duong");
var _tuyen_duong_diem_dung = require("./tuyen_duong_diem_dung");
var _xe_buyt = require("./xe_buyt");

function initModels(sequelize) {
  var chuyen_di = _chuyen_di(sequelize, DataTypes);
  var diem_danh_chuyen_di = _diem_danh_chuyen_di(sequelize, DataTypes);
  var diem_dung = _diem_dung(sequelize, DataTypes);
  var hoc_sinh = _hoc_sinh(sequelize, DataTypes);
  var nguoi_dung = _nguoi_dung(sequelize, DataTypes);
  var phan_cong_hoc_sinh = _phan_cong_hoc_sinh(sequelize, DataTypes);
  var thong_bao = _thong_bao(sequelize, DataTypes);
  var tuyen_duong = _tuyen_duong(sequelize, DataTypes);
  var tuyen_duong_diem_dung = _tuyen_duong_diem_dung(sequelize, DataTypes);
  var xe_buyt = _xe_buyt(sequelize, DataTypes);

  diem_danh_chuyen_di.belongsTo(chuyen_di, { as: "id_chuyen_di_chuyen_di", foreignKey: "id_chuyen_di"});
  chuyen_di.hasMany(diem_danh_chuyen_di, { as: "diem_danh_chuyen_dis", foreignKey: "id_chuyen_di"});
  diem_danh_chuyen_di.belongsTo(diem_dung, { as: "id_diem_dung_diem_dung", foreignKey: "id_diem_dung"});
  diem_dung.hasMany(diem_danh_chuyen_di, { as: "diem_danh_chuyen_dis", foreignKey: "id_diem_dung"});
  hoc_sinh.belongsTo(diem_dung, { as: "id_diem_dung_diem_dung", foreignKey: "id_diem_dung"});
  diem_dung.hasMany(hoc_sinh, { as: "hoc_sinhs", foreignKey: "id_diem_dung"});
  tuyen_duong_diem_dung.belongsTo(diem_dung, { as: "id_diem_dung_diem_dung", foreignKey: "id_diem_dung"});
  diem_dung.hasMany(tuyen_duong_diem_dung, { as: "tuyen_duong_diem_dungs", foreignKey: "id_diem_dung"});
  diem_danh_chuyen_di.belongsTo(hoc_sinh, { as: "id_hoc_sinh_hoc_sinh", foreignKey: "id_hoc_sinh"});
  hoc_sinh.hasMany(diem_danh_chuyen_di, { as: "diem_danh_chuyen_dis", foreignKey: "id_hoc_sinh"});
  phan_cong_hoc_sinh.belongsTo(hoc_sinh, { as: "id_hoc_sinh_hoc_sinh", foreignKey: "id_hoc_sinh"});
  hoc_sinh.hasMany(phan_cong_hoc_sinh, { as: "phan_cong_hoc_sinhs", foreignKey: "id_hoc_sinh"});
  chuyen_di.belongsTo(nguoi_dung, { as: "id_tai_xe_nguoi_dung", foreignKey: "id_tai_xe"});
  nguoi_dung.hasMany(chuyen_di, { as: "chuyen_dis", foreignKey: "id_tai_xe"});
  hoc_sinh.belongsTo(nguoi_dung, { as: "id_phu_huynh_nguoi_dung", foreignKey: "id_phu_huynh"});
  nguoi_dung.hasMany(hoc_sinh, { as: "hoc_sinhs", foreignKey: "id_phu_huynh"});
  thong_bao.belongsTo(nguoi_dung, { as: "id_nguoi_gui_nguoi_dung", foreignKey: "id_nguoi_gui"});
  nguoi_dung.hasMany(thong_bao, { as: "thong_baos", foreignKey: "id_nguoi_gui"});
  thong_bao.belongsTo(nguoi_dung, { as: "id_nguoi_nhan_nguoi_dung", foreignKey: "id_nguoi_nhan"});
  nguoi_dung.hasMany(thong_bao, { as: "id_nguoi_nhan_thong_baos", foreignKey: "id_nguoi_nhan"});
  chuyen_di.belongsTo(tuyen_duong, { as: "id_tuyen_duong_tuyen_duong", foreignKey: "id_tuyen_duong"});
  tuyen_duong.hasMany(chuyen_di, { as: "chuyen_dis", foreignKey: "id_tuyen_duong"});
  phan_cong_hoc_sinh.belongsTo(tuyen_duong, { as: "id_tuyen_duong_tuyen_duong", foreignKey: "id_tuyen_duong"});
  tuyen_duong.hasMany(phan_cong_hoc_sinh, { as: "phan_cong_hoc_sinhs", foreignKey: "id_tuyen_duong"});
  tuyen_duong_diem_dung.belongsTo(tuyen_duong, { as: "id_tuyen_duong_tuyen_duong", foreignKey: "id_tuyen_duong"});
  tuyen_duong.hasMany(tuyen_duong_diem_dung, { as: "tuyen_duong_diem_dungs", foreignKey: "id_tuyen_duong"});
  chuyen_di.belongsTo(xe_buyt, { as: "id_xe_buyt_xe_buyt", foreignKey: "id_xe_buyt"});
  xe_buyt.hasMany(chuyen_di, { as: "chuyen_dis", foreignKey: "id_xe_buyt"});

  return {
    chuyen_di,
    diem_danh_chuyen_di,
    diem_dung,
    hoc_sinh,
    nguoi_dung,
    phan_cong_hoc_sinh,
    thong_bao,
    tuyen_duong,
    tuyen_duong_diem_dung,
    xe_buyt,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
