'use strict';
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Transaction}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
      this.hasMany(Transaction, {foreignKey: 'sessionId'})
    }
  }
  Session.init({
    number_of_transactions: DataTypes.INTEGER,
    total_tips: DataTypes.INTEGER,
    total_tax: DataTypes.INTEGER,
    number_of_items_sold: DataTypes.INTEGER,
    total_net: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'sessions',
    modelName: 'Session',
  });
  return Session;
};