const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chuyen_di', {
    id_chuyen_di: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tai_xe: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nguoi_dung',
        key: 'id_nguoi_dung'
      }
    },
    id_tuyen_duong: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tuyen_duong',
        key: 'id_tuyen_duong'
      }
    },
    id_xe_buyt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'xe_buyt',
        key: 'id_xe_buyt'
      }
    },
    loai_chuyen_di: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    gio_khoi_hanh: {
      type: DataTypes.TIME,
      allowNull: false
    },
    ngay: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    trang_thai: {
      type: DataTypes.ENUM('cho_khoi_hanh','dang_di','hoan_thanh','da_huy','bi_tre'),
      allowNull: true,
      defaultValue: "cho_khoi_hanh"
    },
    thoi_gian_bat_dau_thuc_te: {
      type: DataTypes.DATE,
      allowNull: true
    },
    thoi_gian_ket_thuc_thuc_te: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chuyen_di',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_chuyen_di" },
        ]
      },
      {
        name: "id_tuyen_duong",
        using: "BTREE",
        fields: [
          { name: "id_tuyen_duong" },
        ]
      },
      {
        name: "id_xe_buyt",
        using: "BTREE",
        fields: [
          { name: "id_xe_buyt" },
        ]
      },
      {
        name: "id_tai_xe",
        using: "BTREE",
        fields: [
          { name: "id_tai_xe" },
        ]
      },
    ]
  });
};
