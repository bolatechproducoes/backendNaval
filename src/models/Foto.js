// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';
// Importa o appConfig que define uma URL base
import appConfig from '../config/appConfig';

// Exporta o model da tabela fotos
export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      // Define a URL da imagem através do appConfig.url + o nome do arquivo (filename)
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
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
}
