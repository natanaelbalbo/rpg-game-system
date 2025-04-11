"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const Character_1 = require("../models/Character");
// Serviço para gerenciar os personagens
class CharacterService {
    constructor(magicItemService) {
        this.characters = [];
        this.magicItemService = magicItemService;
    }
    // Criar um novo personagem
    createCharacter(name, adventurerName, characterClass, baseStrength, baseDefense, level = 1) {
        // Validação dos pontos de atributos
        if (!Character_1.Character.validate(baseStrength, baseDefense)) {
            throw new Error('A distribuição de pontos entre Força e Defesa é inválida.');
        }
        // Criar o personagem
        const newCharacter = new Character_1.Character(name, adventurerName, characterClass, baseStrength, baseDefense, level);
        this.characters.push(newCharacter);
        return newCharacter;
    }
    // Listar todos os personagens
    getAllCharacters() {
        return [...this.characters];
    }
    // Buscar personagem por ID
    getCharacterById(id) {
        return this.characters.find(character => character.id === id);
    }
    // Atualizar nome de aventureiro
    updateAdventurerName(id, newAdventurerName) {
        const character = this.getCharacterById(id);
        if (!character) {
            return undefined;
        }
        character.adventurerName = newAdventurerName;
        return character;
    }
    // Remover personagem por ID
    removeCharacter(id) {
        const initialLength = this.characters.length;
        this.characters = this.characters.filter(character => character.id !== id);
        return initialLength > this.characters.length;
    }
    // Adicionar item mágico ao personagem
    addItemToCharacter(characterId, itemId) {
        const character = this.getCharacterById(characterId);
        const item = this.magicItemService.getItemById(itemId);
        if (!character || !item) {
            return false;
        }
        return character.addMagicItem(item);
    }
    // Remover item mágico do personagem
    removeItemFromCharacter(characterId, itemId) {
        const character = this.getCharacterById(characterId);
        if (!character) {
            return false;
        }
        return character.removeMagicItem(itemId);
    }
    // Listar itens mágicos do personagem
    getCharacterItems(characterId) {
        const character = this.getCharacterById(characterId);
        if (!character) {
            return [];
        }
        return [...character.magicItems];
    }
    // Obter amuleto do personagem
    getCharacterAmulet(characterId) {
        const character = this.getCharacterById(characterId);
        if (!character) {
            return undefined;
        }
        return character.getAmulet();
    }
}
exports.CharacterService = CharacterService;
