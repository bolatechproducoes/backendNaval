// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe ShipyardController
import shipyardController from '../controllers/ShipyardController';

// Importa o middleware loginRequired
import loginRequired from '../middlewares/loginRequired';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o shipyardController.index
router.get('/', loginRequired, shipyardController.index);
// Utiliza o método post do router para criar a rota raiz('/') utilizando o shipyardController.store, verficando se o usuário tem um token de login válido
router.post('/', loginRequired, shipyardController.store);
// Utiliza o método put do router para criar a rota raiz('/') utilizando o shipyardController.update, verficando se o usuário tem um token de login válido
router.put('/:id', loginRequired, shipyardController.update);
// Utiliza o método get do router para criar a rota raiz('/') utilizando o shipyardController.show
router.get('/:id', loginRequired, shipyardController.show);
// Utiliza o método delete do router para criar a rota raiz('/') utilizando o shipyardController.delete, verficando se o usuário tem um token de login válido
router.delete('/:id', loginRequired, shipyardController.delete);

// Exporta o router
export default router;
