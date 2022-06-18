// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';

// Exporta o model da tabela alunos
export default class Sailor extends Model {
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
      telefone: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          len: {
            args: [0, 9],
            msg: 'Campo telefone deve ter entre 0 e 9 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'sailor_tb',
    });
    return this;
  }

  // Cria o metódo estatico associate que relaciona o model com a tabela fotos
  static associate(models) {
    this.hasMany(models.Boat, { foreignKey: 'sailor_id' });
  }
}
