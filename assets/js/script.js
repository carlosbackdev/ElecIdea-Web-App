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

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    document.getElementById("message").innerText = "Enviando mensaje...";
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('mensaje', mensaje);

    document.getElementById("contactForm").reset();
    try {
        const response = await fetch('http://localhost:8080/api/contact', {
            method: 'POST',
            body: formData
        });
        const responseBody = await response.text();
        if (response.ok) {
            document.getElementById("message").innerText = "Mensaje enviado con éxito. ¡Gracias por contactarnos!";
        } else {
            document.getElementById("message").innerText = "Hubo un error al enviar el mensaje. Intenta de nuevo.";
        }
    } catch (error) {
        document.getElementById("message").innerText = "Hubo un error de conexión. Intenta de nuevo.";
    }
});

