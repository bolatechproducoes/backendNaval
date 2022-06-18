// Importa o sequelize e o model do sequelize
import Sequelize, { Model } from 'sequelize';

// Exporta o model da tabela boat_tb
export default class Boat extends Model {
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
}
