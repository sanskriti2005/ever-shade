function loadNavBar(){
    // catch the navbar div element
    const navbar = document.querySelector("#nav");
    navbar.innerHTML = `<div id="navbar">
            <div id="logo">EVERSHADE</div>
            <div>
            <input type="search" placeholder="Search" id="search-bar"/>
            </div>
            <div id="nav-links">
                <div><a href=""><div><i class="fa-solid fa-store fa-lg"></i></div><div><h6>Stores & Services</h6><p>Choose your store</p></div></a></div>
                <div><a href=""><div><i class="fa-solid fa-users-between-lines fa-lg"></i></div><div><h6>Community</h6></div></a></div>
                <div><a href=""><div><i class="fa-solid fa-user fa-lg"></i></div><div><h6>Sign-In</h6><p>for FREE shipping</p></div></a></div>
                <div><a href=""><i class="fa-solid fa-heart fa-lg"></i></a></div>
                <div><a href=""><i class="fa-solid fa-basket-shopping fa-lg"></i></a></div>
            </div>
        </div>
        <div id="sign-up">
            <div><a href=""><div><h6>Sign-In</h6><p>for FREE shipping</p></div></a></div>
            <button type="button" onclick="signup()">Sign-up</button>
            </div>`
}
loadNavBar();
