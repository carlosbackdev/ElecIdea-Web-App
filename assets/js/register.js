
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const nif = document.getElementById('nif').value;
    const address = document.getElementById('address').value;
    const postal = document.getElementById('postal').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const company = {
        name: name,
        nif: nif,
        address: address,
        postal: postal,
        city: city,
        email: email,
        phone: phone
    };

    fetch('https://elecideaapirest-production.up.railway.app/api/companies/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(company)
    })
    .then(response => response.json())
    .then(data => {
        const messageBox = document.getElementById('messageBox');
        if (data.status === 'success') {
            messageBox.textContent = data.message;
            messageBox.className = 'message-box success';
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

document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
});
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.querySelector("#registerForm button");
    registerButton.addEventListener("mouseover", () => {
        registerButton.style.transform = "scale(1.04)";
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
