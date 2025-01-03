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
    displayContainer.innerHTML = `<h2>You don't have any products in your cart :/<h2>`
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

window.removeFromCart = async (buttonEl) => {
    const productId = buttonEl.parentElement.id
    const products = []
    if (loginData.length < 1) {
        alert("Please Sign-in to build a cart")
    } else {
        try {
            const cartProds = await fetchData("newArrivalProducts", products)
            const cart = loginData.cart
            const userId = loginData.id
            cartProds.forEach(async (item) => {
                if (item.id == productId) {
                    const productIndex = cart.findIndex((item) => item.id === Number(productId));
                    if (productIndex !== -1) {
                        // Remove item from wishlist
                        cart.splice(productIndex, 1);
                        loginData.cart = cart;


                        // and update the user's data in the localStorage
                        localStorage.setItem("loginData", JSON.stringify(loginData));

                        // Now update the firestore users db
                        try {
                            const userDocRef = doc(db, "users", userId);
                            await setDoc(userDocRef, { cart }, { merge: true })
                            alert("Item succesfully removed from cart")
                        } catch (error) {
                            alert("Problem updating the database with the product you removed in cart")
                            console.log(error)
                        }
                    } else {
                        alert("Item not removed")
                    }
                }
            })
        } catch (error) {
            alert("Sorry, could not remove item from your cart, please try again")
        }
    }
}

window.addToFavs = async (buttonEl) => {
  const productId = buttonEl.parentElement.id
  const products = []
  if (loginData.length < 1) {
    alert("Please Sign-in to build a wishlist")
  } else{
    try {
      const wishlistProds = await fetchData("newArrivalProducts", products)
      const wishlist = loginData.wishlist
      const userId = loginData.id
      wishlistProds.forEach(async (item) => {
        if(item.id == productId){
          const findProd = wishlist.find((item) => item.id == productId)
          if(!findProd){
            // push item to wishlist
            wishlist.push(item)
            loginData.wishlist = wishlist
            // and update the user's data in the localStorage
            localStorage.setItem("loginData", JSON.stringify(loginData));

            // Now update the firestore users db
            try {
              const userDocRef = doc(db, "users", userId);
              await setDoc(userDocRef, { wishlist }, { merge:true })
              alert("Item succesfully added to wishlist!")
            } catch (error) {
              alert("Problem updating the database with the product you added in wishlist")
              console.log(error)
            }
          } else{
            alert("Product is alraedy there in your wishlist")
          }
        }
      })
    } catch (error) {
      alert("Sorry, could not add item to your wishlist, please try again")
    }
  }
}

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
      alert("Error in fetching data")
    }
  }