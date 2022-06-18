// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe HomeController
import userController from '../controllers/UserController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// #### Rotas para aprender CRUD (não devem estar na apicação final)
// Utiliza o método get do router para criar a rota raiz('/') utilizando o userController.index e verificando se o login é válido pelo middleware loginRequired
router.get('/', userController.index); // Não deve existir para os usuários verem os outros usuários
// Utiliza o método get do router para receber o id e criar a rota raiz('/') utilizando o userController.show para buscar o usuário pelo id
router.get('/:id', userController.show); // Não deve existir para os usuários verem os outros usuários

// Utiliza o método post do router para criar a rota raiz('/') utilizando o userController.store
router.post('/', userController.store);
// Utiliza o método put do router para receber o id e criar a rota raiz('/') utilizando o userController.update para buscar o usuário pelo id e atualizar os dados do usuário no banco de dados
router.put('/', loginRequired, userController.update);
// Utiliza o método delete do router para receber o id e criar a rota raiz('/') utilizando o userController.delete para buscar o usuário pelo id e apaga-lo do banco de dados
router.delete('/', loginRequired, userController.delete);

// Exporta o router
export default router;
