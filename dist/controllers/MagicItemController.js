"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicItemController = void 0;
const interfaces_1 = require("../models/interfaces");
class MagicItemController {
    constructor(magicItemService) {
        // Listar todos os itens mágicos
        this.getAllItems = (req, res) => {
            try {
                const items = this.magicItemService.getAllItems();
                res.status(200).json(items);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar itens mágicos', error });
            }
        };
        // Buscar item por ID
        this.getItemById = (req, res) => {
            try {
                const { id } = req.params;
                const item = this.magicItemService.getItemById(id);
                if (!item) {
                    res.status(404).json({ message: 'Item mágico não encontrado' });
                    return;
                }
                res.status(200).json(item);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar item mágico', error });
            }
        };
        // Criar novo item mágico
        this.createItem = (req, res) => {
            try {
                const { name, type, strength, defense } = req.body;
                // Verificar se todos os campos necessários foram fornecidos
                if (!name || !type || strength === undefined || defense === undefined) {
                    res.status(400).json({ message: 'Todos os campos são obrigatórios' });
                    return;
                }
                // Validar o tipo do item
                if (!Object.values(interfaces_1.MagicItemType).includes(type)) {
                    res.status(400).json({ message: 'Tipo de item inválido' });
                    return;
                }
                const newItem = this.magicItemService.createItem(name, type, strength, defense);
                res.status(201).json(newItem);
            }
            catch (error) {
                res.status(400).json({ message: error.message || 'Erro ao criar item mágico' });
            }
        };
        // Remover item mágico
        this.removeItem = (req, res) => {
            try {
                const { id } = req.params;
                const wasRemoved = this.magicItemService.removeItem(id);
                if (!wasRemoved) {
                    res.status(404).json({ message: 'Item mágico não encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Item mágico removido com sucesso' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao remover item mágico', error });
            }
        };
        // Atualizar item mágico
        this.updateItem = (req, res) => {
            try {
                const { id } = req.params;
                const { name, type, strength, defense } = req.body;
                // Validar o tipo do item, se fornecido
                if (type && !Object.values(interfaces_1.MagicItemType).includes(type)) {
                    res.status(400).json({ message: 'Tipo de item inválido' });
                    return;
                }
                const updatedItem = this.magicItemService.updateItem(id, name, type, strength, defense);
                if (!updatedItem) {
                    res.status(404).json({ message: 'Item mágico não encontrado' });
                    return;
                }
                res.status(200).json(updatedItem);
            }
            catch (error) {
                res.status(400).json({ message: error.message || 'Erro ao atualizar item mágico' });
            }
        };
        this.magicItemService = magicItemService;
    }
}
exports.MagicItemController = MagicItemController;
