"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o multer para poder receber arquivos
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
// Importa as configurações do multer
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

// Importa o model da tabela fotos
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

// Cria a constante upload que recebe o multer com as configurações do multerConfig e recebe a foto enviada pelo usuário
const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');

// Cria a classe FotoController
class FotoController {
  // Metódo store que recebe os parametros req e res
  store(req, res) {
    //
    return upload(req, res, async (error) => {
      // Verifica se ocorreu algum erro
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        // Cria as constantes originalname e filename que recebem o nome do arquivo enviado pelo usuário e o nome gerado pelo multer
        const { originalname, filename } = req.file;
        // Cria a constante boat_id que recebe o id da embarcação referente a foto
        const { boat_id } = req.body;
        // Cria a constante foto que cadastra o dado no banco de dados
        const foto = await _Foto2.default.create({ originalname, filename, boat_id });

        // Mostra a constante foto que salva os dados no banco de dados
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Embarcação não existe'],
        });
      }
    });
  }
}

// Exporta uma instância da classe FotoController
exports. default = new FotoController();
