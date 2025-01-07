document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    fetch("https://elecideaapirest-production.up.railway.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert("Inicio de sesión exitoso.");
                localStorage.setItem("userId", data.userId); 
                window.location.href = `userSpace.html`; 
            } else {
                alert(data.message); 
            }
        })
        .catch((error) => console.error("Error:", error));
});

//animaciones
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".login-btn");
    loginButton.addEventListener("mouseover", () => {
        loginButton.style.transform = "scale(1.05)";
        loginButton.style.transition = "transform 0.3s ease";
        loginButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    });
    loginButton.addEventListener("mouseout", () => {
        loginButton.style.transform = "scale(1)";
        loginButton.style.boxShadow = "none"; 
    });

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";
        observer.observe(section);
    });

    const menuLinks = document.querySelectorAll("header nav ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.transform = "scale(1.05)";
            link.style.transition = "transform 0.3s ease";
        });
        link.addEventListener("mouseout", () => {
            link.style.transform = "scale(1)";
        });
    });
});
