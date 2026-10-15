# Solution to the challenge [Expense-tracker](https://roadmap.sh/projects/expense-tracker)


Link to challenge: https://roadmap.sh/projects/expense-tracker

## Sobre o projeto

CLI simples e direto para gerenciamento de finanças pessoais, desenvolvida em Node.js. Permite registrar despesas, listar transações, atualizar, remover e visualizar resumos totais ou filtrados por mês — tudo pelo terminal, com dados persistidos localmente em SQLite.

Ideal para quem quer controlar gastos de forma rápida sem depender de planilhas ou apps complexos, e também como projeto de estudo de CLI com Node.js.

## Funcionalidades

- **Adicionar transação:** registra descrição e valor com data automática
- **Listar transações:** exibe ID, data, descrição e valor em tabela formatada no terminal
- **Atualizar transação:** edita descrição e/ou valor pelo ID
- **Deletar transação:** remove um registro pelo ID
- **Resumo:** mostra quantidade de transações e valor total, com filtro opcional por mês

## Tecnologias

- **Node.js (ES Modules)** — runtime do projeto
- **commander** — definição de comandos e opções da CLI (`expense-tracker-cli`)
- **node:sqlite (`DatabaseSync`)** — persistência local em `database.db`
- **chalk** — cores e destaques no terminal
- **cli-table3** — tabelas formatadas para o comando `list`

## Instalação

Pré-requisitos: Node.js 20+ (recomendado 22+ pelo uso de `node:sqlite`).

```bash
# clonar o repositório
git clone <url-do-repo>
cd expense-tracker-cli

# instalar dependências
npm install

# (opcional) linkar o comando `expense-tracker-cli` globalmente
npm link
```

O banco SQLite (`database.db` + tabela `despesas`) é criado automaticamente na primeira execução.

## Como usar

```bash
# iniciar via npm
npm start -- <comando>

# ou, se linkado / com alias:
node src/main.js <comando>
expense-tracker-cli <comando>
```

### Exemplos

```bash
# adicionar uma despesa
expense-tracker-cli add -d "Almoço" -v 35.90

# listar todas as transações
expense-tracker-cli list

# atualizar uma transação
expense-tracker-cli update -i 1 -d "Almoço no restaurante" -v 42.50

# deletar uma transação
expense-tracker-cli delete -i 1

# resumo geral
expense-tracker-cli summary

# resumo filtrado por mês (1 = Janeiro ... 12 = Dezembro)
expense-tracker-cli summary -m 10
```

Saída do `summary`:
```text
Total de transações em Outubro: 5
Valor total: R$ 320.75
```

## Estrutura do projeto

```text
src/
├── main.js        # ponto de entrada, registra o program do commander
├── command.js     # definição dos comandos (list, add, update, delete, summary)
├── service.js     # regras de negócio (ex: filtro e soma do resumo mensal)
├── repository.js  # acesso ao SQLite (CRUD na tabela `despesas`)
└── config.js      # conexão e criação automática do banco/tabela
```