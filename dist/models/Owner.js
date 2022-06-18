"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Exporta o model da tabela alunos
 class Owner extends _sequelize.Model {
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
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres',
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
      tableName: 'owner_tb',
    });
    return this;
  }

  // Metódo estático que cria a relação entre as tabelas definindo aluno_id como a chave da relação
  static associate(models) {
    this.belongsTo(models.Boat, { foreignKey: 'boat_id' });
  }
} exports.default = Owner;
