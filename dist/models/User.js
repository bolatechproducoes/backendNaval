"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize e o model do sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// Importa o bcryptjs para fazer a hash da senha
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

// Exporta o model da tabela usuários com suas configurações herdando o prototype do Model do sequelize pelo atributo extends
 class User extends _sequelize.Model {
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
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'E-mail Inválido',
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'users',
    });

    //  Hook que transforma o password em um hash antes de salvar no banco de dados
    this.addHook('beforeSave', async (user) => {
      // Se o password foi enviadopela requisição
      if (user.password) {
      // Transforma a senha em um hash utilizando o bcryptjs para salvar no banco de dados
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    // Retorna o objeto
    return this;
  }

  // Cria o metódo estatico associate que relaciona o model com as tabelas fotos e owner_tb
  static associate(models) {
    this.hasMany(models.Owner, { foreignKey: 'user_id' });
  }

  // Metódo que verifica se a senha enviada é igual a senha do usuário no banco de dados
  passwordIsValid(password) {
    // Utiliza o metódo compare do bcryptjs para comparar a senha enviada com a senha do usuário no banco de dados e retorna a validação
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
