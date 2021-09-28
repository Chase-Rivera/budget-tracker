let db;

const request = indexedDB.open('BudgetDB', 1);

request.onupgradeneeded = function (e) {
    const db = e.target.result;
    db.createObjectStore('BudgetStore', {autoIncrement: true, keypath: 'budgetID'});
};

