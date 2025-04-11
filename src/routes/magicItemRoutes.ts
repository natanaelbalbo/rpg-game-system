import express from 'express';
import { MagicItemController } from '../controllers/MagicItemController';

export const magicItemRoutes = (controller: MagicItemController) => {
  const router = express.Router();
  
  // Rotas para itens mágicos
  router.get('/', controller.getAllItems);
  router.get('/:id', controller.getItemById);
  router.post('/', controller.createItem);
  router.delete('/:id', controller.removeItem);
  router.put('/:id', controller.updateItem);
  
  return router;
}; 