'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category}) {
      this.belongsTo(Category, { foreignKey: 'categoryId'})
      // define association here
    }

    toJSON() {
      return { ...this.get(), updatedAt: undefined, createdAt: undefined }
    }
  }
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    photoLink: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'items',
    modelName: 'Item',
  });
  return Item;
};