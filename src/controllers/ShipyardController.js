// Importa o model Shipyard
import Shipyard from '../models/Shipyard';
// Importa o model Modeltb
import Modeltb from '../models/Modeltb';

// Cria a classe ShipyardController
class ShipyardController {
  // Metódo index que lista todos os estaleiros cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante shipyards que recebe todos os estaleiros cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const shipyards = await Shipyard.findAll({
      attributes: ['id', 'nome', 'regiao', 'estado', 'cidade', 'telefone', 'tipo', 'homepage', 'email', 'endereco'],
      order: [['id', 'DESC'], [Modeltb, 'id', 'DESC']],
      include: {
        model: Modeltb,
        attributes: ['nome'],
      },
    });
    // Retorna um json com todos os estaleiros cadastrados
    res.json(shipyards);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante shipyard que recebe os dados enviados na requisição salvando os dados no banco de dados
      const shipyard = await Shipyard.create(req.body);

      // Retorna os dados do estaleiro que foi cadastrado no banco de dados
      return res.json(shipyard);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um estaleiro pelo id no banco de dados e retorna os valores para o usuário
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

      // Cria a constante shipyard que procura as informaçoes do estaleiro no banco de dados e recebe os dados encontrados
      const shipyard = await Shipyard.findByPk(id, {
        attributes: ['id', 'nome', 'regiao', 'estado', 'cidade', 'telefone', 'tipo', 'homepage', 'email', 'endereco'],
      });

      // Verifica se o estaleiro foi enocntrado no banco de dados
      if (!shipyard) {
        return res.status(400).json({
          errors: ['Estaleiro não cadastrado'],
        });
      }

      // Retorna os dados do estaleiro encontrado
      return res.json(shipyard);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um estaleiro pelo id no banco de dados
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

      // Cria a constante shipyard que procura as informaçoes do estaleiro no banco de dados e recebe os dados encontrados
      const shipyard = await Shipyard.findByPk(id);

      // Verifica se o estaleiro foi encontrado no banco de dados
      if (!shipyard) {
        return res.status(400).json({
          errors: ['Estaleiro não cadastrado'],
        });
      }

      // Apaga o registro do estaleiro no banco de dados
      await shipyard.destroy();
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

      // Cria a constante shipyard que procura as informaçoes do estaleiro no banco de dados e recebe os dados encontrados
      const shipyard = await Shipyard.findByPk(id);

      // Verifica se o estaleiro foi encontrado no banco de dados
      if (!shipyard) {
        return res.status(400).json({
          errors: ['Estaleiro não cadastrado'],
        });
      }

      // Atualiza os dados do estaleiro no banco de dados
      const shipyardUpdated = await shipyard.update(req.body);

      // Retorna os dados do estaleiro atualizado
      return res.json(shipyardUpdated);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe ShipyardController
export default new ShipyardController();
