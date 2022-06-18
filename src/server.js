// Importa o metódo app que executa o express
import app from './app';

// Executa o metódo listen do express para escutar a porta 3001
const port = process.env.APP_PORT;
app.listen(port);
