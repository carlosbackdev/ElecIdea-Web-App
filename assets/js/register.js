
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

    fetch('https://elecidea-app-11344837389.europe-west1.run.app/api/companies/register', {
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
