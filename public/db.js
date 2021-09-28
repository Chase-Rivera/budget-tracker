let db;

const request = indexedDB.open('BudgetDB', 1);

request.onupgradeneeded = function (e) {
    const db = e.target.result;
    db.createObjectStore('BudgetStore', {autoIncrement: true, keypath: 'budgetID'});
};

request.onsuccess = function (e) {
    db = e.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (e) {
    this.transaction.onerror = function (e) {
        console.error(error);
    }
};

const saveRecord = (record) => {
    const transaction = db.transaction(['budgetStore'], 'readwrite');
    const budgetStore = transaction.objectStore('BudgetStore');
    budgetStore.add(record);
};