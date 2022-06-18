"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o model Modeltb
var _Modeltb = require('../models/Modeltb'); var _Modeltb2 = _interopRequireDefault(_Modeltb);
// Importa o model Boat
var _Boat = require('../models/Boat'); var _Boat2 = _interopRequireDefault(_Boat);

// Cria a classe ModeltbController
class ModeltbController {
  // Metódo index que lista todos os modelos cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante boatModels que recebe todos os modelos cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const boatModels = await _Modeltb2.default.findAll({
      attributes: ['id', 'nome', 'shipyard_id'],
      order: [['id', 'DESC'], [_Boat2.default, 'id', 'DESC']],
      include: {
        model: _Boat2.default,
        attributes: ['nome'],
      },
    });
    // Retorna um json com todos os modelos cadastrados
    res.json(boatModels);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante boatModel que recebe os dados enviados na requisição salvando os dados no banco de dados
      const boatModel = await _Modeltb2.default.create(req.body);

      // Retorna os dados do modelo que foi cadastrado no banco de dados
      return res.json(boatModel);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um modelo pelo id no banco de dados e retorna os valores para o usuário
  async show(req, res) {
    try {
    // Cria a constante id que recebe o id enviado na requisição
      const { id } = req.params;

      // Verifica se o id foi enviado
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      // Cria a constante boatModel que procura as informaçoes do modelo no banco de dados e recebe os dados encontrados
      const boatModel = await _Modeltb2.default.findByPk(id, {
        attributes: ['id', 'nome', 'shipyard_id'],
        order: [['id', 'DESC'], [_Boat2.default, 'id', 'DESC']],
        include: {
          model: _Boat2.default,
          attributes: ['nome'],
        },
      });

      // Verifica se o modelo foi enocntrado no banco de dados
      if (!boatModel) {
        return res.status(400).json({
          errors: ['Modelo não encontrado'],
        });
      }

      // Retorna os dados do modelo encontrado
      return res.json(boatModel);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um modelo pelo id no banco de dados
  async delete(req, res) {
    try {
      // Cria a constante id que recebe o id enviado na requisição
      const { id } = req.params;

      // Verifica se o id foi enviado
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      // Cria a constante boatModel que procura as informaçoes do modelo no banco de dados e recebe os dados encontrados
      const boatModel = await _Modeltb2.default.findByPk(id);

      // Verifica se o modelo foi enocntrado no banco de dados
      if (!boatModel) {
        return res.status(400).json({
          errors: ['Modelo não encontrado'],
        });
      }

      // Apaga o registro do modelo no banco de dados
      await boatModel.destroy();
      // Retorna um json com a confirmação de exclusão do dado
      return res.json({
        apagado: true,
      });

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo update que atualiza os dados enviados no banco de dados
  async update(req, res) {
    try {
      // Cria a constante id que recebe o id enviado na requisição
      const { id } = req.params;

      // Verifica se o id foi enviado
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      // Cria a constante boatModel que procura as informaçoes do modelo no banco de dados e recebe os dados encontrados
      const boatModel = await _Modeltb2.default.findByPk(id);

      // Verifica se o modelo foi encontrado no banco de dados
      if (!boatModel) {
        return res.status(400).json({
          errors: ['Modelo não encontrado'],
        });
      }

      // Atualiza os dados do modelo no banco de dados
      const boatModelUpdated = await boatModel.update(req.body);

      // Retorna os dados do modelo encontrado
      return res.json(boatModelUpdated);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe ModeltbController
exports. default = new ModeltbController();
