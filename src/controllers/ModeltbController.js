// Importa o model Modeltb
import Modeltb from '../models/Modeltb';
// Importa o model Boat
import Boat from '../models/Boat';

// Cria a classe ModeltbController
class ModeltbController {
  // Metódo index que lista todos os modelos cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante boatModels que recebe todos os modelos cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const boatModels = await Modeltb.findAll({
      attributes: ['id', 'nome', 'shipyard_id'],
      order: [['id', 'DESC'], [Boat, 'id', 'DESC']],
      include: {
        model: Boat,
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
      const boatModel = await Modeltb.create(req.body);

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
      const boatModel = await Modeltb.findByPk(id, {
        attributes: ['id', 'nome', 'shipyard_id'],
        order: [['id', 'DESC'], [Boat, 'id', 'DESC']],
        include: {
          model: Boat,
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
      const boatModel = await Modeltb.findByPk(id);

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
      const boatModel = await Modeltb.findByPk(id);

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
export default new ModeltbController();
