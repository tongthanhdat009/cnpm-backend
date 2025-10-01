const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('xe_buyt', {
    id_xe_buyt: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bien_so_xe: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "bien_so_xe"
    },
    so_ghe: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hang: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    anh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vi_do_hien_tai: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    kinh_do_hien_tai: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: true
    },
    lan_cap_nhat_cuoi: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'xe_buyt',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_xe_buyt" },
        ]
      },
      {
        name: "bien_so_xe",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bien_so_xe" },
        ]
      },
    ]
  });
};
