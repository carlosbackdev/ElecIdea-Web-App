window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const billCode = urlParams.get('codigo');    
    if (billCode) {
        const billResponse = await fetch(`http://localhost:8080/api/bills?codigo=${billCode}`);
        if (billResponse.ok) {
            const billData = await billResponse.json();

            document.getElementById("number").innerText = billData.numberFactura;
            document.getElementById("nameProyect").innerText = (billData.nameProject === "" ? "Sin nombre" : billData.nameProject.charAt(0).toUpperCase() + billData.nameProject.slice(1).toLowerCase())+".";
            document.getElementById("nameClient").innerText = (billData.name === "" ? "Sin nombre" : billData.name.charAt(0).toUpperCase() + billData.name.slice(1).toLowerCase())+".";
            document.getElementById("addresClient").innerText = (billData.address === "" ? "Sin dirección" : billData.address.charAt(0).toUpperCase() + billData.address.slice(1).toLowerCase())+".";
            document.getElementById("date").innerText = billData.date;
            document.getElementById("total").innerText = billData.total+" €";
            document.getElementById("code").innerText = billData.code;

            const nif = billData.nif;
            
            const companyResponse = await fetch(`http://localhost:8080/api/companies/${nif}`);
            if (companyResponse.ok) {
                const companyData = await companyResponse.json();

                document.getElementById("nameCompany").innerText = companyData.name.charAt(0).toUpperCase() + companyData.name.slice(1).toLowerCase()+".";
                document.getElementById("addressCompany").innerText = companyData.address.charAt(0).toUpperCase() + companyData.address.slice(1).toLowerCase()
                + ", " + companyData.postal+ ", " + companyData.city.charAt(0).toUpperCase() + companyData.city.slice(1).toLowerCase()+".";
                document.getElementById("emailCompany").innerText = companyData.email;
                document.getElementById("phoneCompany").innerText ="+34 "+ companyData.phone;
                document.getElementById("iban").innerText = companyData.iban;
            } else {
                alert("No se encontraron los datos de la empresa.");
            }
        } else {
            alert("No se encontró la factura con el código proporcionado.");
        }
    } else {
        alert("No se ha proporcionado un código de factura.");
    }
    handlePaymentModal();
};

// Función para manejar el modal de pago
function handlePaymentModal() {
    document.getElementById("pay-button").addEventListener("click", function() {
        document.getElementById("paymentModal").style.display = "block";
    });

    // Evento para cerrar el modal
    document.getElementById("closeModal").addEventListener("click", function() {
        document.getElementById("paymentModal").style.display = "none";
    });

    // Evento para el formulario de pago
    document.getElementById("paymentForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Lógica de pago simulada
        alert("Pago realizado con éxito (simulación).");

        // Cerrar el modal después del pago simulado
        document.getElementById("paymentModal").style.display = "none";
    });
}

//animaciones 
document.addEventListener("DOMContentLoaded", function() {
    // Aplicar animaciones de entrada a los elementos de la página
    const header = document.querySelector("header");
    const invoiceTitle = document.getElementById("titulo");
    const invoice = document.getElementById("invoice");
    const payButton = document.getElementById("pay-button");
    const contactButton = document.querySelector(".contact-button");
    const footer = document.querySelector("footer");

    // Animaciones de entrada con delay para crear un efecto de secuencia
    setTimeout(() => {
        header.classList.add("fade-in");
    }, 100);

    setTimeout(() => {
        invoiceTitle.classList.add("slide-up");
    }, 500);

    setTimeout(() => {
        invoice.classList.add("slide-up");
    }, 1000);

    setTimeout(() => {
        payButton.classList.add("scale-up");
    }, 1500);

    setTimeout(() => {
        contactButton.classList.add("scale-up");
    }, 2000);

    setTimeout(() => {
        footer.classList.add("fade-in");
    }, 2500);
});
