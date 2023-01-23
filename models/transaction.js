'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Session}) {
      // define association here
      this.belongsTo(Session, {foreignKey: 'sessionId'})
    }
  }
  Transaction.init({
    number_of_items: DataTypes.INTEGER,
    items: DataTypes.ARRAY(DataTypes.DECIMAL),
    total_cost: DataTypes.INTEGER,
    total_tax: DataTypes.INTEGER,
    total_tip: DataTypes.INTEGER,
    sessionId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'transactions',
    modelName: 'Transaction',
  });
  return Transaction;
};