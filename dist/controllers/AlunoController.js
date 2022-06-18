"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o model Aluno
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
// Importa o model Foto
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

// Cria a classe AlunoController
class AlunoController {
  // Metódo index que lista todos os alunos cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante alunos que recebe todos os alunos cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename'],
      },
    });
    // Retorna um json com todos os alunos cadastrados
    res.json(alunos);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante aluno que recebe os dados enviados na requisição salvando os dados no banco de dados
      const aluno = await _Aluno2.default.create(req.body);

      // Retorna os dados do aluno que foi cadastrado no banco de dados
      return res.json(aluno);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um aluno pelo id no banco de dados e retorna os valores para o usuário
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

      // Cria a constante aluno que procura as informaçoes do aluno no banco de dados e recebe os dados encontrados
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        },
      });

      // Verifica se o aluno foi enocntrado no banco de dados
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      // Retorna os dados do aluno encontrado
      return res.json(aluno);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um aluno pelo id no banco de dados
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

      // Cria a constante aluno que procura as informaçoes do aluno no banco de dados e recebe os dados encontrados
      const aluno = await _Aluno2.default.findByPk(id);

      // Verifica se o aluno foi enocntrado no banco de dados
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      // Apaga o registro do aluno no banco de dados
      await aluno.destroy();
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

      // Cria a constante aluno que procura as informaçoes do aluno no banco de dados e recebe os dados encontrados
      const aluno = await _Aluno2.default.findByPk(id);

      // Verifica se o aluno foi enocntrado no banco de dados
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      // Atualiza os dados do aluno no banco de dados
      const alunoAtualizado = await aluno.update(req.body);

      // Retorna os dados do aluno encontrado
      return res.json(alunoAtualizado);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe AlunoController
exports. default = new AlunoController();
