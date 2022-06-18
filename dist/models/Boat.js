"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Exporta o model da tabela boat_tb
 class Boat extends _sequelize.Model {
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
      tableName: 'boat_tb',
    });
    return this;
  }

  // Cria o metódo estatico associate que relaciona o model com as tabelas fotos e owner_tb
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'boat_id' });
    this.hasMany(models.Owner, { foreignKey: 'boat_id' });
  }
} exports.default = Boat;
