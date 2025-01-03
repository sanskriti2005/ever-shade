function loadFooter(){
    // catch the navbar div element
    const footer = document.querySelector("#footer-div");
    footer.innerHTML = `<div>Website feedback? Let us know</div>
        <div id="footer">
            <p>&copy;2024 EverShade All Rights Reserved</p>
        </div>`
}
loadFooter();
