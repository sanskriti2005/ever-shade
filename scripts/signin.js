import { auth, db } from "./firestoreConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

// this function ensures the visibility of specific forms depensing on the selected item
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


async function signUpUser(email, password, name) {
    try {
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCreds.user;
        const userDocRef = await doc(db, "users", user.uid)
        await setDoc(userDocRef, {
            name: name,
            email: email,
            wishlist: [],
            cart: []
        })

        const signedUpUser = await getDoc(userDocRef)
        alert("User successfully signed up!")
        return signedUpUser.data()
        // console.log("Signed up user looks like this", user)
    } catch (error) {
        console.log(error)
        alert("Could not sign-up. Please try again later")
    }
}
