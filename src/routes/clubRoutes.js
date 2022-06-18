// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe ClubController
import clubController from '../controllers/ClubController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o clubController.index
router.get('/', loginRequired, clubController.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o clubController.store, verficando se o usuário tem um token de login válido
router.post('/', loginRequired, clubController.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o clubController.update, verficando se o usuário tem um token de login válido
router.put('/:id', loginRequired, clubController.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o clubController.show
router.get('/:id', loginRequired, clubController.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o clubController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', loginRequired, clubController.delete);

// Exporta o router
export default router;
