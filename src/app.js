// Importa o dotenv para ler os dados do arquivo .env que protege as senhas
import dotenv from 'dotenv';
// Importa o metódo resolve do path
import { resolve } from 'path';

// Executa o dotenv
dotenv.config();

// Importa o index.js da pasta database que inicia os models do banco de dados
import './database';

// Importa o express
import express from 'express';
// Importa o cors
import cors from 'cors';
// Importa o helmet
// import helmet from 'helmet';

// Importa as rotas do homeRoutes
import homeRoutes from './routes/homeRoutes';
// Importa as rotas do userRoutes
import userRoutes from './routes/userRoutes';
// Importa as rotas do tokenRoutes
import tokenRoutes from './routes/tokenRoutes';
// Importa as rotas do shipyardRoutes
import shipyardRoutes from './routes/shipyardRoutes';
// Importa as rotas do fotoRoutes
import fotoRoutes from './routes/fotoRoutes';
// Importa as rotas do boatRoutes
import boatRoutes from './routes/boatRoutes';
// Importa as rotas do clubRoutes
import clubRoutes from './routes/clubRoutes';
// Importa as rotas do modeltbRoutes
import modeltbRoutes from './routes/modeltbRoutes';
// Importa as rotas do ownerRoutes
import ownerRoutes from './routes/ownerRoutes';
// Importa as rotas do sailorRoutes
import sailorRoutes from './routes/sailorRoutes';

// Cria a constante whiteList que recebe o array de domínios permitidos a acessar a api
const whiteList = [
  'http://192.168.0.14',
  'http://192.168.0.19',
  'http://localhost:3000',
  'http://0.0.0.0',
  'http://192.168.0.17',
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
    this.app = express();
    // Executa o metódo middlewares
    this.middlewares();
    // Executa o metódo routes
    this.routes();
  }

  // Método que executa os middlewares de execução do express
  middlewares() {
    // Executa o metódo use do express, chamando a função urlencoded com a configuração extended true
    this.app.use(express.urlencoded({ extended: true }));
    // Executa o metódo use do express, chamando a função json para habilitar o uso de json
    this.app.use(express.json());
    // Executa o metódo use do express, chamando a função static para configurar o local onde estão os arquivos estáticos
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  // Método que define as rotas do express
  routes() {
    // Inicializa o cors utilizando a constante corsOption que traz as configuração de domínios permitidos
    this.app.use(cors(corsOptions));
    // Inializa o helmet que protege contra ataques e requer https (Desabilitar se for usar em localhost-http)
    // this.app.use(helmet());
    // Define a rota raiz do express com o homeRoutes
    this.app.use('/', homeRoutes);
    // Define a rota /users/ do express com o userRoutes
    this.app.use('/users/', userRoutes);
    // Define a rota /tokens/ do express com o tokenRoutes
    this.app.use('/tokens/', tokenRoutes);
    // Define a rota /shipyard/ do express com o shipyardRoutes
    this.app.use('/shipyard/', shipyardRoutes);
    // Define a rota /fotos/ do express com o fotoRoutes
    this.app.use('/fotos/', fotoRoutes);
    // Define a rota /boat/ do express com o boatRoutes
    this.app.use('/boat/', boatRoutes);
    // Define a rota /club/ do express com o clubRoutes
    this.app.use('/club/', clubRoutes);
    // Define a rota /model/ do express com o modeltbRoutes
    this.app.use('/model/', modeltbRoutes);
    // Define a rota /owner/ do express com o ownerRoutes
    this.app.use('/owner/', ownerRoutes);
    // Define a rota /sailor/ do express com o sailorRoutes
    this.app.use('/sailor/', sailorRoutes);
  }
}

// Cria uma instância da classe App exportando o metódo app
export default new App().app;
