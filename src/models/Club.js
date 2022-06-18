// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';

// Exporta o model da tabela alunos
export default class Club extends Model {
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
      coordenada: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [0, 50],
            msg: 'Campo coordenada pode ter no máximo 50 caracteres',
          },
        },
      },
      regiao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 25],
            msg: 'Campo região deve ter entre 1 e 25 caracteres',
          },
        },
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 50],
            msg: 'Campo estado deve ter entre 2 e 50 caracteres',
          },
        },
      },
      cidade: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo cidade deve ter entre 3 e 50 caracteres',
          },
        },
      },
      telefone: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      calado_max: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      homepage: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      endereco: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo endereço deve ter entre 3 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'club_tb',
    });
    return this;
  }

  // Cria o metódo estatico associate que relaciona o model com a tabela owner_tb
  static associate(models) {
    this.hasMany(models.Owner, { foreignKey: 'club_id' });
  }
}
