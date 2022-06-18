// Importa o metódo Router do express
import { Router } from 'express';
// Importa o middleware de autenticação loginRequired
import loginRequired from '../middlewares/loginRequired';

// importa o objeto criado pela classe FotoController
import fotoController from '../controllers/FotoController';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o fotoController.store, e verificando se o usuário tem um token de login válido com o loginRequired
router.post('/', loginRequired, fotoController.store);

// Exporta o router
export default router;
