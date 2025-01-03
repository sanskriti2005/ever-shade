import { db } from "./firestoreConfig.js";
import { collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { loginData } from "./loginData.js";

console.log(loginData)

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
        newArrivalsCont.innerHTML += `
      <div class="card new-arrivals-card">
            <img src="https:${item.image_link}"
                alt="${item.product_type} Image">
                <h5>${item.name}</h5>
                <p>${item.description.slice(0, 50)}</p>
                <p class="price">$${item.price}</p>
            <div id="${item.id}">
                <button type="button" onclick="addToFavs(this)"><i class="fa-solid fa-heart fa-lg"></i></button>
                <button type="button" onclick="addToCart(this)"><i class="fa-solid fa-basket-shopping fa-lg"></i></button>
            </div>
        </div>`

      }
    })
  } catch (error) {
    alert("error in display data")
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

window.addToCart = async (buttonEl) => {
  const productId = buttonEl.parentElement.id
  const products = []
  if (loginData.length < 1) {
    alert("Please Sign-in to build a cart")
  } else{
    try {
      const cartProds = await fetchData("newArrivalProducts", products)
      const cart = loginData.cart
      const userId = loginData.id
      cartProds.forEach(async (item) => {
        if(item.id == productId){
          const findProd = wishlist.find((item) => item.id == productId)
          if(!findProd){
            // push item to wishlist
            cart.push(item)
            loginData.cart = cart
            // and update the user's data in the localStorage
            localStorage.setItem("loginData", JSON.stringify(loginData));

            // Now update the firestore users db
            try {
              const userDocRef = doc(db, "users", userId);
              await setDoc(userDocRef, { cart }, { merge:true })
              alert("Item succesfully added to cart!")
            } catch (error) {
              alert("Problem updating the database with the product you added in cart")
              console.log(error)
            }
          } else{
            alert("Product is alraedy there in your cart")
          }
        }
      })
    } catch (error) {
      alert("Sorry, could not add item to your cart, please try again")
    }
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
