describe("Budget", () => {
  
    describe("getTotal", () => {
      it("should be defined", () => {
        const budget = new Budget();
        expect(budget.getTotal).toBeDefined();
      });
      it("should take one argument", () => {
        const budget = new Budget();
        expect(budget.getTotal.length).toEqual(1);
      });
  
      it("should return 0 if there are no entries", () => {
        const budget = new Budget();
        expect(budget.getTotal('expense')).toEqual(0);
      });
  
      it('should return the total income of all "income" entries', () => {
        const budget = new Budget('income');
        const income1 = new Income("2024-06-17", 100, "food");
        const income2 = new Income("2024-06-17", 200, "food");
        const expense = new Expense("2024-06-17", 100, "food", true);
  
        budget.addEntry(income1);
        budget.addEntry(income2);
        budget.addEntry(expense);
  
        expect(budget.getTotal('income')).toEqual(300);
      });

      it('should return the total expense of all "expense" entries', () => {
        const budget = new Budget();
        const expense1 = new Expense("2024-06-17", 100, "food", true);
        const expense2 = new Expense("2024-06-17", 200, "food", false);
        const income = new Income("2024-06-17", 100, "food");
        budget.addEntry(expense1);
        budget.addEntry(expense2);
        budget.addEntry(income);
        expect(budget.getTotal('expense')).toEqual(300);
      });
  
      it("should use the 'forEach()' method to iterate over the entries array", () => {
        const budget = new Budget();
        spyOn(budget.entries, "forEach").and.callThrough();
        budget.getTotal('income');
        expect(budget.entries.forEach).toHaveBeenCalled();
        expect(budget.entries.forEach).toHaveBeenCalledWith(
          jasmine.any(Function)
        );
      });
    });
  

  
    describe("getFormattedEntries", () => {
      it("should be defined", () => {
        const budget = new Budget();
        expect(budget.getFormattedEntries).toBeDefined();
      });
  
      it("should take no arguments", () => {
        const budget = new Budget();
        expect(budget.getFormattedEntries.length).toEqual(0);
      });
  
      it("should return an empty array if there are no entries", () => {
        const budget = new Budget();
        expect(budget.getFormattedEntries()).toEqual([]);
      });
  
      it("should return an array of formatted strings", () => {
        const budget1 = new Budget();
        const budget2 = new Budget();
        const income1 = new Income("2024-06-17", 200, "food");
        const income2 = new Income("2024-06-17", 200, "food");
        const expense1 = new Expense("2024-06-17", 100, "food", true);
        const expense2 = new Expense("2024-06-17", 500, "food", false);
  
        budget1.addEntry(income1);
        budget1.addEntry(income2);
        budget1.addEntry(expense1);
        budget1.addEntry(expense2);
        const formatted1 = [
            '2024-06-17 | food | +200 €',
            '2024-06-17 | food | +200 €',
            '2024-06-17 | food | -100 €',
            '2024-06-17 | food | -500 €' 
        ];
        expect(budget1.getFormattedEntries()).toEqual(formatted1);
  

        budget2.addEntry(income1);
        budget2.addEntry(income2);
        budget2.addEntry(expense1);
        const formatted2 = [
            '2024-06-17 | food | +200 €',
            '2024-06-17 | food | +200 €',
            '2024-06-17 | food | -100 €'
        ];
        expect(budget2.getFormattedEntries()).toEqual(formatted2);
      });
    });
  });
  