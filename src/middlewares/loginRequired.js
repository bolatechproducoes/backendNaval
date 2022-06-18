// Importa o jwt (jsonwebtoken)
import jwt from 'jsonwebtoken';
// Importa o Model User
import User from '../models/User';

// Verifica se o usuário tem um token válido de login
export default async (req, res, next) => {
  // Cria a constante authorization que recebe o token do header Authorization
  const { authorization } = req.headers;
  //
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login requerido'],
    });
  }

  // Cria as constantes texto e token separando o token pelo caractere de espaço (para separar o texto da chave do valor do token)
  const [, token] = authorization.split(' ');

  // Verifica se o token é válido
  try {
    // Cria a constante dados que verifica se o token é válido utilizando o secret do token
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    // Crias as constantes id e email que recebem os dados da constante dados
    const { id, email } = dados;

    // Cria a constante user que verifica se o id e email correspondem a um usuário cadastrado no banco de dados
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    //
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    // Atribui ao userId da requisição o valor da constante id
    req.userId = id;
    // Atribui ao userEmail da requisição o valor da constante email
    req.userEmail = email;
    // Passa para o próximo middleware
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
