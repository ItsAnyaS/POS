'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number_of_transactions: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_tips: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_tax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      number_of_items_sold: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_net: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sessions');
  }
};