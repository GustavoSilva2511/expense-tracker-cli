import {database} from './config.js';

class Repository {
    addTransaction(description, value) {
        const insert = database.prepare('INSERT INTO despesas (descricao, valor) VALUES (?, ?)');
        insert.run(description, value);
    }

    listTransactions() {
        const query = database.prepare('SELECT * FROM despesas');
        return query.all();
    }

    updateTransaction(id, description, value) {
        const update = database.prepare('UPDATE despesas SET descricao = ?, valor = ? WHERE id = ?');
        update.run(description, value, id);
    }

    deleteTransaction(id) {
        const del = database.prepare('DELETE FROM despesas WHERE id = ?');
        del.run(id);
    }
}

export default new Repository();