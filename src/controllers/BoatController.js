// Importa o model Boat
import Boat from '../models/Boat';
// Importa o model Foto
import Foto from '../models/Foto';
// Importa o model Owner
import Owner from '../models/Owner';

// Cria a classe BoatController
class BoatController {
  // Metódo index que lista todos os barcos cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante boats que recebe todos os barcos cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const boats = await Boat.findAll({
      attributes: ['id', 'nome', 'sailor_id', 'model_id'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC'], [Owner, 'id', 'ASC']],
      include: [{
        model: Foto,
        attributes: ['url', 'filename'],
      }, {
        model: Owner,
        attributes: ['nome', 'id', 'club_id'],
      }],
    });
    // Retorna um json com todos os barcos cadastrados
    res.json(boats);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante boat que recebe os dados enviados na requisição salvando os dados no banco de dados
      const boat = await Boat.create(req.body);

      // Retorna os dados do barco que foi cadastrado no banco de dados
      return res.json(boat);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um barco pelo id no banco de dados e retorna os valores para o usuário
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

      // Cria a constante boat que procura as informaçoes do barco no banco de dados e recebe os dados encontrados
      const boat = await Boat.findByPk(id, {
        attributes: ['id', 'nome', 'sailor_id', 'model_id'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC'], [Owner, 'id', 'ASC']],
        include: [{
          model: Foto,
          attributes: ['url', 'filename'],
        }, {
          model: Owner,
          attributes: ['nome', 'id', 'club_id'],
        }],
      });

      // Verifica se o barco foi encontrado no banco de dados
      if (!boat) {
        return res.status(400).json({
          errors: ['Embarcação não encontrada'],
        });
      }

      // Retorna os dados do barco encontrado
      return res.json(boat);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um barco pelo id no banco de dados
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

      // Cria a constante barco que procura as informaçoes do barco no banco de dados e recebe os dados encontrados
      const boat = await Boat.findByPk(id);

      // Verifica se o barco foi enocntrado no banco de dados
      if (!boat) {
        return res.status(400).json({
          errors: ['Embarcação não encontrada'],
        });
      }

      // Apaga o registro do barco no banco de dados
      await boat.destroy();
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

      // Cria a constante boat que procura as informaçoes do barco no banco de dados e recebe os dados encontrados
      const boat = await Boat.findByPk(id);

      // Verifica se o barco foi enocntrado no banco de dados
      if (!boat) {
        return res.status(400).json({
          errors: ['Embarcação não cadastrada'],
        });
      }

      // Atualiza os dados do barco no banco de dados
      const boatUpdated = await boat.update(req.body);

      // Retorna os dados do barco atualizado
      return res.json(boatUpdated);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe BoatController
export default new BoatController();
