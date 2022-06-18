"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o jwt (jsonwebtoken)
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
// Importa o Model User
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

// Verifica se o usuário tem um token válido de login
exports. default = async (req, res, next) => {
  // Cria a constante authorization que recebe o token do header Authorization
  const { authorization } = req.headers;
  //
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login requerido'],
    });
  }

  // Cria as constantes texto e token separando o token pelo caractere de espaço (para separar o texto da chave do valor do token)
  const [, token] = authorization.split(' ');

  // Verifica se o token é válido
  try {
    // Cria a constante dados que verifica se o token é válido utilizando o secret do token
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    // Crias as constantes id e email que recebem os dados da constante dados
    const { id, email } = dados;

    // Cria a constante user que verifica se o id e email correspondem a um usuário cadastrado no banco de dados
    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    //
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    // Atribui ao userId da requisição o valor da constante id
    req.userId = id;
    // Atribui ao userEmail da requisição o valor da constante email
    req.userEmail = email;
    // Passa para o próximo middleware
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
