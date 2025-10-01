const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('thong_bao', {
    id_thong_bao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_nguoi_nhan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nguoi_dung',
        key: 'id_nguoi_dung'
      }
    },
    id_nguoi_gui: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nguoi_dung',
        key: 'id_nguoi_dung'
      }
    },
    da_xem: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    thoi_gian: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tieu_de: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    noi_dung: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "noi_dung"
    }
  }, {
    sequelize,
    tableName: 'thong_bao',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_thong_bao" },
        ]
      },
      {
        name: "noi_dung",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "noi_dung" },
        ]
      },
      {
        name: "id_nguoi_gui",
        using: "BTREE",
        fields: [
          { name: "id_nguoi_gui" },
        ]
      },
      {
        name: "id_nguoi_nhan",
        using: "BTREE",
        fields: [
          { name: "id_nguoi_nhan" },
        ]
      },
    ]
  });
};
