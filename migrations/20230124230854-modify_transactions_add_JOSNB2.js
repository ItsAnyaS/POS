'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.sequelize.query(
      `ALTER TABLE "transactions"
       ALTER COLUMN "items"
       TYPE JSONB USING "items"::JSONB`
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     return queryInterface.sequelize.query(
      `ALTER TABLE "transactions"
       ALTER COLUMN "items"
       TYPE text[] USING "items"::text[]`
    );
  }
};
