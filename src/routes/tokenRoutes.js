// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe TokenController
import tokenController from '../controllers/TokenController';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o tokenController.index
router.post('/', tokenController.store);

// Exporta o router
export default router;
