var menuToggle = document.getElementById("menu-toggle");
var siteNav = document.getElementById("site-nav");

function closeMenu() {
    siteNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

// open / close when the button is clicked
menuToggle.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// close the menu after tapping a link
siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

// close the menu if the window grows to desktop size
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
});