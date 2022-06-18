"use strict";module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('model_tb', {
    shipyard_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'shipyard_tb',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('model_tb'),
};
