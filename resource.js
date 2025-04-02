document.addEventListener("DOMContentLoaded", function () {
    // Get all nav links
    let navLinks = document.querySelectorAll(".nav-link");

    // Highlight the active nav link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove 'active' class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));
            
            // Add 'active' class to the clicked link
            this.classList.add("active");
        });
    });

    // Close the navbar when a link is clicked (for mobile view)
    let navbarToggler = document.querySelector(".navbar-toggler");
    let navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.click(); // Simulate click to close navbar
            }
        });
    });
});
