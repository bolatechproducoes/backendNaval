"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Exporta o model da tabela alunos
 class Shipyard extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      regiao: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 25],
            msg: 'Campo região deve ter entre 1 e 25 caracteres',
          },
        },
      },
      estado: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 50],
            msg: 'Campo estado deve ter entre 2 e 50 caracteres',
          },
        },
      },
      cidade: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo cidade deve ter entre 3 e 50 caracteres',
          },
        },
      },
      telefone: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          len: {
            args: [0, 9],
            msg: 'Campo telefone deve ter entre 0 e 9 caracteres',
          },
        },
      },
      tipo: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo tipo deve ter entre 3 e 50 caracteres',
          },
        },
      },
      homepage: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
      },
      endereco: {
        type: _sequelize2.default.STRING,
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
      tableName: 'shipyard_tb',
    });
    return this;
  }

  // Cria o metódo estatico associate que relaciona o model com a tabela fotos
  static associate(models) {
    this.hasMany(models.Modeltb, { foreignKey: 'shipyard_id' });
  }
} exports.default = Shipyard;
