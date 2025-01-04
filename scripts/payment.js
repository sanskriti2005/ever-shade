import { db } from "./firestoreConfig.js";
import { collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { loginData } from "./loginData.js";

if (loginData.length < 1) {
    alert("Please Sign-in to buy products")
    window.location.href = "index.html"
}