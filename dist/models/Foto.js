"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// Importa o appConfig que define uma URL base
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

// Exporta o model da tabela fotos
 class Foto extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      // Define a URL da imagem através do appConfig.url + o nome do arquivo (filename)
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`;
        },
      },

    }, {
      sequelize,
      tableName: 'fotos',
    });
    return this;
  }

  // Metódo estático que cria a relação entre as tabelas definindo aluno_id como a chave da relação
  static associate(models) {
    this.belongsTo(models.Boat, { foreignKey: 'boat_id' });
  }
} exports.default = Foto;
