// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe OwnerController
import ownerController from '../controllers/OwnerController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o ownerController.index
router.get('/', loginRequired, ownerController.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o ownerController.store, verficando se o usuário tem um token de login válido
router.post('/', loginRequired, ownerController.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o ownerController.update, verficando se o usuário tem um token de login válido
router.put('/:id', loginRequired, ownerController.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o ownerController.show
router.get('/:id', loginRequired, ownerController.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o ownerController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', loginRequired, ownerController.delete);

// Exporta o router
export default router;
