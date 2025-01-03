const signinBtns = document.querySelectorAll(".signin-btns");
// const active = document.querySelector(".active");
const signupForm = document.getElementById("signup-form")
const loginForm = document.getElementById("login-form")


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

signinBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        signinBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateForms();
    })
})
