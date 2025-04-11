// Enum para as classes de personagens
export enum CharacterClass {
  GUERREIRO = 'Guerreiro',
  MAGO = 'Mago',
  ARQUEIRO = 'Arqueiro',
  LADINO = 'Ladino',
  BARDO = 'Bardo'
}

// Enum para os tipos de itens mágicos
export enum MagicItemType {
  ARMA = 'Arma',
  ARMADURA = 'Armadura',
  AMULETO = 'Amuleto'
}

// Interface para itens mágicos
export interface IMagicItem {
  id: string;
  name: string;
  type: MagicItemType;
  strength: number;
  defense: number;
}

// Interface para personagens
export interface ICharacter {
  id: string;
  name: string;
  adventurerName: string;
  class: CharacterClass;
  level: number;
  magicItems: IMagicItem[];
  baseStrength: number;
  baseDefense: number;
  
  // Métodos para cálculo de atributos
  getTotalStrength(): number;
  getTotalDefense(): number;
  
  // Métodos para gerenciamento de itens
  addMagicItem(item: IMagicItem): boolean;
  removeMagicItem(itemId: string): boolean;
  getAmulet(): IMagicItem | undefined;
} 