// Importa o model Club
import Club from '../models/Club';
// Importa o model Owner
import Owner from '../models/Owner';

// Cria a classe ClubController
class ClubController {
  // Metódo index que lista todos os Iate clubs, marinas e piers cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante clubs que recebe todos os Iate clubs, marinas e piers cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const clubs = await Club.findAll({
      attributes: ['id', 'nome', 'coordenada', 'regiao', 'estado', 'cidade', 'telefone', 'calado_max', 'homepage', 'email', 'endereco'],
      order: [['id', 'DESC'], [Owner, 'id', 'DESC']],
      include: {
        model: Owner,
        attributes: ['nome'],
      },
    });
    // Retorna um json com todos os Iate clubs, marinas e piers cadastrados
    res.json(clubs);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante club que recebe os dados enviados na requisição salvando os dados no banco de dados
      const club = await Club.create(req.body);

      // Retorna os dados do clube que foi cadastrado no banco de dados
      return res.json(club);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um Iate club, marina ou pier pelo id no banco de dados e retorna os valores para o usuário
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

      // Cria a constante club que procura as informaçoes do clube no banco de dados e recebe os dados encontrados
      const club = await Club.findByPk(id, {
        attributes: ['id', 'nome', 'coordenada', 'regiao', 'estado', 'cidade', 'telefone', 'calado_max', 'homepage', 'email', 'endereco'],
        order: [['id', 'DESC'], [Owner, 'id', 'DESC']],
        include: {
          model: Owner,
          attributes: ['nome'],
        },
      });

      // Verifica se o clube foi encontrado no banco de dados
      if (!club) {
        return res.status(400).json({
          errors: ['Iate Clube, Marina ou Pier não cadastrado'],
        });
      }

      // Retorna os dados do clube encontrado
      return res.json(club);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um clube pelo id no banco de dados
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

      // Cria a constante club que procura as informaçoes do clube no banco de dados e recebe os dados encontrados
      const club = await Club.findByPk(id);

      // Verifica se o clube foi enocntrado no banco de dados
      if (!club) {
        return res.status(400).json({
          errors: ['Iate Clube, Marina ou Pier não cadastrado'],
        });
      }

      // Apaga o registro do clube no banco de dados
      await club.destroy();
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

      // Cria a constante club que procura as informaçoes do clube no banco de dados e recebe os dados encontrados
      const club = await Club.findByPk(id);

      // Verifica se o clube foi enocntrado no banco de dados
      if (!club) {
        return res.status(400).json({
          errors: ['Iate Clube, Marina ou Pier não cadastrado'],
        });
      }

      // Atualiza os dados do clube no banco de dados
      const clubUpdated = await club.update(req.body);

      // Retorna os dados do clube encontrado
      return res.json(clubUpdated);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe ClubController
export default new ClubController();
