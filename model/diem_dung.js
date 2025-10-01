const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diem_dung', {
    id_diem_dung: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_diem_dung: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dia_chi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vi_do: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false
    },
    kinh_do: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'diem_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_diem_dung" },
        ]
      },
    ]
  });
};
