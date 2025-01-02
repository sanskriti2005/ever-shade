import { db } from "./firestoreConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const newArrivalsCont = document.getElementById("new-arrivals")
const newArrivalsProducts = [];

const fetchData = async (collectionName, arr) => {
    try {
      const res = collection(db, collectionName)
      const data = await getDocs(res)
      data.forEach(item => {
        const productInfo = item.data();
        arr.push(productInfo)
      })
      return arr
      // console.log(data)
    } catch (error) {
      alert("Error in fetching new arrivals")
    }
}

const displaynewArrivalProducts = async (collectionName, arr,container) => {
  try {
    const dataToBeDisplayed = await fetchData("newArrivalProducts", newArrivalsProducts)
    newArrivalsCont.innerHTML = ``
    dataToBeDisplayed.forEach((item, i) => {
      if(i < 10){
        newArrivalsCont.innerHTML += `
      <div class="card new-arrivals-card">
            <img src="https:${item.image_link}"
                alt="${item.product_type} Image">
                <h5>${item.name}</h5>
                <p>${item.description.slice(0, 50)}</p>
                <p class="price">$${item.price}</p>
            <div id="${item.id}">
                <button type="button"><i class="fa-solid fa-heart fa-lg"></i></button>
                <button type="button"><i class="fa-solid fa-basket-shopping fa-lg"></i></button>
            </div>
        </div>`

      }   
    })
    console.log(dataFetching)
  } catch (error) {
    alert("error in display data")
  }
}
displaynewArrivalProducts()
