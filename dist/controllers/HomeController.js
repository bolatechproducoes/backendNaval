"use strict";Object.defineProperty(exports, "__esModule", {value: true});// Cria a classe HomeController
class HomeController {
  // Metódo index que retorna um json com o campo 'tudoCerto' com o valor 'true'
  async index(req, res) {
    res.json('indexes2');
  }
}

// Exporta uma instância da classe HomeController
exports. default = new HomeController();
