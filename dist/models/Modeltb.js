"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Exporta o model da tabela alunos
 class Modeltb extends _sequelize.Model {
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
} exports.default = Modeltb;
