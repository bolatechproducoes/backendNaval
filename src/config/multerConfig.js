// Importa o multer para poder receber arquivos
import multer from 'multer';
// Importa os módulos extname e resolve do path
import { extname, resolve } from 'path';

// Cria a constante aleatorio que recebe um número aleatório entre 100000 e 200000
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// Exporta os parametros de configuração do multer
export default {
  // Filtra o arquivo para só permitir o upload de imagens
  fileFilter: (req, file, cb) => {
    // Verifica se o aruivo tem a extensão .jpeg e .png
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      // Se o arquivo não for uma imagem, retorna um erro
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPEG'));
    }

    // Se o arquivo for uma imagem segue para armazenar o arquivo
    return cb(null, true);
  },
  // Define o local de armazenamento dos arquivos
  storage: multer.diskStorage({
    // Parametro que configura o destino do arquivo
    destination: (req, file, cb) => {
      // Chama a função de callback (cb) o primeiro parametro é o erro (null) e o segundo é o caminho do arquivo
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    // Parametro que configura o nome do arquivo
    filename: (req, file, cb) => {
      // Chama a função de callback (cb) o primeiro parametro é o erro (null) e o segundo é o nome do arquivo (`${Date.now()}_${aleatorio()}${extname(file.originalname)}`) (o nome gerado é a data atual em milisegundos + um numero aleatório e a extensão orinal do arquivo)
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
