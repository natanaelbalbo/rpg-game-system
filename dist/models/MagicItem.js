"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicItem = void 0;
const uuid_1 = require("uuid");
const interfaces_1 = require("./interfaces");
class MagicItem {
    constructor(name, type, strength, defense, id) {
        // Validações conforme os requisitos
        // Validação do tipo com atributos
        if (type === interfaces_1.MagicItemType.ARMA && defense !== 0) {
            throw new Error('Armas não podem ter defesa. Defesa deve ser zero.');
        }
        if (type === interfaces_1.MagicItemType.ARMADURA && strength !== 0) {
            throw new Error('Armaduras não podem ter força. Força deve ser zero.');
        }
        // Validação dos valores máximos
        if (strength > 10 || defense > 10) {
            throw new Error('A força e a defesa de um item não podem ser maiores que 10.');
        }
        // Validação de atributos não nulos
        if (strength === 0 && defense === 0) {
            throw new Error('Itens não podem ter força e defesa iguais a zero.');
        }
        this.id = id || (0, uuid_1.v4)();
        this.name = name;
        this.type = type;
        this.strength = strength;
        this.defense = defense;
    }
    // Método estático de validação para uso em cenários de criação/atualização
    static validate(name, type, strength, defense) {
        // Tipo de item com atributos corretos
        if (type === interfaces_1.MagicItemType.ARMA && defense !== 0) {
            return false;
        }
        if (type === interfaces_1.MagicItemType.ARMADURA && strength !== 0) {
            return false;
        }
        // Valores máximos
        if (strength > 10 || defense > 10) {
            return false;
        }
        // Atributos não nulos
        if (strength === 0 && defense === 0) {
            return false;
        }
        return true;
    }
}
exports.MagicItem = MagicItem;
