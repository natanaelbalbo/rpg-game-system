import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';

// Importação de serviços
import { MagicItemService } from './services/MagicItemService';
import { CharacterService } from './services/CharacterService';

// Importação de controladores
import { MagicItemController } from './controllers/MagicItemController';
import { CharacterController } from './controllers/CharacterController';

// Importação de rotas
import { magicItemRoutes } from './routes/magicItemRoutes';
import { characterRoutes } from './routes/characterRoutes';

// Inicializar a aplicação Express
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Instanciar serviços
const magicItemService = new MagicItemService();
const characterService = new CharacterService(magicItemService);

// Instanciar controladores
const magicItemController = new MagicItemController(magicItemService);
const characterController = new CharacterController(characterService);

// Configurar rotas
app.use('/api/magic-items', magicItemRoutes(magicItemController));
app.use('/api/characters', characterRoutes(characterController));

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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