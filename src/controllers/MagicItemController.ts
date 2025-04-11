import { Request, Response } from 'express';
import { MagicItemService } from '../services/MagicItemService';
import { MagicItemType } from '../models/interfaces';

export class MagicItemController {
  private magicItemService: MagicItemService;
  
  constructor(magicItemService: MagicItemService) {
    this.magicItemService = magicItemService;
  }

  // Listar todos os itens mágicos
  getAllItems = (req: Request, res: Response): void => {
    try {
      const items = this.magicItemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar itens mágicos', error });
    }
  }

  // Buscar item por ID
  getItemById = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const item = this.magicItemService.getItemById(id);
      
      if (!item) {
        res.status(404).json({ message: 'Item mágico não encontrado' });
        return;
      }
      
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar item mágico', error });
    }
  }

  // Criar novo item mágico
  createItem = (req: Request, res: Response): void => {
    try {
      const { name, type, strength, defense } = req.body;
      
      // Verificar se todos os campos necessários foram fornecidos
      if (!name || !type || strength === undefined || defense === undefined) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        return;
      }
      
      // Validar o tipo do item
      if (!Object.values(MagicItemType).includes(type)) {
        res.status(400).json({ message: 'Tipo de item inválido' });
        return;
      }
      
      const newItem = this.magicItemService.createItem(name, type as MagicItemType, strength, defense);
      res.status(201).json(newItem);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Erro ao criar item mágico' });
    }
  }

  // Remover item mágico
  removeItem = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const wasRemoved = this.magicItemService.removeItem(id);
      
      if (!wasRemoved) {
        res.status(404).json({ message: 'Item mágico não encontrado' });
        return;
      }
      
      res.status(200).json({ message: 'Item mágico removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover item mágico', error });
    }
  }

  // Atualizar item mágico
  updateItem = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const { name, type, strength, defense } = req.body;
      
      // Validar o tipo do item, se fornecido
      if (type && !Object.values(MagicItemType).includes(type)) {
        res.status(400).json({ message: 'Tipo de item inválido' });
        return;
      }
      
      const updatedItem = this.magicItemService.updateItem(
        id, 
        name, 
        type as MagicItemType | undefined,
        strength, 
        defense
      );
      
      if (!updatedItem) {
        res.status(404).json({ message: 'Item mágico não encontrado' });
        return;
      }
      
      res.status(200).json(updatedItem);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Erro ao atualizar item mágico' });
    }
  }
} 