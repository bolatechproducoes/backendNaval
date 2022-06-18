// Importa o sequelize
import Sequelize from 'sequelize';
// Importa as configurações do banco de dados do arquivo database.js
import databaseConfig from '../config/database';
// Importa o model da tabela users
import User from '../models/User';
// Importa o model da tabela fotos
import Foto from '../models/Foto';
// Importa o model da tabela boat_tb
import Boat from '../models/Boat';
// Importa o model da tabela club_tb
import Club from '../models/Club';
// Importa o model da tabela model_tb
import Modeltb from '../models/Modeltb';
// Importa o model da tabela sailor_tb
import Sailor from '../models/Sailor';
// Importa o model da tabela shipyard_tb
import Shipyard from '../models/Shipyard';
// Importa o model da tabela shipyard_tb
import Owner from '../models/Owner';

// Cria a constante models que recebe um array com os models do sequelize
const models = [User, Foto, Boat, Club, Modeltb, Sailor, Shipyard, Owner];

// Cria a constante connection que recebe o sequelize com as configurações do banco de dados
const connection = new Sequelize(databaseConfig);

// Inicializa os models do banco de dados
models.forEach((model) => model.init(connection));

// Procura nos models se existe o metódo associate (que indica a relação entre tabelas) e executa o metódo caso exista
models.forEach((model) => model.associate && model.associate(connection.models));
