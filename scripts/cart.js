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
        // Create the card HTML
        const card = document.createElement("div");
        card.className = "card new-arrivals-card";
        card.innerHTML = `
          <img src="https:${item.image_link}" alt="${item.product_type} Image">
          <h5>${item.name}</h5>
          <p>${item.description.slice(0, 50)}</p>
          <p class="price">$${item.price}</p>
          <div id="${item.id}">
              <button type="button" onclick="removeFromCart(this)"><i class="fa-solid fa-trash"></i></button>
                <button type="button" onclick="addToFavs(this)"><i class="fa-solid fa-heart fa-lg"></i></button>
          </div>
        `;

        // Add click event listener for redirection
        card.addEventListener("click", () => redirect(item));

        // Append the card to the container
        displayContainer.appendChild(card);
    })
    window.redirect = async (item) => {
        const modal = document.createElement("dialog")
        modal.className = "modal-container"
        modal.innerHTML = `<div><button class="close-btn">x</button></div>
              <div class="prod">
                  <div class="prod-img">
                      <img src="${item.image_link}" alt="${item.product_type} Image">
                  </div>
                  <div class="prod-info">
                      <h5>${item.name}</h5>
            <p>${item.description}</p>
            <p class="price">$${item.price}</p>
            <div id="${item.id}">
                <button type="button" onclick="removeFromCart(this)"><i class="fa-solid fa-trash"></i></button>
                <button type="button" onclick="addToFavs(this)"><i class="fa-solid fa-heart fa-lg"></i></button>
            </div>
            <button type="button" class="buy-btn">Buy now</button>
                  </div>
                  
              </div>`
        document.body.appendChild(modal);
        modal.showModal();
  
        // close modal when close btn is clicked
        document.querySelector(".close-btn").addEventListener("click", () => {
          modal.close()
          modal.remove()
        })
  
        // redirect to payment page when buy button is clicked
        document.querySelector(".buy-btn").addEventListener("click", () => {
          window.location.href = "payment.html"
        })
  
      }
    
}

