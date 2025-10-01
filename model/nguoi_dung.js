const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nguoi_dung', {
    id_nguoi_dung: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ho_ten: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ten_tai_khoan: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "ten_tai_khoan"
    },
    mat_khau_bam: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    so_dien_thoai: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "so_dien_thoai"
    },
    vai_tro: {
      type: DataTypes.ENUM('quan_ly','phu_huynh','tai_xe'),
      allowNull: false
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'nguoi_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_nguoi_dung" },
        ]
      },
      {
        name: "ten_tai_khoan",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ten_tai_khoan" },
        ]
      },
      {
        name: "so_dien_thoai",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "so_dien_thoai" },
        ]
      },
    ]
  });
};
