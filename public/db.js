const { response } = require("express");

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

function checkDatabase() {
    const transaction = db.transaction(['BudgetStore'], 'readwrite');
    const budgetStore = transaction.objectStore("BudgetStore");
    const getAll = budgetStore.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then(() => {
                const transaction = db.transaction(['BudgetStore'], 'readwrite');
                const budgetStore = transaction.objectStore('BudgetStore');
            });
        }
    };
}

window.addEventListener('online', checkDatabase);