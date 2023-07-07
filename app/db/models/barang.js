'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Barang.belongsTo(models.Category,{
        foreignKey: 'category',
      })
    }
  }
  Barang.init({
    category: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    merk: DataTypes.STRING,
    image: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Barang',
  });
  return Barang;
};