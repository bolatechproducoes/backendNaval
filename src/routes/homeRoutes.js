// Importa o metódo Router do express
import { Router } from 'express';
// importa o objeto criado pela classe HomeController
import homeController from '../controllers/HomeController';

// Cria a constante router que executa o metódo Router do express
const router = Router();

// Utiliza o método get do router para criar a rota raiz('/') utilizando o homeController.index
router.get('/', homeController.index);

// Exporta o router
export default router;
