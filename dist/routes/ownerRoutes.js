"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo Router do express
var _express = require('express');
// importa o objeto criado pela classe OwnerController
var _OwnerController = require('../controllers/OwnerController'); var _OwnerController2 = _interopRequireDefault(_OwnerController);

// Importa o middleware loginRequired
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

// Cria a constante router que executa o metódo Router do express
const router = _express.Router.call(void 0, );

// Utiliza o método get do router para criar a rota raiz('/') utilizando o ownerController.index
router.get('/', _loginRequired2.default, _OwnerController2.default.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o ownerController.store, verficando se o usuário tem um token de login válido
router.post('/', _loginRequired2.default, _OwnerController2.default.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o ownerController.update, verficando se o usuário tem um token de login válido
router.put('/:id', _loginRequired2.default, _OwnerController2.default.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o ownerController.show
router.get('/:id', _loginRequired2.default, _OwnerController2.default.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o ownerController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', _loginRequired2.default, _OwnerController2.default.delete);

// Exporta o router
exports. default = router;
