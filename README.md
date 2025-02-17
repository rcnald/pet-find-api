# Find A Friend

Uma API REST desenvolvida em Node.js, Fastify e TypeScript para conectar pessoas a pets disponíveis para adoção, facilitando o processo de adoção de animais de estimação de forma segura e eficiente.

Este projeto foi desenvolvido como parte dos meus estudos em backend, utilizando tecnologias modernas como Node.js, Fastify, TypeScript, Prisma para gerenciamento do banco de dados PostgreSQL, e Zod para validação de dados. A API oferece um sistema completo para gerenciamento de pets e ORGs, incluindo cadastro, busca e processo de adoção.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.

## Como Usar

### 1. Clone este repositório:
```bash
git clone https://github.com/rcnald/pet-find-api.git
# ou
gh repo clone rcnald/pet-find-api
```

### 2. Entre no diretório do projeto:
```bash
cd pet-find-api
```

### 3. Instale as dependências do projeto:
```bash
npm install
```

### 4. Inicie o projeto:
```bash
npm run dev
```
O projeto será iniciado na porta [http://localhost:3333](http://localhost:3333) (se disponível).

## Funcionalidades Principais

### • Gerenciamento de Pets
- Cadastro completo de pets com informações detalhadas
- Listagem de pets por cidade com filtros personalizados
- Visualização detalhada das informações do pet
- Sistema de adoção integrado

### • Sistema de ORGs
- Cadastro e autenticação de organizações
- Perfil completo com endereço e contato
- Dashboard administrativo para gerenciar pets
- Integração com WhatsApp para comunicação

### • Segurança e Performance
- Autenticação robusta com JWT
- Senha criptografada para proteção dos dados
- Dados persistidos em PostgreSQL
- Sistema de paginação eficiente

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível concluir a adoção de um pet
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não-funcionais)
- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token); -->
