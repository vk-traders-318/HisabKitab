import { db } from "../firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
SAVE SALE FUNCTION
========================= */

async function saveSale(){

let amountInput =
document.getElementById("saleAmount");

let paymentInput =
document.getElementById("paymentMethod");

let noteInput =
document.getElementById("saleNote");

let btn =
document.getElementById("saveSaleBtn");


let amount = amountInput.value;
let payment = paymentInput.value;
let note = noteInput.value.trim();


/* ===== VALIDATION ===== */

if(!amount || amount <= 0){

alert("Please enter valid amount");

amountInput.focus();

return;

}


/* ===== PREVENT DOUBLE CLICK ===== */

btn.disabled = true;
btn.innerText = "Saving...";


try{

await addDoc(collection(db,"transactions"),{

type:"sale",

amount:Number(amount),

payment:payment,

category:"sale",

note:note,

timestamp:serverTimestamp()

});


alert("Sale Saved Successfully");


window.location.href="../index.html";


}catch(error){

console.error("Sale save error:",error);

alert("Failed to save sale");

btn.disabled = false;
btn.innerText = "Save Sale";

}

}


/* =========================
MAKE FUNCTION GLOBAL
========================= */

window.saveSale = saveSale;