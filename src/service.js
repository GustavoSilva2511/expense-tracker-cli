import Repository from './repository.js';

class Service {
    addTransaction(description, value) {
        Repository.addTransaction(description, value);
    }

    listTransactions() {
        return Repository.listTransactions();
    }

    updateTransaction(id, description, value) {
        Repository.updateTransaction(id, description, value);
    }

    deleteTransaction(id) {
        Repository.deleteTransaction(id);
    }

    getTransactionSummary(mouth) {
        const transactions = this.listTransactions();
        const filteredTransactions = mouth ? transactions.filter(tx => new Date(tx.date).getMonth() === mouth - 1) : transactions;
        const total = filteredTransactions.reduce((sum, tx) => sum + tx.valor, 0);
        return {
            count: filteredTransactions.length,
            total: total
        };
    }
}

export default new Service();