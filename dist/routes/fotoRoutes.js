"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo Router do express
var _express = require('express');
// Importa o middleware de autenticação loginRequired
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

// importa o objeto criado pela classe FotoController
var _FotoController = require('../controllers/FotoController'); var _FotoController2 = _interopRequireDefault(_FotoController);

// Cria a constante router que executa o metódo Router do express
const router = _express.Router.call(void 0, );

// Utiliza o método get do router para criar a rota raiz('/') utilizando o fotoController.store, e verificando se o usuário tem um token de login válido com o loginRequired
router.post('/', _loginRequired2.default, _FotoController2.default.store);

// Exporta o router
exports. default = router;
