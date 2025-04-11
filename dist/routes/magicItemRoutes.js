"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.magicItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const magicItemRoutes = (controller) => {
    const router = express_1.default.Router();
    // Rotas para itens mágicos
    router.get('/', controller.getAllItems);
    router.get('/:id', controller.getItemById);
    router.post('/', controller.createItem);
    router.delete('/:id', controller.removeItem);
    router.put('/:id', controller.updateItem);
    return router;
};
exports.magicItemRoutes = magicItemRoutes;
