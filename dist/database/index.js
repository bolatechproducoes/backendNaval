"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o sequelize
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// Importa as configurações do banco de dados do arquivo database.js
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
// Importa o model da tabela users
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
// Importa o model da tabela fotos
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
// Importa o model da tabela boat_tb
var _Boat = require('../models/Boat'); var _Boat2 = _interopRequireDefault(_Boat);
// Importa o model da tabela club_tb
var _Club = require('../models/Club'); var _Club2 = _interopRequireDefault(_Club);
// Importa o model da tabela model_tb
var _Modeltb = require('../models/Modeltb'); var _Modeltb2 = _interopRequireDefault(_Modeltb);
// Importa o model da tabela sailor_tb
var _Sailor = require('../models/Sailor'); var _Sailor2 = _interopRequireDefault(_Sailor);
// Importa o model da tabela shipyard_tb
var _Shipyard = require('../models/Shipyard'); var _Shipyard2 = _interopRequireDefault(_Shipyard);
// Importa o model da tabela shipyard_tb
var _Owner = require('../models/Owner'); var _Owner2 = _interopRequireDefault(_Owner);

// Cria a constante models que recebe um array com os models do sequelize
const models = [_User2.default, _Foto2.default, _Boat2.default, _Club2.default, _Modeltb2.default, _Sailor2.default, _Shipyard2.default, _Owner2.default];

// Cria a constante connection que recebe o sequelize com as configurações do banco de dados
const connection = new (0, _sequelize2.default)(_database2.default);

// Inicializa os models do banco de dados
models.forEach((model) => model.init(connection));

// Procura nos models se existe o metódo associate (que indica a relação entre tabelas) e executa o metódo caso exista
models.forEach((model) => model.associate && model.associate(connection.models));
