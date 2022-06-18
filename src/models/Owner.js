// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';

// Exporta o model da tabela alunos
export default class Owner extends Model {
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
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres',
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
      tableName: 'owner_tb',
    });
    return this;
  }

  // Metódo estático que cria a relação entre as tabelas definindo aluno_id como a chave da relação
  static associate(models) {
    this.belongsTo(models.Boat, { foreignKey: 'boat_id' });
  }
}
