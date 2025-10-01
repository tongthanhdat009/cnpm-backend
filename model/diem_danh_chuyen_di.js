const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diem_danh_chuyen_di', {
    id_diem_danh: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_hoc_sinh: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hoc_sinh',
        key: 'id_hoc_sinh'
      }
    },
    id_chuyen_di: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chuyen_di',
        key: 'id_chuyen_di'
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
    trang_thai: {
      type: DataTypes.ENUM('da_don','da_tra','vang_mat'),
      allowNull: false
    },
    thoi_gian: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'diem_danh_chuyen_di',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_diem_danh" },
        ]
      },
      {
        name: "id_chuyen_di",
        using: "BTREE",
        fields: [
          { name: "id_chuyen_di" },
        ]
      },
      {
        name: "id_hoc_sinh",
        using: "BTREE",
        fields: [
          { name: "id_hoc_sinh" },
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
