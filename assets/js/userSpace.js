document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
        this.querySelector(".hamburger").classList.toggle("active");
    });
});


window.onload = function() {
    const userId = localStorage.getItem("userId");

    if (userId) {
        fetch(`http://localhost:8080/api/user/${userId}/data`) // Cambia esta URL para obtener los datos del usuario desde el backend
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    document.getElementById("name").innerText = data.name;
                    document.getElementById("username").innerText = data.usuario;
                    document.getElementById("userId").innerText = data.id;
                    document.getElementById("nif").innerText = data.nif;
                } else {
                    console.error("No se recibieron datos del usuario");
                    window.location.href = "login.html";
                }
            })
            .catch((error) => {
                console.error("Error al cargar los datos del usuario:", error);
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
};
