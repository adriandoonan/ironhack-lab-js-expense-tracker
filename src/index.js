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
                console.log(e)
        }
    }
    getTotalIncome() {
        let totalIncome = 0;
        this.entries.forEach(entry => {
            if (entry.type === 'income') {
                totalIncome += entry.amount
            }
        })
        return totalIncome
    }
    getTotalExpense() {
        let totalExpense = 0;
        this.entries.forEach(entry => {
            if (entry.type === 'expense') {
                totalExpense += entry.amount
            }
        })
        return totalExpense
    }
    getCurrentBalance() {
        
        return this.getTotalIncome() - this.getTotalExpense()
    }
}


