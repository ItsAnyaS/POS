'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'transactions', // table name
        'sessionId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('transactions', 'sessionId')
    ]);
  }
};
