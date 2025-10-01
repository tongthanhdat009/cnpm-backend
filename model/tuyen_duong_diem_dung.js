const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tuyen_duong_diem_dung', {
    id_tuyen_duong_diem_dung: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_diem_dung: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'diem_dung',
        key: 'id_diem_dung'
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
    thu_tu_diem_dung: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tuyen_duong_diem_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tuyen_duong_diem_dung" },
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
        name: "id_diem_dung",
        using: "BTREE",
        fields: [
          { name: "id_diem_dung" },
        ]
      },
    ]
  });
};
