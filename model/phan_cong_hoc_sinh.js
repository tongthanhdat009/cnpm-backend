const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phan_cong_hoc_sinh', {
    id_phan_cong: {
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
    id_tuyen_duong: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tuyen_duong',
        key: 'id_tuyen_duong'
      }
    }
  }, {
    sequelize,
    tableName: 'phan_cong_hoc_sinh',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_phan_cong" },
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
        name: "id_tuyen_duong",
        using: "BTREE",
        fields: [
          { name: "id_tuyen_duong" },
        ]
      },
    ]
  });
};
