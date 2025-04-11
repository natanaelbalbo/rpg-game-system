import { ICharacter, CharacterClass, IMagicItem } from '../models/interfaces';
import { Character } from '../models/Character';
import { MagicItemService } from './MagicItemService';

// Serviço para gerenciar os personagens
export class CharacterService {
  private characters: ICharacter[] = [];
  private magicItemService: MagicItemService;

  constructor(magicItemService: MagicItemService) {
    this.magicItemService = magicItemService;
  }

  // Criar um novo personagem
  createCharacter(
    name: string,
    adventurerName: string,
    characterClass: CharacterClass,
    baseStrength: number,
    baseDefense: number,
    level: number = 1
  ): ICharacter {
    // Validação dos pontos de atributos
    if (!Character.validate(baseStrength, baseDefense)) {
      throw new Error('A distribuição de pontos entre Força e Defesa é inválida.');
    }

    // Criar o personagem
    const newCharacter = new Character(
      name,
      adventurerName,
      characterClass,
      baseStrength,
      baseDefense,
      level
    );
    
    this.characters.push(newCharacter);
    
    return newCharacter;
  }

  // Listar todos os personagens
  getAllCharacters(): ICharacter[] {
    return [...this.characters];
  }

  // Buscar personagem por ID
  getCharacterById(id: string): ICharacter | undefined {
    return this.characters.find(character => character.id === id);
  }

  // Atualizar nome de aventureiro
  updateAdventurerName(id: string, newAdventurerName: string): ICharacter | undefined {
    const character = this.getCharacterById(id);
    
    if (!character) {
      return undefined;
    }
    
    character.adventurerName = newAdventurerName;
    return character;
  }

  // Remover personagem por ID
  removeCharacter(id: string): boolean {
    const initialLength = this.characters.length;
    this.characters = this.characters.filter(character => character.id !== id);
    
    return initialLength > this.characters.length;
  }

  // Adicionar item mágico ao personagem
  addItemToCharacter(characterId: string, itemId: string): boolean {
    const character = this.getCharacterById(characterId);
    const item = this.magicItemService.getItemById(itemId);
    
    if (!character || !item) {
      return false;
    }
    
    return character.addMagicItem(item);
  }

  // Remover item mágico do personagem
  removeItemFromCharacter(characterId: string, itemId: string): boolean {
    const character = this.getCharacterById(characterId);
    
    if (!character) {
      return false;
    }
    
    return character.removeMagicItem(itemId);
  }

  // Listar itens mágicos do personagem
  getCharacterItems(characterId: string): IMagicItem[] {
    const character = this.getCharacterById(characterId);
    
    if (!character) {
      return [];
    }
    
    return [...character.magicItems];
  }

  // Obter amuleto do personagem
  getCharacterAmulet(characterId: string): IMagicItem | undefined {
    const character = this.getCharacterById(characterId);
    
    if (!character) {
      return undefined;
    }
    
    return character.getAmulet();
  }
} 