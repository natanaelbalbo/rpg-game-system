# Sistema de Gerenciamento de RPG

Um sistema completo de gerenciamento para jogos de RPG (Role-Playing Game) desenvolvido em TypeScript e Node.js.

## Funcionalidades

### Gerenciamento de Personagens
- Cadastrar Personagem
- Listar Personagens
- Buscar Personagem por ID
- Atualizar Nome Aventureiro
- Remover Personagem
- Adicionar Item Mágico ao Personagem
- Remover Item Mágico do Personagem
- Listar Itens Mágicos do Personagem
- Buscar Amuleto do Personagem

### Gerenciamento de Itens Mágicos
- Cadastrar Item Mágico
- Listar Itens Mágicos
- Buscar Item Mágico por ID
- Atualizar Item Mágico
- Remover Item Mágico

## Regras de Negócio

### Personagens
- Cada personagem tem os seguintes atributos:
  - Identificador único
  - Nome
  - Nome Aventureiro
  - Classe (Guerreiro, Mago, Arqueiro, Ladino ou Bardo)
  - Nível
  - Lista de Itens Mágicos
  - Força (base + itens)
  - Defesa (base + itens)
- Na criação, 10 pontos devem ser distribuídos entre Força e Defesa base.
- Cada personagem pode ter apenas um Item Mágico do tipo Amuleto.

### Itens Mágicos
- Cada item mágico tem os seguintes atributos:
  - Identificador único
  - Nome
  - Tipo (Arma, Armadura ou Amuleto)
  - Força
  - Defesa
- Armas têm Defesa = 0
- Armaduras têm Força = 0
- Amuletos podem ter Força e Defesa
- Força e Defesa máximas = 10
- Itens não podem ter Força e Defesa iguais a 0

## Tecnologias Utilizadas

- TypeScript
- Node.js
- Express.js
- Swagger para documentação da API

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/rpg-management-system.git
cd rpg-management-system
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o TypeScript:
```bash
npm run build
```

4. Inicie a aplicação:
```bash
npm start
```

Para desenvolvimento com hot-reload:
```bash
npm run dev
```

## API Endpoints

O servidor estará rodando em `http://localhost:3000`.

A documentação completa da API está disponível em `http://localhost:3000/api-docs`.

### Personagens

- `GET /api/characters` - Listar todos os personagens
- `GET /api/characters/:id` - Buscar personagem por ID
- `POST /api/characters` - Criar novo personagem
- `PATCH /api/characters/:id/adventurer-name` - Atualizar nome de aventureiro
- `DELETE /api/characters/:id` - Remover personagem
- `GET /api/characters/:characterId/items` - Listar itens do personagem
- `GET /api/characters/:characterId/amulet` - Buscar amuleto do personagem
- `POST /api/characters/:characterId/items/:itemId` - Adicionar item ao personagem
- `DELETE /api/characters/:characterId/items/:itemId` - Remover item do personagem

### Itens Mágicos

- `GET /api/magic-items` - Listar todos os itens mágicos
- `GET /api/magic-items/:id` - Buscar item mágico por ID
- `POST /api/magic-items` - Criar novo item mágico
- `PUT /api/magic-items/:id` - Atualizar item mágico
- `DELETE /api/magic-items/:id` - Remover item mágico

## Exemplos de Requisições

### Criar Personagem
```json
POST /api/characters
{
  "name": "Gandalf",
  "adventurerName": "O Cinzento",
  "class": "Mago",
  "level": 1,
  "baseStrength": 4,
  "baseDefense": 6
}
```

### Atualizar Nome de Aventureiro
```json
PATCH /api/characters/:id/adventurer-name
{
  "adventurerName": "O Branco"
}
```

### Criar Item Mágico
```json
POST /api/magic-items
{
  "name": "Cajado de Fogo",
  "type": "Arma",
  "strength": 8,
  "defense": 0
}
```

### Atualizar Item Mágico
```json
PUT /api/magic-items/:id
{
  "name": "Cajado de Gelo",
  "type": "Arma",
  "strength": 9,
  "defense": 0
}
```

### Adicionar Item ao Personagem
```json
POST /api/characters/:characterId/items/:itemId
{
  // Não requer corpo na requisição
}
```

### Exemplos de Respostas

#### Resposta de Criação de Personagem
```json
{
  "id": "1",
  "name": "Gandalf",
  "adventurerName": "O Cinzento",
  "class": "Mago",
  "level": 1,
  "baseStrength": 4,
  "baseDefense": 6,
  "totalStrength": 4,
  "totalDefense": 6,
  "items": []
}
```

#### Resposta de Criação de Item Mágico
```json
{
  "id": "1",
  "name": "Cajado de Fogo",
  "type": "Arma",
  "strength": 8,
  "defense": 0
}
```

## Estrutura do Projeto

```
.
├── dist/                  # Código compilado
├── src/                   # Código fonte
│   ├── config/            # Configurações da aplicação
│   ├── controllers/       # Controladores
│   ├── models/            # Modelos e interfaces
│   ├── routes/            # Rotas da API
│   ├── services/          # Serviços de negócio
│   ├── utils/             # Utilitários
│   └── index.ts           # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Este arquivo
```