document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        if (password.length < 8 || confirmPassword.length < 8) {  
            const messageBox = document.getElementById('messageBox');
            messageBox.textContent = 'la contraseña debe tener al menos 8 caracteres';
            messageBox.className = 'message-box error';
            messageBox.style.display = 'block';
            return;
        }
        if (password !== confirmPassword) {
            const messageBox = document.getElementById('messageBox');
            messageBox.textContent = 'las contraseñas no coinciden';
            messageBox.className = 'message-box error';
            messageBox.style.display = 'block';
            return;
        }
    });
});