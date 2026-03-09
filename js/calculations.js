/* =========================
CALCULATE BALANCES
========================= */

export function calculateBalances(transactions){

let cash = 0;
let online = 0;

transactions.forEach(t=>{

if(!t) return;

let amount = Number(t.amount || 0);

let type = t.type || "";
let payment = t.payment || "";


if(type === "sale"){

if(payment === "cash"){
cash += amount;
}

if(payment === "online"){
online += amount;
}

}


if(type === "expense"){

if(payment === "cash"){
cash -= amount;
}

if(payment === "online"){
online -= amount;
}

}

});

return {

cashBalance: cash,

onlineBalance: online,

totalBalance: cash + online

};

}


/* =========================
TOTAL SALES
========================= */

export function calculateTotalSales(transactions){

let total = 0;

transactions.forEach(t=>{

if(t && t.type === "sale"){

total += Number(t.amount || 0);

}

});

return total;

}


/* =========================
TOTAL EXPENSE
========================= */

export function calculateTotalExpense(transactions){

let total = 0;

transactions.forEach(t=>{

if(t && t.type === "expense"){

total += Number(t.amount || 0);

}

});

return total;

}


/* =========================
FILTER BY DATE
========================= */

export function filterByDate(transactions,start,end){

return transactions.filter(t=>{

if(!t.timestamp) return false;

let d = t.timestamp.toDate()
.toISOString()
.split("T")[0];

return d >= start && d <= end;

});

}


/* =========================
RECENT TRANSACTIONS
========================= */

export function getRecentTransactions(data){

return data.slice(0,5);

}