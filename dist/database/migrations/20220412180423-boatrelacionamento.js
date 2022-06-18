"use strict";module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('boat_tb', {
    foto_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'fotos',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    sailor_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'sailor_tb',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    model_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'model_tb',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('boat_tb'),
};
