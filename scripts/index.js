import { db } from "./firestoreConfig.js";
import { collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { loginData } from "./loginData.js";


// catch basic elements
const newArrivalsCont = document.getElementById("new-arrivals")
const insiderRewardsCont = document.getElementById("insider-awards")
const insiderRewardsProducts = [];
const newArrivalsProducts = [];

// fetchData fucntion that gets the data 
const fetchData = async (collectionName, arr) => {
  try {
    const res = collection(db, collectionName)
    const data = await getDocs(res)
    data.forEach(item => {
      const productInfo = item.data();
      arr.push(productInfo)
    })
    return arr
  } catch (error) {
    console.log(error)
    alert("Error in fetching new arrivals")
  }
}

// dynamically displaying newly arrived products
const displaynewArrivalProducts = async () => {
  try {
    const dataToBeDisplayed = await fetchData("newArrivalProducts", newArrivalsProducts)
    newArrivalsCont.innerHTML = ``
    dataToBeDisplayed.forEach((item, i) => {
      if (i < 10) {
        // Create the card HTML
        const card = document.createElement("div");
        card.className = "card new-arrivals-card";
        card.innerHTML = `
          <img src="https:${item.image_link}" alt="${item.product_type} Image">
          <h5>${item.name}</h5>
          <p>${item.description.slice(0, 50)}</p>
          <p class="price">$${item.price}</p>
          <div id="${item.id}">
              <button type="button" onclick="addToFavs(this)"><i class="fa-solid fa-heart fa-lg"></i></button>
              <button type="button" onclick="addToCart(this)"><i class="fa-solid fa-basket-shopping fa-lg"></i></button>
          </div>
        `;

        // Add click event listener for redirection
        card.addEventListener("click", (e) => redirect(item));

        // Append the card to the container
        newArrivalsCont.appendChild(card);
      }
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
          <p class="description">${item.description}</p>
          <p class="price">$${item.price}</p>
          <div id="${item.id}">
              <button type="button" onclick="addToFavs(this)"><i class="fa-solid fa-heart fa-lg"></i></button>
              <button type="button" onclick="addToCart(this)"><i class="fa-solid fa-basket-shopping fa-lg"></i></button>
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
  } catch (error) {
    alert("error in display data")
  }
}

const displaynewInsiderProducts = async () => {
  try {
    const dataToBeDisplayed = await fetchData("newArrivalProducts", insiderRewardsProducts)
    insiderRewardsCont.innerHTML = ``
    dataToBeDisplayed.forEach((item, i) => {
      if (i > 10 && i < 20) {
        if (loginData.length < 1) {
          insiderRewardsCont.innerHTML += `
      <div class="card new-arrivals-card">
            <img src="https:${item.image_link}"
                alt="${item.product_type} Image">
                <h5>${item.name}</h5>
                <p>${item.description.slice(0, 50)}</p>
                <p class="price">Points: ${item.price < 5 ? "100" : "200"}</p>
                <button type="button" onclick="signin()">Signin to recieve</button>
        </div>`
        } else {
          insiderRewardsCont.innerHTML += `
      <div class="card new-arrivals-card">
            <img src="https:${item.image_link}"
                alt="${item.product_type} Image">
                <h5>${item.name}</h5>
                <p>${item.description.slice(0, 50)}</p>
                <p class="price">Points: ${item.price < 5 ? "100" : "200"}</p>
        </div>`
        }

      }
    })
  } catch (error) {
    console.log(error)
    alert("error in display data")
  }
}
displaynewInsiderProducts()
displaynewArrivalProducts()
