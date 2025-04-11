import { v4 as uuidv4 } from 'uuid';
import { ICharacter, CharacterClass, IMagicItem, MagicItemType } from './interfaces';

export class Character implements ICharacter {
  id: string;
  name: string;
  adventurerName: string;
  class: CharacterClass;
  level: number;
  magicItems: IMagicItem[];
  baseStrength: number;
  baseDefense: number;

  constructor(
    name: string,
    adventurerName: string,
    characterClass: CharacterClass,
    baseStrength: number,
    baseDefense: number,
    level: number = 1,
    id?: string,
    magicItems: IMagicItem[] = []
  ) {
    // Validação da distribuição de pontos
    if (baseStrength + baseDefense !== 10) {
      throw new Error('A soma de Força e Defesa base deve ser igual a 10.');
    }

    // Validação dos valores não negativos
    if (baseStrength < 0 || baseDefense < 0) {
      throw new Error('Os valores de Força e Defesa não podem ser negativos.');
    }

    this.id = id || uuidv4();
    this.name = name;
    this.adventurerName = adventurerName;
    this.class = characterClass;
    this.level = level;
    this.baseStrength = baseStrength;
    this.baseDefense = baseDefense;
    this.magicItems = magicItems;
  }

  // Cálculo da força total (base + itens)
  getTotalStrength(): number {
    const itemsStrength = this.magicItems.reduce((total, item) => total + item.strength, 0);
    return this.baseStrength + itemsStrength;
  }

  // Cálculo da defesa total (base + itens)
  getTotalDefense(): number {
    const itemsDefense = this.magicItems.reduce((total, item) => total + item.defense, 0);
    return this.baseDefense + itemsDefense;
  }

  // Adicionar item mágico ao personagem
  addMagicItem(item: IMagicItem): boolean {
    // Verificar se já possui um amuleto (caso o novo item seja um amuleto)
    if (item.type === MagicItemType.AMULETO) {
      const hasAmulet = this.magicItems.some(i => i.type === MagicItemType.AMULETO);
      if (hasAmulet) {
        return false; // Já possui um amuleto
      }
    }

    // Adicionar o item à lista
    this.magicItems.push(item);
    return true;
  }

  // Remover item mágico do personagem
  removeMagicItem(itemId: string): boolean {
    const initialLength = this.magicItems.length;
    this.magicItems = this.magicItems.filter(item => item.id !== itemId);
    
    return initialLength > this.magicItems.length;
  }

  // Obter o amuleto do personagem (se existir)
  getAmulet(): IMagicItem | undefined {
    return this.magicItems.find(item => item.type === MagicItemType.AMULETO);
  }

  // Validação para criação de personagem
  static validate(
    baseStrength: number,
    baseDefense: number
  ): boolean {
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