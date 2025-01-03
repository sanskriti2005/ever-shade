import { db } from "./firestoreConfig.js";
import { collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { loginData } from "./loginData.js";

if (loginData.length < 1) {
    alert("Please Sign-in to build a wishlist")
    window.location.href = "index.html"
}

const dataToBeDisplayed = loginData.cart
const displayContainer = document.getElementById("cart-prod-container")
if (dataToBeDisplayed < 0) {
    displayContainer.innerHTML = "";
    displayContainer.innerHTML += `<h2>You don't have any products in your cart :/<h2>`
} else {
    displayContainer.innerHTML = "";
    dataToBeDisplayed.forEach((item) => {
        displayContainer.innerHTML += `<div class="card new-arrivals-card">
            <img src="https:${item.image_link}"
                alt="${item.product_type} Image">
                <h5>${item.name}</h5>
                <p>${item.description.slice(0, 50)}</p>
                <p class="price">$${item.price}</p>
            <div id="${item.id}">
                <button type="button" onclick="removeFromCart(this)"><i class="fa-solid fa-trash"></i></button>
                <button type="button" onclick="addToFavs(this)"><i class="fa-solid fa-heart fa-lg"></i></button>
            </div>
        </div>`
    })
}