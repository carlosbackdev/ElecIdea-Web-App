document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");

        this.querySelector(".hamburger").classList.toggle("active");
    });


    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        {
            threshold: 0.2, 
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.addEventListener("mouseover", () => {
            button.classList.add("hovered");
        });
        button.addEventListener("mouseout", () => {
            button.classList.remove("hovered");
        });
    });
});

document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", function () {
        this.classList.add("active");
        setTimeout(() => this.classList.remove("active"), 300);
    });
});
