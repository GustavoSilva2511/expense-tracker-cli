import { DatabaseSync } from 'node:sqlite';

// Abre ou cria o arquivo do banco de dados
export const database = new DatabaseSync('./database.db');



function main() {
    database.exec(`
    CREATE TABLE IF NOT EXISTS despesas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `);
}

main();