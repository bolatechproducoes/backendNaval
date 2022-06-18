module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('fotos', {
    boat_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'boat_tb',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('fotos'),
};
