// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';

// Exporta o model da tabela alunos
export default class Modeltb extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'model_tb',
    });
    return this;
  }

  // Cria o metódo estatico associate que relaciona o model com a tabela boat
  static associate(models) {
    this.hasMany(models.Boat, { foreignKey: 'model_id' });
  }
}
