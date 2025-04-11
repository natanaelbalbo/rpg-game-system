import express from 'express';
import { CharacterController } from '../controllers/CharacterController';

export const characterRoutes = (controller: CharacterController) => {
  const router = express.Router();
  
  // Rotas para personagens
  router.get('/', controller.getAllCharacters);
  router.get('/:id', controller.getCharacterById);
  router.post('/', controller.createCharacter);
  router.patch('/:id/adventurer-name', controller.updateAdventurerName);
  router.delete('/:id', controller.removeCharacter);
  
  // Rotas para gerenciamento de itens dos personagens
  router.get('/:characterId/items', controller.getCharacterItems);
  router.get('/:characterId/amulet', controller.getCharacterAmulet);
  router.post('/:characterId/items/:itemId', controller.addItemToCharacter);
  router.delete('/:characterId/items/:itemId', controller.removeItemFromCharacter);
  
  return router;
}; 