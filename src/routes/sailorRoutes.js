// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe SailorController
import sailorController from '../controllers/SailorController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o sailorController.index
router.get('/', loginRequired, sailorController.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o sailorController.store, verficando se o usuário tem um token de login válido
router.post('/', loginRequired, sailorController.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o sailorController.update, verficando se o usuário tem um token de login válido
router.put('/:id', loginRequired, sailorController.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o sailorController.show
router.get('/:id', loginRequired, sailorController.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o sailorController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', loginRequired, sailorController.delete);

// Exporta o router
export default router;
