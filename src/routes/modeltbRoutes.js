// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe ModeltbController
import modeltbController from '../controllers/ModeltbController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o modeltbController.index
router.get('/', loginRequired, modeltbController.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o modeltbController.store, verficando se o usuário tem um token de login válido
router.post('/', loginRequired, modeltbController.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o modeltbController.update, verficando se o usuário tem um token de login válido
router.put('/:id', loginRequired, modeltbController.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o modeltbController.show
router.get('/:id', loginRequired, modeltbController.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o modeltbController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', loginRequired, modeltbController.delete);

// Exporta o router
export default router;
