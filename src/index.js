// Entry
class Entry {
    constructor(date, amount, description) {
        this.date = date;
        this.amount = amount;
        this.description = description;
    }
    getFormattedAmount() {
        return this.amount + ' €'
    }
}

// Income
class Income extends Entry {
    constructor(date, amount, description) {
        super(date, amount, description);
        this.type = 'income'
    }
}

// Expense
class Expense extends Entry {
    constructor(date, amount, description, paid) {
        super(date, amount, description);
        this.paid = paid ?? false;
        this.type = 'expense'
    }
    getFormattedAmount() {
        return '-' + this.amount + ' €'
    }
}

// Budget
class Budget {
    constructor() {
        this.entries = []
    }
    addEntry(entry) {
        try {
            if (!(entry instanceof Entry)) {
                throw new TypeError('needs to be an expense or income entry')
            }
            this.entries.push(entry)
        }
        catch(e) {
                console.error(e)
        }
    }
    getTotalIncome() {
        let totalIncome = 0;
        this.entries.forEach(entry => {
            if (entry.type === 'income') {
                totalIncome += Number(entry.amount)
            }
        })
        return totalIncome
    }
    getTotalExpense() {
        let totalExpense = 0;
        this.entries.forEach(entry => {
            if (entry.type === 'expense') {
                totalExpense += Number(entry.amount)
            }
        })
        return totalExpense
    }
    getTotal(type) {
        try {
            if (!['expense','income'].includes(type)) {
                throw new Error('type needs to be either expense or income')
            }
            let total = 0;
            this.entries.forEach(entry => {
                if (entry.type === type) {
                    total += Number(entry.amount)
                }
            })
            return total
        }
        catch(e) {
            console.error(e)
        }
       
    }
    getCurrentBalance() {
        return this.getTotalIncome() - this.getTotalExpense()
    }
    getFormattedEntries() {
        const formattedEntries = [];
        this.entries.forEach(entry => {
            formattedEntries.push(`${entry.date} | ${entry.description} | ${entry.type == 'income' ? '+' : ''}${entry.getFormattedAmount()}`)
        })
        return formattedEntries
    }
}

