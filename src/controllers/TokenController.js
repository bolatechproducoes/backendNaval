// importa o jsw (jsonwebtoken)
import jsw from 'jsonwebtoken';
// Importa o model User
import User from '../models/User';
//

// Cria a classe TokenController
class TokenController {
  // Metódo store que verifica senha e email e cria um token jwt para o usuário
  async store(req, res) {
    // Cria as variáveis email e password com os valores recebidos no body da requisição
    const { email = '', password = '' } = req.body;

    // Verifica se foi enviado email e senha na requisição
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    // Cria a constante user que procura o email enviado no banco de dados
    const user = await User.findOne({ where: { email } });

    // Verifica se o email enviado na requisição existe no banco de dados
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    // Verifica se a senha enviada na requisição é igual a senha do usuário no banco de dados utilizando o metódo criado no model User
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    // Cria a constante id com o valor do id da constante user
    const { id } = user;
    // Cria a constate token utilizando o jsw e vinculando o email e senha do usuário
    const token = jsw.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    // Retorna um objeto com o token criado para o usuário e com os dados do usuário (nome, email e id)
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

// Exporta uma instância da classe TokenController
export default new TokenController();
