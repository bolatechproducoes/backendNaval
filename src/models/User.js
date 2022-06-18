// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';
// Importa o bcryptjs para fazer a hash da senha
import bcryptjs from 'bcryptjs';

// Exporta o model da tabela usuários com suas configurações herdando o prototype do Model do sequelize pelo atributo extends
export default class User extends Model {
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
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
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
        user.password_hash = await bcryptjs.hash(user.password, 8);
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
    return bcryptjs.compare(password, this.password_hash);
  }
}
