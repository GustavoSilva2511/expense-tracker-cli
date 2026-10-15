import { Command } from 'commander';
import chalk from 'chalk';
import Table from 'cli-table3';
import Service from './service.js';

const program = new Command();

const mounths = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

program
  .name('expense-tracker-cli')
  .description('CLI para gerenciamento de finanças pessoais')
  .version('1.0.0');

  
program
  .command('list')
  .description('List all transactions')
  .action(() => {
    const table = new Table({
      head: [chalk.cyan('ID'), chalk.cyan('Data'), chalk.cyan('Descrição'), chalk.cyan('Valor')],
      colWidths: [10, 15, 30, 15]
    });

    // Exemplo mockado (substituir por consulta ao banco SQLite)
    Service.listTransactions().forEach(row => {
      table.push([row.id, row.date.split(" ")[0], row.descricao, row.valor]);
    });

    console.log(table.toString());
  });

program
  .command('add')
  .description('Add a new transaction')
  .requiredOption('-d, --desc <description>', 'Descrição do item', '')
  .requiredOption('-v, --value <value>', 'Valor da transação', parseFloat)
  .action((options) => {
    Service.addTransaction(options.desc, options.value);
    console.log(chalk.green('Transação adicionada com sucesso!'));

  });

program
  .command('update')
  .description('Update a transaction')
  .requiredOption('-i, --id <id>', 'ID da transação', parseInt)
  .option('-d, --desc <description>', 'Descrição do item')
  .option('-v, --value <value>', 'Valor da transação', parseFloat)
  .action((options) => {
    Service.updateTransaction(options.id, options.desc, options.value);
    console.log(chalk.green('Transação atualizada com sucesso!'));
  });

program
  .command('delete')
  .description('Delete a transaction')
  .requiredOption('-i, --id <id>', 'ID da transação', parseInt)
  .action((options) => {
    Service.deleteTransaction(options.id);
    console.log(chalk.green('Transação deletada com sucesso!'));
  });

program
  .command('summary')
  .description('Show transaction summary')
  .option('-m, --mouth <Mouth>', 'Mês da transação', parseInt)
  .action((options) => {
    const summary = Service.getTransactionSummary(options.mouth);
    console.log(chalk.cyan(`Total de transações${ options.mouth ? " em " + mounths[options.mouth - 1] : "" }: ${summary.count}`));
    console.log(chalk.cyan(`Valor total: R$ ${summary.total.toFixed(2)}`));
  });

export default program;