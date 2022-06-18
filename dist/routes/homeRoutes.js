"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo Router do express
var _express = require('express');
// importa o objeto criado pela classe HomeController
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);

// Cria a constante router que executa o metódo Router do express
const router = _express.Router.call(void 0, );

// Utiliza o método get do router para criar a rota raiz('/') utilizando o homeController.index
router.get('/', _HomeController2.default.index);

// Exporta o router
exports. default = router;
