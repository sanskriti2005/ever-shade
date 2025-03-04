// this file consists of the main function related to the cart and wishlist fucntionality
import { db } from "./firestoreConfig.js";
import { collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { loginData } from "./loginData.js";

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
// add to cart function
window.addToCart = async (buttonEl) => {
    event.stopPropagation()
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
                    const findProd = cart.find((item) => item.id == productId)
                    if (!findProd) {
                        // push item to wishlist
                        cart.push(item)
                        loginData.cart = cart
                        // and update the user's data in the localStorage
                        localStorage.setItem("loginData", JSON.stringify(loginData));

                        // Now update the firestore users db
                        try {
                            const userDocRef = doc(db, "users", userId);
                            await setDoc(userDocRef, { cart }, { merge: true })
                            alert("Item succesfully added to cart!")
                            window.location.reload()
                        } catch (error) {
                            alert("Problem updating the database with the product you added in cart")
                            console.log(error)
                        }
                    } else {
                        alert("Product is alraedy there in your cart")
                    }
                }
            })
        } catch (error) {
            alert("Sorry, could not add item to your cart, please try again")
        }
    }
}

//   remove from favorites
window.removeFromFavs = async (buttonEl) => {
    event.stopPropagation()
    const productId = buttonEl.parentElement.id
    const products = []
    if (loginData.length < 1) {
        alert("Please Sign-in to build a wishlist")
    } else {
        try {
            const wishlistProds = await fetchData("newArrivalProducts", products)
            const wishlist = loginData.wishlist
            const userId = loginData.id
            wishlistProds.forEach(async (item) => {
                if (item.id == productId) {
                    const productIndex = wishlist.findIndex((item) => item.id === Number(productId));
                    if (productIndex !== -1) {
                        // Remove item from wishlist
                        wishlist.splice(productIndex, 1);
                        loginData.wishlist = wishlist;


                        // and update the user's data in the localStorage
                        localStorage.setItem("loginData", JSON.stringify(loginData));

                        // Now update the firestore users db
                        try {
                            const userDocRef = doc(db, "users", userId);
                            await setDoc(userDocRef, { wishlist }, { merge: true })
                            alert("Item succesfully removed from wishlist")
                            window.location.reload()
                        } catch (error) {
                            alert("Problem updating the database with the product you removed in wishlist")
                            console.log(error)
                        }
                    } else {
                        alert("Item not removed")
                    }
                }
            })
        } catch (error) {
            alert("Sorry, could not remove item from your wishlist, please try again")
        }
    }
}

// add to favs
window.addToFavs = async (buttonEl) => {
    event.stopPropagation()
    const productId = buttonEl.parentElement.id
    const products = []
    if (loginData.length < 1) {
        alert("Please Sign-in to build a wishlist")
    } else {
        try {
            const wishlistProds = await fetchData("newArrivalProducts", products)
            const wishlist = loginData.wishlist
            const userId = loginData.id
            wishlistProds.forEach(async (item) => {
                if (item.id == productId) {
                    const findProd = wishlist.find((item) => item.id == productId)
                    if (!findProd) {
                        // push item to wishlist
                        wishlist.push(item)
                        loginData.wishlist = wishlist
                        // and update the user's data in the localStorage
                        localStorage.setItem("loginData", JSON.stringify(loginData));

                        // Now update the firestore users db
                        try {
                            const userDocRef = doc(db, "users", userId);
                            await setDoc(userDocRef, { wishlist }, { merge: true })
                            alert("Item succesfully added to wishlist!")
                            window.location.reload()
                        } catch (error) {
                            alert("Problem updating the database with the product you added in wishlist")
                            console.log(error)
                        }
                    } else {
                        alert("Product is already there in your wishlist")
                    }
                }
            })
        } catch (error) {
            alert("Sorry, could not add item to your wishlist, please try again")
        }
    }
}

// remove from cart
window.removeFromCart = async (buttonEl) => {
    event.stopPropagation()
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
                            window.location.reload()
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
