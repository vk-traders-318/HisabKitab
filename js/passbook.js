import { db } from "../firebase.js";

import {
collection,
query,
orderBy,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
GLOBAL DATA
========================= */

let allTransactions = [];


/* =========================
FORMAT DATE TIME
========================= */

function formatDateTime(timestamp){

if(!timestamp) return "";

try{

let d = timestamp.toDate();

let date = d.toLocaleDateString();

let time = d.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

return date + " " + time;

}catch{

return "";

}

}


/* =========================
LOAD PASSBOOK
========================= */

async function loadPassbook(){

try{

const q = query(
collection(db,"transactions"),
orderBy("timestamp","desc")
);

const snapshot = await getDocs(q);

allTransactions = [];

snapshot.forEach(doc=>{

let data = doc.data();

if(data) allTransactions.push(data);

});

renderPassbook(allTransactions);

}catch(error){

console.error("Passbook load error:",error);

}

}


/* =========================
RENDER TRANSACTIONS
========================= */

function renderPassbook(data){

let container =
document.getElementById("passbookList");

if(!container) return;

let html = "";

data.forEach(t=>{

let sign = t.type === "sale" ? "+" : "-";

let amountClass =
t.type === "sale"
? "amount-plus"
: "amount-minus";

html += `

<div class="transaction">

<div class="transaction-header">

<span class="transaction-type">
${t.type ? t.type.toUpperCase() : ""}
</span>

<span class="transaction-amount ${amountClass}">
${sign} ₹${t.amount || 0}
</span>

</div>

<div class="transaction-meta">

${t.payment || ""} | ${t.category || ""}

</div>

<div class="transaction-meta">

${t.note || ""}

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
FILTER SYSTEM
========================= */

function applyFilter(){

let start =
document.getElementById("startDate").value;

let end =
document.getElementById("endDate").value;


if(!start || !end){

renderPassbook(allTransactions);

return;

}


let filtered = allTransactions.filter(t=>{

if(!t.timestamp) return false;

let date =
t.timestamp.toDate()
.toISOString()
.split("T")[0];

return date >= start && date <= end;

});


renderPassbook(filtered);

}


window.applyFilter = applyFilter;


/* =========================
START
========================= */

loadPassbook();