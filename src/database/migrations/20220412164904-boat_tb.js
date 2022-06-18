module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('boat_tb', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    foto_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    sailor_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    model_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('boat_tb'),
};
