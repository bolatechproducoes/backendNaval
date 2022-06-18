// Cria a classe HomeController
class HomeController {
  // Metódo index que retorna um json com o campo 'tudoCerto' com o valor 'true'
  async index(req, res) {
    res.json('index');
  }
}

// Exporta uma instância da classe HomeController
export default new HomeController();
