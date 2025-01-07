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