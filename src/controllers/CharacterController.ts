import { Request, Response } from 'express';
import { CharacterService } from '../services/CharacterService';
import { CharacterClass } from '../models/interfaces';

export class CharacterController {
  private characterService: CharacterService;
  
  constructor(characterService: CharacterService) {
    this.characterService = characterService;
  }

  // Listar todos os personagens
  getAllCharacters = (req: Request, res: Response): void => {
    try {
      const characters = this.characterService.getAllCharacters();
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar personagens', error });
    }
  }

  // Buscar personagem por ID
  getCharacterById = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const character = this.characterService.getCharacterById(id);
      
      if (!character) {
        res.status(404).json({ message: 'Personagem não encontrado' });
        return;
      }
      
      res.status(200).json(character);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar personagem', error });
    }
  }

  // Criar novo personagem
  createCharacter = (req: Request, res: Response): void => {
    try {
      const { name, adventurerName, characterClass, baseStrength, baseDefense, level } = req.body;
      
      // Verificar se todos os campos necessários foram fornecidos
      if (!name || !adventurerName || !characterClass || baseStrength === undefined || baseDefense === undefined) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        return;
      }
      
      // Validar a classe do personagem
      if (!Object.values(CharacterClass).includes(characterClass)) {
        res.status(400).json({ message: 'Classe de personagem inválida' });
        return;
      }
      
      const newCharacter = this.characterService.createCharacter(
        name, 
        adventurerName, 
        characterClass as CharacterClass, 
        baseStrength, 
        baseDefense,
        level
      );
      
      res.status(201).json(newCharacter);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Erro ao criar personagem' });
    }
  }

  // Atualizar nome de aventureiro
  updateAdventurerName = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const { adventurerName } = req.body;
      
      if (!adventurerName) {
        res.status(400).json({ message: 'Nome de aventureiro é obrigatório' });
        return;
      }
      
      const updatedCharacter = this.characterService.updateAdventurerName(id, adventurerName);
      
      if (!updatedCharacter) {
        res.status(404).json({ message: 'Personagem não encontrado' });
        return;
      }
      
      res.status(200).json(updatedCharacter);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar nome de aventureiro', error });
    }
  }

  // Remover personagem
  removeCharacter = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const wasRemoved = this.characterService.removeCharacter(id);
      
      if (!wasRemoved) {
        res.status(404).json({ message: 'Personagem não encontrado' });
        return;
      }
      
      res.status(200).json({ message: 'Personagem removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover personagem', error });
    }
  }

  // Adicionar item mágico ao personagem
  addItemToCharacter = (req: Request, res: Response): void => {
    try {
      const { characterId, itemId } = req.params;
      const wasAdded = this.characterService.addItemToCharacter(characterId, itemId);
      
      if (!wasAdded) {
        res.status(400).json({ 
          message: 'Não foi possível adicionar o item ao personagem. Verifique se o personagem já possui um amuleto ou se os IDs são válidos.'
        });
        return;
      }
      
      res.status(200).json({ message: 'Item adicionado ao personagem com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar item ao personagem', error });
    }
  }

  // Remover item mágico do personagem
  removeItemFromCharacter = (req: Request, res: Response): void => {
    try {
      const { characterId, itemId } = req.params;
      const wasRemoved = this.characterService.removeItemFromCharacter(characterId, itemId);
      
      if (!wasRemoved) {
        res.status(404).json({ message: 'Personagem ou item não encontrado' });
        return;
      }
      
      res.status(200).json({ message: 'Item removido do personagem com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover item do personagem', error });
    }
  }

  // Listar itens do personagem
  getCharacterItems = (req: Request, res: Response): void => {
    try {
      const { characterId } = req.params;
      const items = this.characterService.getCharacterItems(characterId);
      
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar itens do personagem', error });
    }
  }

  // Obter amuleto do personagem
  getCharacterAmulet = (req: Request, res: Response): void => {
    try {
      const { characterId } = req.params;
      const amulet = this.characterService.getCharacterAmulet(characterId);
      
      if (!amulet) {
        res.status(404).json({ message: 'Personagem não possui amuleto' });
        return;
      }
      
      res.status(200).json(amulet);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar amuleto do personagem', error });
    }
  }
} 