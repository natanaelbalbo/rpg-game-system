"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
// Importação de serviços
const MagicItemService_1 = require("./services/MagicItemService");
const CharacterService_1 = require("./services/CharacterService");
// Importação de controladores
const MagicItemController_1 = require("./controllers/MagicItemController");
const CharacterController_1 = require("./controllers/CharacterController");
// Importação de rotas
const magicItemRoutes_1 = require("./routes/magicItemRoutes");
const characterRoutes_1 = require("./routes/characterRoutes");
// Inicializar a aplicação Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Instanciar serviços
const magicItemService = new MagicItemService_1.MagicItemService();
const characterService = new CharacterService_1.CharacterService(magicItemService);
// Instanciar controladores
const magicItemController = new MagicItemController_1.MagicItemController(magicItemService);
const characterController = new CharacterController_1.CharacterController(characterService);
// Configurar rotas
app.use('/api/magic-items', (0, magicItemRoutes_1.magicItemRoutes)(magicItemController));
app.use('/api/characters', (0, characterRoutes_1.characterRoutes)(characterController));
// Configurar Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Sistema de Gerenciamento de RPG API',
        documentation: `${req.protocol}://${req.get('host')}/api-docs`
    });
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação disponível em: http://localhost:${PORT}/api-docs`);
});
