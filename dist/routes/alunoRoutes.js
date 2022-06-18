"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo Router do express
var _express = require('express');
// importa o objeto criado pela classe AlunoController
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);

// Importa o middleware loginRequired
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

// Cria a constante router que executa o metódo Router do express
const router = _express.Router.call(void 0, );

// Utiliza o método get do router para criar a rota raiz('/') utilizando o homeController.index
router.get('/', _AlunoController2.default.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o homeController.store, verficando se o usuário tem um token de login válido
router.post('/', _loginRequired2.default, _AlunoController2.default.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o homeController.update, verficando se o usuário tem um token de login válido
router.put('/:id', _loginRequired2.default, _AlunoController2.default.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o homeController.show
router.get('/:id', _AlunoController2.default.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o homeController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', _loginRequired2.default, _AlunoController2.default.delete);

// Exporta o router
exports. default = router;
