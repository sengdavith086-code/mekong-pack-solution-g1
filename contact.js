(function () {
    /* ===== Footer year ===== */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ===== Mobile menu ===== */
    var menuToggle = document.getElementById("menu-toggle");
    var siteNav = document.getElementById("site-nav");

    function closeMenu() {
        siteNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function () {
        var isOpen = siteNav.classList.toggle("open");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // reset the menu if the window grows back to desktop size
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) closeMenu();
    });

    /* ===== Enquiry form ===== */
    var form = document.getElementById("enquiry-form");
    var status = document.getElementById("form-status");
    var message = document.getElementById("message");
    var hints = {
        product: "Tell us what you need to pack, dimensions, quantity and intended use.",
        partnership: "Tell us about your organization, what you supply and the collaboration you propose."
    };

    // hero buttons pre-select the enquiry type
    document.querySelectorAll("[data-type]").forEach(function (link) {
        link.addEventListener("click", function () {
            var radio = document.getElementById("type-" + link.dataset.type);
            if (radio) {
                radio.checked = true;
                message.placeholder = hints[radio.value];
            }
        });
    });

    // change the message placeholder when the type changes
    form.addEventListener("change", function (e) {
        if (e.target.name === "enquiry-type") message.placeholder = hints[e.target.value];
    });

    // validate one field and show or clear its error message
    function check(id, text, test) {
        var el = document.getElementById(id);
        var err = document.getElementById(id + "-error");
        var value = el.value.trim();
        var ok = test ? test(value) : value !== "";
        el.setAttribute("aria-invalid", ok ? "false" : "true");
        err.textContent = ok ? "" : text;
        return ok;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var results = [
            check("full-name", "Enter your full name."),
            check("email", "Enter an email address we can reply to, like name@example.com.", function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            }),
            check("message", "Tell us what you need so we can reply usefully.")
        ];

        if (results.every(Boolean)) {
            status.textContent = "Thank you. This is a design example, so your enquiry was not sent.";
            form.reset();
            message.placeholder = hints.product;
        } else {
            status.textContent = "Please fix the highlighted fields and try again.";
            var first = form.querySelector('[aria-invalid="true"]');
            if (first) first.focus();
        }
    });
})();