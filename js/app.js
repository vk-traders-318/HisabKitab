import { db } from "../firebase.js";

import {
collection,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
GLOBAL DATA
========================= */

let transactions = [];

let cashBalance = 0;
let onlineBalance = 0;
let totalBalance = 0;


/* =========================
FORMAT DATE + TIME
========================= */

function formatDateTime(timestamp){

if(!timestamp) return "";

try{

let date = timestamp.toDate();

let d = date.toLocaleDateString();

let t = date.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

return d + " " + t;

}catch{

return "";

}

}


/* =========================
CALCULATE BALANCES
========================= */

function calculateBalances(data){

cashBalance = 0;
onlineBalance = 0;

data.forEach(t=>{

if(!t.amount) return;

let amount = Number(t.amount);

if(t.type === "sale"){

if(t.payment === "cash"){
cashBalance += amount;
}

if(t.payment === "online"){
onlineBalance += amount;
}

}

if(t.type === "expense"){

if(t.payment === "cash"){
cashBalance -= amount;
}

if(t.payment === "online"){
onlineBalance -= amount;
}

}

});

totalBalance = cashBalance + onlineBalance;

updateDashboard();

}


/* =========================
UPDATE DASHBOARD
========================= */

function updateDashboard(){

let cashEl =
document.getElementById("cashBalance");

let onlineEl =
document.getElementById("onlineBalance");

let totalEl =
document.getElementById("totalBalance");

if(!cashEl || !onlineEl || !totalEl) return;

cashEl.innerText = "₹" + cashBalance;

onlineEl.innerText = "₹" + onlineBalance;

totalEl.innerText = "₹" + totalBalance;

}


/* =========================
RENDER RECENT TRANSACTIONS
========================= */

function renderRecent(){

let container =
document.getElementById("recentTransactions");

if(!container) return;

let html = "";

let recent = transactions.slice(0,5);

recent.forEach(t=>{

let sign = t.type === "sale" ? "+" : "-";

let amountClass =
t.type === "sale"
? "amount-plus"
: "amount-minus";

html += `

<div class="transaction">

<div class="transaction-header">

<span class="transaction-type">
${t.type.toUpperCase()}
</span>

<span class="transaction-amount ${amountClass}">
${sign} ₹${t.amount}
</span>

</div>

<div class="transaction-meta">

${t.payment} | ${t.category}

</div>

<div class="transaction-meta">

${formatDateTime(t.timestamp)}

</div>

</div>

`;

});

container.innerHTML = html;

}


/* =========================
LISTEN FIREBASE DATA
========================= */

function listenTransactions(){

const q = query(
collection(db,"transactions"),
orderBy("timestamp","desc")
);

onSnapshot(q,(snapshot)=>{

transactions = [];

snapshot.forEach(doc=>{

let data = doc.data();

if(data) transactions.push(data);

});

calculateBalances(transactions);

renderRecent();

});

}


/* =========================
START APP AFTER DOM LOAD
========================= */

document.addEventListener("DOMContentLoaded",()=>{

listenTransactions();

});