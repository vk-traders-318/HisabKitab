import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
FIREBASE CONFIG
========================= */

const firebaseConfig = {

apiKey: "AIzaSyBWITtwALATTkGGRhHkrTH6ekIsn7yA8v4",

authDomain: "hisabkitab-46eb7.firebaseapp.com",

projectId: "hisabkitab-46eb7",

storageBucket: "hisabkitab-46eb7.firebasestorage.app",

messagingSenderId: "725289203511",

appId: "1:725289203511:web:275666345a81935c844cb2",

measurementId: "G-X5BWWMKWDV"

};


/* =========================
INITIALIZE FIREBASE
========================= */

const app = initializeApp(firebaseConfig);


/* =========================
INITIALIZE FIRESTORE
========================= */

const db = getFirestore(app);


/* =========================
EXPORT DATABASE
========================= */

export { db };