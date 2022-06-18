// Importa o model Owner
import Owner from '../models/Owner';
// Importa o model User
// import User from '../models/User';

// Cria a classe OwnerController
class OwnerController {
  // Metódo index que lista todos os proprietários cadastrados no banco de dados
  async index(req, res) {
    // Cria a constante alunos que recebe todos os alunos cadastrados no banco de dados mostrando os dados selecionados em attributes, o parâmetro order define que vai ordenar por id e ordem crescente (ASC) ou decrescente(DESC)
    const owners = await Owner.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'telefone', 'email', 'user_id', 'club_id', 'boat_id'],
      // order: [['id', 'DESC'], [User, 'id', 'DESC'], [Boat, 'id', 'DESC'], [Club, 'id', 'DESC']],
      // include: {
      // model: [User, Boat, Club],
      // attributes: ['nome', 'id'],
      // },
    });
    // Retorna um json com todos os proprietários cadastrados
    res.json(owners);
  }

  // Método store que salva os dados enviados no banco de dados
  async store(req, res) {
    try {
      // Cria a constante owner que recebe os dados enviados na requisição salvando os dados no banco de dados
      const owner = await Owner.create(req.body);

      // Retorna os dados do owner que foi cadastrado no banco de dados
      return res.json(owner);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo show que procura um proprietário pelo id no banco de dados e retorna os valores para o usuário
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

      // Cria a constante owner que procura as informaçoes do proprietário no banco de dados e recebe os dados encontrados
      const owner = await Owner.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'telefone', 'email', 'user_id', 'club_id', 'boat_id'],
      // order: [['id', 'DESC'], [User, 'id', 'DESC'], [Boat, 'id', 'DESC'], [Club, 'id', 'DESC']],
      // include: {
      // model: [User, Boat, Club],
      // attributes: ['nome', 'id'],
      // },
      });

      // Verifica se o proprietário foi enocntrado no banco de dados
      if (!owner) {
        return res.status(400).json({
          errors: ['Proprietário não cadastrado'],
        });
      }

      // Retorna os dados do proprietário encontrado
      return res.json(owner);

    // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Metódo delete que deleta um proprietário pelo id no banco de dados
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

      // Cria a constante owner que procura as informaçoes do proprietário no banco de dados e recebe os dados encontrados
      const owner = await Owner.findByPk(id);

      // Verifica se o proprietário foi encontrado no banco de dados
      if (!owner) {
        return res.status(400).json({
          errors: ['Proprietário não cadastrado'],
        });
      }

      // Apaga o registro do proprietário no banco de dados
      await owner.destroy();
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

      // Cria a constante owner que procura as informaçoes do proprietário no banco de dados e recebe os dados encontrados
      const owner = await Owner.findByPk(id);

      // Verifica se o proprietário foi encontrado no banco de dados
      if (!owner) {
        return res.status(400).json({
          errors: ['Proprietário não cadastrado'],
        });
      }

      // Atualiza os dados do proprietário no banco de dados
      const ownerUpdated = await owner.update(req.body);

      // Retorna os dados do proprietário atualizado
      return res.json(ownerUpdated);

      // Caso exista erro na requisição, retorna o erro
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

// Exporta uma instância da classe OwnerController
export default new OwnerController();
