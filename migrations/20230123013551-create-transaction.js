'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number_of_items: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      items: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL)
      },
      total_cost: {allowNull: false,
        type: Sequelize.INTEGER
      },
      total_tax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_tip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      // sessionId: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER
      // },
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
    await queryInterface.dropTable('transactions');
  }
};