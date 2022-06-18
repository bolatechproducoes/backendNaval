"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Exporta o model da tabela alunos
 class Sailor extends _sequelize.Model {
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
      email: {
        type: _sequelize2.default.STRING,
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
} exports.default = Sailor;
