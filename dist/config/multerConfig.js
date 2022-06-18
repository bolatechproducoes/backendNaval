"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o multer para poder receber arquivos
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
// Importa os módulos extname e resolve do path
var _path = require('path');

// Cria a constante aleatorio que recebe um número aleatório entre 100000 e 200000
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// Exporta os parametros de configuração do multer
exports. default = {
  // Filtra o arquivo para só permitir o upload de imagens
  fileFilter: (req, file, cb) => {
    // Verifica se o aruivo tem a extensão .jpeg e .png
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      // Se o arquivo não for uma imagem, retorna um erro
      return cb(new _multer2.default.MulterError('Arquivo precisa ser PNG ou JPEG'));
    }

    // Se o arquivo for uma imagem segue para armazenar o arquivo
    return cb(null, true);
  },
  // Define o local de armazenamento dos arquivos
  storage: _multer2.default.diskStorage({
    // Parametro que configura o destino do arquivo
    destination: (req, file, cb) => {
      // Chama a função de callback (cb) o primeiro parametro é o erro (null) e o segundo é o caminho do arquivo
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    // Parametro que configura o nome do arquivo
    filename: (req, file, cb) => {
      // Chama a função de callback (cb) o primeiro parametro é o erro (null) e o segundo é o nome do arquivo (`${Date.now()}_${aleatorio()}${extname(file.originalname)}`) (o nome gerado é a data atual em milisegundos + um numero aleatório e a extensão orinal do arquivo)
      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
