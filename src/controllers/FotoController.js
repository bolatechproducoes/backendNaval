// Importa o multer para poder receber arquivos
import multer from 'multer';
// Importa as configurações do multer
import multerConfig from '../config/multerConfig';

// Importa o model da tabela fotos
import Foto from '../models/Foto';

// Cria a constante upload que recebe o multer com as configurações do multerConfig e recebe a foto enviada pelo usuário
const upload = multer(multerConfig).single('foto');

// Cria a classe FotoController
class FotoController {
  // Metódo store que recebe os parametros req e res
  store(req, res) {
    //
    return upload(req, res, async (error) => {
      // Verifica se ocorreu algum erro
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        // Cria as constantes originalname e filename que recebem o nome do arquivo enviado pelo usuário e o nome gerado pelo multer
        const { originalname, filename } = req.file;
        // Cria a constante boat_id que recebe o id da embarcação referente a foto
        const { boat_id } = req.body;
        // Cria a constante foto que cadastra o dado no banco de dados
        const foto = await Foto.create({ originalname, filename, boat_id });

        // Mostra a constante foto que salva os dados no banco de dados
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Embarcação não existe'],
        });
      }
    });
  }
}

// Exporta uma instância da classe FotoController
export default new FotoController();
