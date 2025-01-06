document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const invoiceCode = urlParams.get('codigo');
    
    if (invoiceCode) {
        document.getElementById('invoice-code').textContent = invoiceCode;
        document.getElementById('code').textContent = invoiceCode;

        // Llamada a la API para obtener los datos de la factura
        fetch(`http://localhost:8080/api/bills?codigo=${invoiceCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos de la factura');
                }
                return response.json();
            })
            .then(data => {
                // Actualizar los datos en la página
             
            })
            .catch(error => {
                console.error(error);
                alert('Hubo un error al cargar los datos de la factura.');
            });
    } else {
        alert('No se encontró ningún código de factura en la URL.');
    }

    // Evento del botón de pago
    const payButton = document.getElementById('pay-button');
    payButton.addEventListener('click', function() {
        alert('Redirigiendo a la página de pago...');
        // Lógica para redirigir a la página de pago
    });
});
