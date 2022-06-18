"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o metódo app que executa o express
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

// Executa o metódo listen do express para escutar a porta 3001
const port = process.env.APP_PORT;
_app2.default.listen(port);
