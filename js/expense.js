import { db } from "../firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
SAVE EXPENSE
========================= */

async function saveExpense(){

let amountInput =
document.getElementById("expenseAmount");

let paymentInput =
document.getElementById("expensePayment");

let categoryInput =
document.getElementById("expenseCategory");

let noteInput =
document.getElementById("expenseNote");

let btn =
document.getElementById("saveExpenseBtn");


let amount = amountInput.value;
let payment = paymentInput.value;
let category = categoryInput.value;
let note = noteInput.value.trim();


/* ===== VALIDATION ===== */

if(!amount || amount <= 0){

alert("Please enter valid expense amount");

amountInput.focus();

return;

}


/* ===== PREVENT DOUBLE CLICK ===== */

btn.disabled = true;
btn.innerText = "Saving...";


try{

await addDoc(collection(db,"transactions"),{

type:"expense",

amount:Number(amount),

payment:payment,

category:category,

note:note,

timestamp:serverTimestamp()

});


alert("Expense Saved Successfully");


window.location.href="../index.html";


}catch(error){

console.error("Expense save error:",error);

alert("Failed to save expense");

btn.disabled = false;
btn.innerText = "Save Expense";

}

}


/* =========================
MAKE FUNCTION GLOBAL
========================= */

window.saveExpense = saveExpense;