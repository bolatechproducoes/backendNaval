"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo Router do express
var _express = require('express');
// importa o objeto criado pela classe HomeController
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

// Importa o middleware loginRequired
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

// Cria a constante router que executa o metódo Router do express
const router = _express.Router.call(void 0, );

// #### Rotas para aprender CRUD (não devem estar na apicação final)
// Utiliza o método get do router para criar a rota raiz('/') utilizando o userController.index e verificando se o login é válido pelo middleware loginRequired
router.get('/', _UserController2.default.index); // Não deve existir para os usuários verem os outros usuários
// Utiliza o método get do router para receber o id e criar a rota raiz('/') utilizando o userController.show para buscar o usuário pelo id
router.get('/:id', _UserController2.default.show); // Não deve existir para os usuários verem os outros usuários

// Utiliza o método post do router para criar a rota raiz('/') utilizando o userController.store
router.post('/', _UserController2.default.store);
// Utiliza o método put do router para receber o id e criar a rota raiz('/') utilizando o userController.update para buscar o usuário pelo id e atualizar os dados do usuário no banco de dados
router.put('/', _loginRequired2.default, _UserController2.default.update);
// Utiliza o método delete do router para receber o id e criar a rota raiz('/') utilizando o userController.delete para buscar o usuário pelo id e apaga-lo do banco de dados
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

// Exporta o router
exports. default = router;
