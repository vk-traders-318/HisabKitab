/* =========================
FORMAT DATE + TIME
========================= */

export function formatDateTime(timestamp){

if(!timestamp) return "";

try{

let dateObj = timestamp.toDate();

let date = dateObj.toLocaleDateString();

let time = dateObj.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

return date + " " + time;

}catch{

return "";

}

}


/* =========================
FORMAT ONLY DATE
========================= */

export function formatDate(timestamp){

if(!timestamp) return "";

try{

let d = timestamp.toDate();

return d.toLocaleDateString();

}catch{

return "";

}

}


/* =========================
FORMAT ONLY TIME
========================= */

export function formatTime(timestamp){

if(!timestamp) return "";

try{

let d = timestamp.toDate();

return d.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

}catch{

return "";

}

}


/* =========================
FORMAT CURRENCY
========================= */

export function formatCurrency(amount){

let value = Number(amount || 0);

return "₹" + value.toLocaleString("en-IN");

}


/* =========================
SORT TRANSACTIONS
========================= */

export function sortTransactions(data){

return data.sort((a,b)=>{

if(!a.timestamp || !b.timestamp) return 0;

return b.timestamp.seconds - a.timestamp.seconds;

});

}


/* =========================
GET TODAY DATE
========================= */

export function getTodayDate(){

let d = new Date();

return d.toISOString().split("T")[0];

}