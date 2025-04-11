"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const characterRoutes = (controller) => {
    const router = express_1.default.Router();
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
exports.characterRoutes = characterRoutes;
