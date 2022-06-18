"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo Router do express
var _express = require('express');
// importa o objeto criado pela classe SailorController
var _SailorController = require('../controllers/SailorController'); var _SailorController2 = _interopRequireDefault(_SailorController);

// Importa o middleware loginRequired
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

// Cria a constante router que executa o metódo Router do express
const router = _express.Router.call(void 0, );

// Utiliza o método get do router para criar a rota raiz('/') utilizando o sailorController.index
router.get('/', _loginRequired2.default, _SailorController2.default.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o sailorController.store, verficando se o usuário tem um token de login válido
router.post('/', _loginRequired2.default, _SailorController2.default.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o sailorController.update, verficando se o usuário tem um token de login válido
router.put('/:id', _loginRequired2.default, _SailorController2.default.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o sailorController.show
router.get('/:id', _loginRequired2.default, _SailorController2.default.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o sailorController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', _loginRequired2.default, _SailorController2.default.delete);

// Exporta o router
exports. default = router;
