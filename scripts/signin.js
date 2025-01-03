import { auth, db } from "./firestoreConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { doc, setDoc, getDoc  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// catching all relevant items from the html
const signinBtns = document.querySelectorAll(".signin-btns");
// const active = document.querySelector(".active");
const signupForm = document.getElementById("signup-form")
const loginForm = document.getElementById("login-form")

// functionality for the sliding tabs to work
// function updates the forms that are visible to the user 
function updateForms() {
    const active = document.querySelector(".signin-btns.active");
    if (active.id === "signup") {
        signupForm.style.display = "flex";
        loginForm.style.display = "none";
    } else {
        signupForm.style.display = "none";
        loginForm.style.display = "flex";
    }
}

updateForms();

// this function ensures the visibility of specific forms depending on the selected item
signinBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        signinBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateForms();
    })
})

// The actual signup and lgin log starts here
// signup logic
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // get userInput from the form
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const name = signupForm.name.value;
    // after successfully signing the user-up, we store their data into the localStorage for their further use
    try {
        const user = await signUpUser(email, password, name)
        localStorage.setItem("loginData", JSON.stringify(user));
        window.location.href = "index.html"
    } catch (error) {
        console.log(error)
        // the function already deals with catch
    }
    
})

// function signs users up, sedns their their data to the auth database and creates a firestore db of users for other functiionalities
async function signUpUser(email, password, name) {
    try {
        // create user
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        // that data
        const user = userCreds.user;
        // creating a document reference for further processing 
        const userDocRef = await doc(db, "users", user.uid)
        // then sedning data to thae reference (or building it in the db if it isn;t there)
        await setDoc(userDocRef, {
            name: name,
            id: user.uid,
            email: email,
            wishlist: [],
            cart: []
        })

        // get the signedup userObj and return it
        const signedUpUser = await getDoc(userDocRef)
        alert("User successfully signed up!")
        return signedUpUser.data()
    } catch (error) {
        console.log(error)
        alert("Could not sign-up. Please try again later")
    }
}

// Login logic
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // get userInput from the form
    const email = loginForm.emailLogin.value;
    const password = loginForm.passwordLogin.value;
    // after successfully loggin the user-in, we store their data into the localStorage for their further use
    try {
        const user = await logInUser(email, password)
        console.log(user)
        localStorage.setItem("loginData", JSON.stringify(user));
        window.location.href = "index.html"
        console.log(user)
    } catch (error) {
        console.log(error)
        // the function already deals with catch
    }
    
})

async function logInUser(email, password) {
    try {
        // sign in (recieve user credentials)
        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const user = userCreds.user;
        // create a document referenceof that to fetch data from the firestore db
        const userDocRef = await doc(db, "users", user.uid)
        // get the document from the firestore collection of users
        const loggedInUser = await getDoc(userDocRef)
        alert("User successfully logged in!")
        // return the userObj
        return loggedInUser.data()
    } catch (error) {
        console.log(error)
        alert("Could not Log-in. Please try again later")
    }
}