"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
exports.swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API de Gerenciamento de RPG',
        version: '1.0.0',
        description: 'API para gerenciamento de personagens e itens mágicos em jogos de RPG',
        contact: {
            name: 'Desenvolvedor',
            email: 'desenvolvedor@email.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desenvolvimento'
        }
    ],
    tags: [
        {
            name: 'Personagens',
            description: 'Operações relacionadas a personagens'
        },
        {
            name: 'Itens Mágicos',
            description: 'Operações relacionadas a itens mágicos'
        }
    ],
    paths: {
        '/api/characters': {
            get: {
                tags: ['Personagens'],
                summary: 'Listar todos os personagens',
                responses: {
                    '200': {
                        description: 'Lista de personagens retornada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Character'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            post: {
                tags: ['Personagens'],
                summary: 'Criar um novo personagem',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CharacterInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Personagem criado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Character'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Dados inválidos'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/characters/{id}': {
            get: {
                tags: ['Personagens'],
                summary: 'Buscar personagem por ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Personagem encontrado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Character'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Personagem não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            delete: {
                tags: ['Personagens'],
                summary: 'Remover personagem',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Personagem removido com sucesso'
                    },
                    '404': {
                        description: 'Personagem não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/characters/{id}/adventurer-name': {
            patch: {
                tags: ['Personagens'],
                summary: 'Atualizar nome de aventureiro',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    adventurerName: {
                                        type: 'string'
                                    }
                                },
                                required: ['adventurerName']
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Nome de aventureiro atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Character'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Dados inválidos'
                    },
                    '404': {
                        description: 'Personagem não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/characters/{characterId}/items': {
            get: {
                tags: ['Personagens'],
                summary: 'Listar itens do personagem',
                parameters: [
                    {
                        in: 'path',
                        name: 'characterId',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Lista de itens retornada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/MagicItem'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/characters/{characterId}/amulet': {
            get: {
                tags: ['Personagens'],
                summary: 'Buscar amuleto do personagem',
                parameters: [
                    {
                        in: 'path',
                        name: 'characterId',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Amuleto encontrado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/MagicItem'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Personagem não possui amuleto'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/characters/{characterId}/items/{itemId}': {
            post: {
                tags: ['Personagens'],
                summary: 'Adicionar item ao personagem',
                parameters: [
                    {
                        in: 'path',
                        name: 'characterId',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    },
                    {
                        in: 'path',
                        name: 'itemId',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do item mágico'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Item adicionado com sucesso'
                    },
                    '400': {
                        description: 'Não foi possível adicionar o item'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            delete: {
                tags: ['Personagens'],
                summary: 'Remover item do personagem',
                parameters: [
                    {
                        in: 'path',
                        name: 'characterId',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do personagem'
                    },
                    {
                        in: 'path',
                        name: 'itemId',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do item mágico'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Item removido com sucesso'
                    },
                    '404': {
                        description: 'Personagem ou item não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/magic-items': {
            get: {
                tags: ['Itens Mágicos'],
                summary: 'Listar todos os itens mágicos',
                responses: {
                    '200': {
                        description: 'Lista de itens mágicos retornada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/MagicItem'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            post: {
                tags: ['Itens Mágicos'],
                summary: 'Criar um novo item mágico',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MagicItemInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Item mágico criado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/MagicItem'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Dados inválidos'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/api/magic-items/{id}': {
            get: {
                tags: ['Itens Mágicos'],
                summary: 'Buscar item mágico por ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do item mágico'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Item mágico encontrado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/MagicItem'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Item mágico não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            put: {
                tags: ['Itens Mágicos'],
                summary: 'Atualizar item mágico',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do item mágico'
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MagicItemInput'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Item mágico atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/MagicItem'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Dados inválidos'
                    },
                    '404': {
                        description: 'Item mágico não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            delete: {
                tags: ['Itens Mágicos'],
                summary: 'Remover item mágico',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID do item mágico'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Item mágico removido com sucesso'
                    },
                    '404': {
                        description: 'Item mágico não encontrado'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Character: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Identificador único do personagem'
                    },
                    name: {
                        type: 'string',
                        description: 'Nome do personagem'
                    },
                    adventurerName: {
                        type: 'string',
                        description: 'Nome de aventureiro do personagem'
                    },
                    class: {
                        type: 'string',
                        enum: ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'],
                        description: 'Classe do personagem'
                    },
                    level: {
                        type: 'integer',
                        description: 'Nível do personagem'
                    },
                    baseStrength: {
                        type: 'integer',
                        description: 'Força base do personagem'
                    },
                    baseDefense: {
                        type: 'integer',
                        description: 'Defesa base do personagem'
                    },
                    magicItems: {
                        type: 'array',
                        description: 'Lista de itens mágicos do personagem',
                        items: {
                            $ref: '#/components/schemas/MagicItem'
                        }
                    }
                }
            },
            CharacterInput: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Nome do personagem'
                    },
                    adventurerName: {
                        type: 'string',
                        description: 'Nome de aventureiro do personagem'
                    },
                    characterClass: {
                        type: 'string',
                        enum: ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'],
                        description: 'Classe do personagem'
                    },
                    baseStrength: {
                        type: 'integer',
                        description: 'Força base do personagem'
                    },
                    baseDefense: {
                        type: 'integer',
                        description: 'Defesa base do personagem'
                    },
                    level: {
                        type: 'integer',
                        description: 'Nível do personagem'
                    }
                },
                required: ['name', 'adventurerName', 'characterClass', 'baseStrength', 'baseDefense']
            },
            MagicItem: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Identificador único do item mágico'
                    },
                    name: {
                        type: 'string',
                        description: 'Nome do item mágico'
                    },
                    type: {
                        type: 'string',
                        enum: ['Arma', 'Armadura', 'Amuleto'],
                        description: 'Tipo do item mágico'
                    },
                    strength: {
                        type: 'integer',
                        description: 'Bônus de força do item'
                    },
                    defense: {
                        type: 'integer',
                        description: 'Bônus de defesa do item'
                    }
                }
            },
            MagicItemInput: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Nome do item mágico'
                    },
                    type: {
                        type: 'string',
                        enum: ['Arma', 'Armadura', 'Amuleto'],
                        description: 'Tipo do item mágico'
                    },
                    strength: {
                        type: 'integer',
                        description: 'Bônus de força do item'
                    },
                    defense: {
                        type: 'integer',
                        description: 'Bônus de defesa do item'
                    }
                },
                required: ['name', 'type', 'strength', 'defense']
            }
        }
    }
};
