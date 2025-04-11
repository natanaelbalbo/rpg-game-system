"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const uuid_1 = require("uuid");
const interfaces_1 = require("./interfaces");
class Character {
    constructor(name, adventurerName, characterClass, baseStrength, baseDefense, level = 1, id, magicItems = []) {
        // Validação da distribuição de pontos
        if (baseStrength + baseDefense !== 10) {
            throw new Error('A soma de Força e Defesa base deve ser igual a 10.');
        }
        // Validação dos valores não negativos
        if (baseStrength < 0 || baseDefense < 0) {
            throw new Error('Os valores de Força e Defesa não podem ser negativos.');
        }
        this.id = id || (0, uuid_1.v4)();
        this.name = name;
        this.adventurerName = adventurerName;
        this.class = characterClass;
        this.level = level;
        this.baseStrength = baseStrength;
        this.baseDefense = baseDefense;
        this.magicItems = magicItems;
    }
    // Cálculo da força total (base + itens)
    getTotalStrength() {
        const itemsStrength = this.magicItems.reduce((total, item) => total + item.strength, 0);
        return this.baseStrength + itemsStrength;
    }
    // Cálculo da defesa total (base + itens)
    getTotalDefense() {
        const itemsDefense = this.magicItems.reduce((total, item) => total + item.defense, 0);
        return this.baseDefense + itemsDefense;
    }
    // Adicionar item mágico ao personagem
    addMagicItem(item) {
        // Verificar se já possui um amuleto (caso o novo item seja um amuleto)
        if (item.type === interfaces_1.MagicItemType.AMULETO) {
            const hasAmulet = this.magicItems.some(i => i.type === interfaces_1.MagicItemType.AMULETO);
            if (hasAmulet) {
                return false; // Já possui um amuleto
            }
        }
        // Adicionar o item à lista
        this.magicItems.push(item);
        return true;
    }
    // Remover item mágico do personagem
    removeMagicItem(itemId) {
        const initialLength = this.magicItems.length;
        this.magicItems = this.magicItems.filter(item => item.id !== itemId);
        return initialLength > this.magicItems.length;
    }
    // Obter o amuleto do personagem (se existir)
    getAmulet() {
        return this.magicItems.find(item => item.type === interfaces_1.MagicItemType.AMULETO);
    }
    // Validação para criação de personagem
    static validate(baseStrength, baseDefense) {
        // A soma deve ser 10 pontos
        if (baseStrength + baseDefense !== 10) {
            return false;
        }
        // Valores não podem ser negativos
        if (baseStrength < 0 || baseDefense < 0) {
            return false;
        }
        return true;
    }
}
exports.Character = Character;
