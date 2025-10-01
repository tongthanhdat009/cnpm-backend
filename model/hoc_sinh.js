const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hoc_sinh', {
    id_hoc_sinh: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_phu_huynh: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nguoi_dung',
        key: 'id_nguoi_dung'
      }
    },
    id_diem_dung: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'diem_dung',
        key: 'id_diem_dung'
      }
    },
    ho_ten: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lop: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ghi_chu: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hoc_sinh',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_hoc_sinh" },
        ]
      },
      {
        name: "id_phu_huynh",
        using: "BTREE",
        fields: [
          { name: "id_phu_huynh" },
        ]
      },
      {
        name: "id_diem_dung",
        using: "BTREE",
        fields: [
          { name: "id_diem_dung" },
        ]
      },
    ]
  });
};
