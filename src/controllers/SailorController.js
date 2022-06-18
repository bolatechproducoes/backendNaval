// Importa o model Aluno
import Sailor from '../models/Sailor';
// Importa o model Boat
import Boat from '../models/Boat';

// Cria a classe AlunoController
class SailorController {
  // Metódo index que lista todos os marinheiros cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante sailors que recebe todos os marinheiros cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const sailors = await Sailor.findAll({
      attributes: ['id', 'nome', 'telefone', 'email'],
      order: [['id', 'DESC'], [Boat, 'id', 'DESC']],
      include: {
        model: Boat,
        attributes: ['nome'],
      },
    });
    // Retorna um json com todos os alunos cadastrados
    res.json(sailors);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante sailor que recebe os dados enviados na requisição salvando os dados no banco de dados
      const sailor = await Sailor.create(req.body);

      // Retorna os dados do marinheiro que foi cadastrado no banco de dados
      return res.json(sailor);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um marinheiro pelo id no banco de dados e retorna os valores para o usuário
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

      // Cria a constante sailor que procura as informaçoes do marinheiro no banco de dados e recebe os dados encontrados
      const sailor = await Sailor.findByPk(id, {
        attributes: ['id', 'nome', 'telefone', 'email'],
        order: [['id', 'DESC'], [Boat, 'id', 'DESC']],
        include: {
          model: Boat,
          attributes: ['nome'],
        },
      });

      // Verifica se o marinheiro foi enocntrado no banco de dados
      if (!sailor) {
        return res.status(400).json({
          errors: ['Marinheiro não encontrado'],
        });
      }

      // Retorna os dados do marinheiro encontrado
      return res.json(sailor);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um marinheiro pelo id no banco de dados
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

      // Cria a constante sailor que procura as informaçoes do marinheiro no banco de dados e recebe os dados encontrados
      const sailor = await Sailor.findByPk(id);

      // Verifica se o marinheiro foi enocntrado no banco de dados
      if (!sailor) {
        return res.status(400).json({
          errors: ['Marinheiro não cadastrado'],
        });
      }

      // Apaga o registro do marinheiro no banco de dados
      await sailor.destroy();
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

      // Cria a constante sailor que procura as informaçoes do marinheiro no banco de dados e recebe os dados encontrados
      const sailor = await Sailor.findByPk(id);

      // Verifica se o marinheiro foi enocntrado no banco de dados
      if (!sailor) {
        return res.status(400).json({
          errors: ['Marinheiro não cadastrado'],
        });
      }

      // Atualiza os dados do marinheiro no banco de dados
      const sailorUpdated = await sailor.update(req.body);

      // Retorna os dados do marinheiro atualizado
      return res.json(sailorUpdated);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe AlunoController
export default new SailorController();
