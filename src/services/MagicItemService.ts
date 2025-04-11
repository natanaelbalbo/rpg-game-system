import { IMagicItem, MagicItemType } from '../models/interfaces';
import { MagicItem } from '../models/MagicItem';

// Serviço para gerenciar os itens mágicos
export class MagicItemService {
  private items: IMagicItem[] = [];

  // Criar um novo item mágico
  createItem(
    name: string,
    type: MagicItemType,
    strength: number,
    defense: number
  ): IMagicItem {
    // Validação dos dados
    if (!MagicItem.validate(name, type, strength, defense)) {
      throw new Error('Os dados do item mágico são inválidos.');
    }

    // Criar o item
    const newItem = new MagicItem(name, type, strength, defense);
    this.items.push(newItem);
    
    return newItem;
  }

  // Listar todos os itens mágicos
  getAllItems(): IMagicItem[] {
    return [...this.items];
  }

  // Buscar item por ID
  getItemById(id: string): IMagicItem | undefined {
    return this.items.find(item => item.id === id);
  }

  // Remover item por ID
  removeItem(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    
    return initialLength > this.items.length;
  }

  // Atualizar item mágico
  updateItem(
    id: string, 
    name?: string,
    type?: MagicItemType,
    strength?: number,
    defense?: number
  ): IMagicItem | undefined {
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
    if (!MagicItem.validate(updatedName, updatedType, updatedStrength, updatedDefense)) {
      throw new Error('Os dados atualizados do item mágico são inválidos.');
    }
    
    // Criar um novo item com os dados atualizados
    const updatedItem = new MagicItem(
      updatedName,
      updatedType,
      updatedStrength,
      updatedDefense,
      id
    );
    
    // Atualizar no array
    this.items[itemIndex] = updatedItem;
    
    return updatedItem;
  }
} 