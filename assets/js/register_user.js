
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const companyCode = document.getElementById('companyCode').value.trim();

    const messageBox = document.getElementById('messageBox');
    if (password.length < 8 || confirmPassword.length < 8) {
        messageBox.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        messageBox.className = 'message-box error';
        messageBox.style.display = 'block';
        return;
    }
    if (password !== confirmPassword) {
        messageBox.textContent = 'Las contraseñas no coinciden.';
        messageBox.className = 'message-box error';
        messageBox.style.display = 'block';
        return;
    }
    
    const user  = {
        usuario: usuario,
        name: name,
        password: password
    };

    fetch('https://elecideaapirest-production.up.railway.app/api/user/register?companyCode=' + companyCode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        const messageBox = document.getElementById('messageBox');
        if (data.status === 'success') {
            messageBox.textContent = data.message;
            messageBox.className = 'message-box success';
            
            setTimeout(() => {
                window.location.href = 'https://www.elecidea.com'; // Cambia esta URL según la página a la que quieras redirigir
            }, 3000); 

        } else {
        messageBox.textContent = data.message;
        messageBox.className = 'message-box error'
        }
        messageBox.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        const messageBox = document.getElementById('messageBox');
        messageBox.textContent = 'Error al enviar la solicitud. Inténtalo más tarde.';
        messageBox.className = 'message-box error';
        messageBox.style.display = 'block';
    });
});

//animaciones
document.addEventListener("DOMContentLoaded", () => {

    const registerButton = document.querySelector("#registro button");
    registerButton.addEventListener("mouseover", () => {
        registerButton.style.transform = "scale(1.05)";
        registerButton.style.transition = "transform 0.3s ease";
    });
    registerButton.addEventListener("mouseout", () => {
        registerButton.style.transform = "scale(1)";
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
});



