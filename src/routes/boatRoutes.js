// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe BoatController
import boatController from '../controllers/BoatController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o boatController.index
router.get('/', loginRequired, boatController.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o boatController.store, verficando se o usuário tem um token de login válido
router.post('/', loginRequired, boatController.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o boatController.update, verficando se o usuário tem um token de login válido
router.put('/:id', loginRequired, boatController.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o boatController.show
router.get('/:id', loginRequired, boatController.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o boatController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', loginRequired, boatController.delete);

// Exporta o router
export default router;
