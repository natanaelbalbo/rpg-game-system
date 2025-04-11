"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicItemService = void 0;
const MagicItem_1 = require("../models/MagicItem");
// Serviço para gerenciar os itens mágicos
class MagicItemService {
    constructor() {
        this.items = [];
    }
    // Criar um novo item mágico
    createItem(name, type, strength, defense) {
        // Validação dos dados
        if (!MagicItem_1.MagicItem.validate(name, type, strength, defense)) {
            throw new Error('Os dados do item mágico são inválidos.');
        }
        // Criar o item
        const newItem = new MagicItem_1.MagicItem(name, type, strength, defense);
        this.items.push(newItem);
        return newItem;
    }
    // Listar todos os itens mágicos
    getAllItems() {
        return [...this.items];
    }
    // Buscar item por ID
    getItemById(id) {
        return this.items.find(item => item.id === id);
    }
    // Remover item por ID
    removeItem(id) {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return initialLength > this.items.length;
    }
    // Atualizar item mágico
    updateItem(id, name, type, strength, defense) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return undefined;
        }
        const currentItem = this.items[itemIndex];
        // Valores a serem atualizados ou valores atuais
        const updatedName = name || currentItem.name;
        const updatedType = type || currentItem.type;
        const updatedStrength = strength !== undefined ? strength : currentItem.strength;
        const updatedDefense = defense !== undefined ? defense : currentItem.defense;
        // Validar os dados atualizados
        if (!MagicItem_1.MagicItem.validate(updatedName, updatedType, updatedStrength, updatedDefense)) {
            throw new Error('Os dados atualizados do item mágico são inválidos.');
        }
        // Criar um novo item com os dados atualizados
        const updatedItem = new MagicItem_1.MagicItem(updatedName, updatedType, updatedStrength, updatedDefense, id);
        // Atualizar no array
        this.items[itemIndex] = updatedItem;
        return updatedItem;
    }
}
exports.MagicItemService = MagicItemService;
