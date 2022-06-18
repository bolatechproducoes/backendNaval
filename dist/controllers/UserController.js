"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o Model User
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
// Importa o Model Owner
var _Owner = require('../models/Owner'); var _Owner2 = _interopRequireDefault(_Owner);

// Cria a classe UserController
class UserController {
  // Metódo assincrono store que envia os dados do usuário para ser cadastrado no banco de dados
  async store(req, res) {
    try {
      // Cria a constante novoUser que registra um novo usuário no banco de dados
      const novoUser = await _User2.default.create(req.body);
      // Cria a constantes id, nome e email que recebe os dados da constante novoUser
      const { id, nome, email } = novoUser;
      // Retorna um json com os dados ip, nome e email do usuário criado no banco de dados
      return res.json({ id, nome, email });
    } catch (e) {
      // Retorna "status 400" e um objeto com as mensagens de erro
      return res.status('400').json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo assincrono index que retorna todos os usuários cadastrados no banco de dados
  async index(req, res) {
    try {
      // Cria a constante users que recebe todos os usuários do banco de dados utilizando uma função assincrona e mostra somente os campos id, nome e email
      const users = await _User2.default.findAll({
        attributes: ['id', 'nome', 'email'],
        order: [['id', 'DESC'], [_Owner2.default, 'id', 'DESC']],
        include: {
          model: _Owner2.default,
          attributes: ['nome'],
        },
      });
      // Retorna um json com os dados dos usuários
      return res.json(users);
    } catch (e) {
      // Retorna um json com o valor 'null' caso ocorra algum erro
      return res.json(null);
    }
  }

  // Metódo assincrono show que retorna um usuário procurando pelo seu id cadastrado no banco de dados
  async show(req, res) {
    try {
      // Cria a constante user que recebe o usuário pela sua id (primary key) do banco de dados utilizando uma função assincrona
      const user = await _User2.default.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'email'],
        order: [['id', 'DESC'], [_Owner2.default, 'id', 'DESC']],
        include: {
          model: _Owner2.default,
          attributes: ['nome'],
        },
      });
      // Verifica se o usuário foi encontrado no banco de dados
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      // Retorna um json com os dados id, nome e email do usuário
      return res.json(user);
    } catch (e) {
      // Retorna um json com o valor 'null' caso ocorra algum erro
      return res.json(null);
    }
  }

  // Metódo assincrono update que acessa um usuário procurando pelo seu id cadastrado no banco de dados e atualiza os dados do usuário no banco de dados
  async update(req, res) {
    try {
      // Cria a constante user que recebe o usuário pela sua id (salvo no header da sessão do usuário)(primary key) do banco de dados utilizando uma função assincrona
      const user = await _User2.default.findByPk(req.userId);

      // Se o usuário não for encontrado no banco de dados
      if (!user) {
        // retorna status 400 e um objeto com a mensagem de erro
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      // Atualiza os dados do usuário no banco de dados com as informações enviadas pelo usuário
      const novosDados = await user.update(req.body);
      // Cria a constantes id, nome e email que recebe os dados da constante novosDados
      const { id, nome, email } = novosDados;

      // Retorna um json com os dados do usuário
      return res.json({ id, nome, email });
    } catch (e) {
      // Retorna "status 400" e um objeto com as mensagens de erro
      return res.status('400').json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo assincrono delet que acessa um usuário procurando pelo seu id cadastrado no banco de dados e apaga os dados do usuário no banco de dados
  async delete(req, res) {
    try {
      // Cria a constante user que recebe o usuário pela sua id (salva no header da sessão)(primary key) do banco de dados utilizando uma função assincrona
      const user = await _User2.default.findByPk(req.userId);

      // Se o usuário não for encontrado no banco de dados
      if (!user) {
        // retorna status 400 e um objeto com a mensagem de erro
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      // Apaga o usuário do banco de dados
      await user.destroy();

      // Retorna um json com o valor null
      return res.json(null);
    } catch (e) {
      // Retorna "status 400" e um objeto com as mensagens de erro
      return res.status('400').json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe UserController
exports. default = new UserController();
