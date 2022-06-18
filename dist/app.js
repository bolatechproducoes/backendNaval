"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o dotenv para ler os dados do arquivo .env que protege as senhas
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
// Importa o metódo resolve do path
var _path = require('path');

// Executa o dotenv
_dotenv2.default.config();

// Importa o index.js da pasta database que inicia os models do banco de dados
require('./database');

// Importa o express
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
// Importa o cors
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
// Importa o helmet
// import helmet from 'helmet';

// Importa as rotas do homeRoutes
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
// Importa as rotas do userRoutes
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
// Importa as rotas do tokenRoutes
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
// Importa as rotas do shipyardRoutes
var _shipyardRoutes = require('./routes/shipyardRoutes'); var _shipyardRoutes2 = _interopRequireDefault(_shipyardRoutes);
// Importa as rotas do fotoRoutes
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);
// Importa as rotas do boatRoutes
var _boatRoutes = require('./routes/boatRoutes'); var _boatRoutes2 = _interopRequireDefault(_boatRoutes);
// Importa as rotas do clubRoutes
var _clubRoutes = require('./routes/clubRoutes'); var _clubRoutes2 = _interopRequireDefault(_clubRoutes);
// Importa as rotas do modeltbRoutes
var _modeltbRoutes = require('./routes/modeltbRoutes'); var _modeltbRoutes2 = _interopRequireDefault(_modeltbRoutes);
// Importa as rotas do ownerRoutes
var _ownerRoutes = require('./routes/ownerRoutes'); var _ownerRoutes2 = _interopRequireDefault(_ownerRoutes);
// Importa as rotas do sailorRoutes
var _sailorRoutes = require('./routes/sailorRoutes'); var _sailorRoutes2 = _interopRequireDefault(_sailorRoutes);

// Cria a constante whiteList que recebe o array de domínios permitidos a acessar a api
const whiteList = [
  'http://192.168.0.14',
  'http://192.168.0.19',
  'http://localhost:3000',
];

// Cria a constante corsOption que executa a verificação da URL que fez a solicitação a API
const corsOptions = {
  // Função origin que recebe os parâmetros origin e callback, sendo origin a url que fez a solicitação e callback a função que será executada para o retorno dos dados
  origin(origin, callback) {
    // Verifica se a url que fez a solicitação está na lista de domínios permitidos ou se é indefinida(para acessar com o insomnia)
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      // Executa a função de callback enviando o parametro null para erro e true para validara a URL
      callback(null, true);
    } else {
      // Caso não passe na verificação, executa a função de callback enviando um new error com a mensagem 'Not allowed by CORS'
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Cria a classe App que
class App {
  constructor() {
    // Cria o metódo app que recebe o express
    this.app = _express2.default.call(void 0, );
    // Executa o metódo middlewares
    this.middlewares();
    // Executa o metódo routes
    this.routes();
  }

  // Método que executa os middlewares de execução do express
  middlewares() {
    // Executa o metódo use do express, chamando a função urlencoded com a configuração extended true
    this.app.use(_express2.default.urlencoded({ extended: true }));
    // Executa o metódo use do express, chamando a função json para habilitar o uso de json
    this.app.use(_express2.default.json());
    // Executa o metódo use do express, chamando a função static para configurar o local onde estão os arquivos estáticos
    this.app.use('/images/', _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')));
  }

  // Método que define as rotas do express
  routes() {
    // Inicializa o cors utilizando a constante corsOption que traz as configuração de domínios permitidos
    this.app.use(_cors2.default.call(void 0, corsOptions));
    // Inializa o helmet que protege contra ataques e requer https (Desabilitar se for usar em localhost-http)
    // this.app.use(helmet());
    // Define a rota raiz do express com o homeRoutes
    this.app.use('/', _homeRoutes2.default);
    // Define a rota /users/ do express com o userRoutes
    this.app.use('/users/', _userRoutes2.default);
    // Define a rota /tokens/ do express com o tokenRoutes
    this.app.use('/tokens/', _tokenRoutes2.default);
    // Define a rota /shipyard/ do express com o shipyardRoutes
    this.app.use('/shipyard/', _shipyardRoutes2.default);
    // Define a rota /fotos/ do express com o fotoRoutes
    this.app.use('/fotos/', _fotoRoutes2.default);
    // Define a rota /boat/ do express com o boatRoutes
    this.app.use('/boat/', _boatRoutes2.default);
    // Define a rota /club/ do express com o clubRoutes
    this.app.use('/club/', _clubRoutes2.default);
    // Define a rota /model/ do express com o modeltbRoutes
    this.app.use('/model/', _modeltbRoutes2.default);
    // Define a rota /owner/ do express com o ownerRoutes
    this.app.use('/owner/', _ownerRoutes2.default);
    // Define a rota /sailor/ do express com o sailorRoutes
    this.app.use('/sailor/', _sailorRoutes2.default);
  }
}

// Cria uma instância da classe App exportando o metódo app
exports. default = new App().app;
