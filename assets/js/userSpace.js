document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
        this.querySelector(".hamburger").classList.toggle("active");
    });
});

function formatDate(dateString) {
    return dateString || "Fecha no disponible";
}

// cargar datos del usuario
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
                    getRecentClients(data.nif);
                    getRecentProjects(data.nif);
                    getBills(data.nif);
                    getGains(data.nif)
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

//cargo los clientes recientes
function getRecentClients(nif) {
    fetch(`http://localhost:8080/api/clients/${nif}/recent`) 
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los clientes recientes");
            }
        })
        .then((clients) => {
            if (clients && clients.length > 0) {
                const clientsContainer = document.getElementById("clientesData");
                clientsContainer.innerHTML = ""; 
                clients.forEach((client) => {
                    const clientRow = document.createElement("div");
                    clientRow.classList.add("client-row");
                    clientRow.innerHTML = `
                        <p>${client.name}</p>
                        <p>${(client.address && client.city && client.postal) 
                                ? `${client.address}, ${client.postal}, ${client.city}.` 
                                : "Dirección no disponible"}</p>
                        <p>${client.email || "Email no disponible"}</p>
                        <p>${client.phone || "Teléfono no disponible"}</p>
                        <p>${client.date ? formatDate(client.date) : "Fecha no disponible"}</p>
                    `;
                    clientsContainer.appendChild(clientRow);
                });
            } else {
                document.getElementById("clientesData").innerHTML = "<p>No se encontraron clientes recientes.</p>";
            }
        })
        .catch((error) => {
            console.error("Error al cargar los clientes recientes:", error);
        });
}
//cargo los clientes por nombre
document.getElementById("searchButton").addEventListener("click", function () {
    const nif = document.getElementById("nif").innerText;
    const name = document.getElementById("searchClient").value.trim();
     const clientsContainer = document.getElementById("clientesData");
    clientsContainer.innerHTML = "<p>Cargando resultados...</p>"; 

    fetch(`http://localhost:8080/api/clients/${nif}/search?name=${name}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("No existen clientes con ese nombre.");
            }
        })
        .then((clients) => {
            if (clients && clients.length > 0) {
                clientsContainer.innerHTML = ""; 
                clients.forEach((client) => {
                    const clientRow = document.createElement("div");
                    clientRow.classList.add("client-row");
                    clientRow.innerHTML = `
                        <p>${client.name}</p>
                        <p>${(client.address && client.city && client.postal) 
                                ? `${client.address}, ${client.postal}, ${client.city}.` 
                                : "Dirección no disponible"}</p>
                        <p>${client.email || "Email no disponible"}</p>
                        <p>${client.phone || "Teléfono no disponible"}</p>
                        <p>${client.date ? formatDate(client.date) : "Fecha no disponible"}</p>
                    `;
                    clientsContainer.appendChild(clientRow);
                });
            } else {
                clientsContainer.innerHTML = "<p>No se encontraron clientes que coincidan con la búsqueda.</p>";
            }
        })
        .catch((error) => {
            console.error("Error al buscar clientes por nombre:", error);
            clientsContainer.innerHTML = "<p>No existen clientes que coincidan con la busqueda.</p>";
        });
});

//cargar los proyectos recientes
function getRecentProjects(nif) {
    fetch(`http://localhost:8080/api/projects/${nif}/recent`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los proyectos recientes");
            }
        })
        .then((projects) => {
            if (projects && projects.length > 0) {
                const projectsContainer = document.getElementById("proyectosData");
                projectsContainer.innerHTML = "";
                projects.forEach((project) => {
                    const projectRow = document.createElement("div");
                    projectRow.classList.add("proyect-row");
                    projectRow.innerHTML = `
                        <p>${project.projectName}</p>
                        <p>${project.clientName}</p>
                        <p>${project.projectType}</p>
                        <p>${project.projectInfo}</p>
                        <p>${project.projectDate ? formatDate(project.projectDate) : "Fecha no disponible"}</p>
                    `;
                    projectsContainer.appendChild(projectRow);
                });
            } else {
                document.getElementById("proyectosData").innerHTML = "<p>No se encontraron proyectos recientes.</p>";
            }
        })
        .catch((error) => {
            console.error("Error al cargar los proyectos recientes:", error);
        });
}


//cargar los proyectos por nombre
document.getElementById("searchButton2").addEventListener("click", function () {
    const nif = document.getElementById("nif").innerText;
    const name = document.getElementById("searchProyect").value.trim();
    const projectsContainer = document.getElementById("proyectosData");
    projectsContainer.innerHTML = "<p>Cargando resultados...</p>"; 

    fetch(`http://localhost:8080/api/projects/${nif}/search?name=${name}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("No existen proyectos con ese nombre.");
            }
        })
        .then((projects) => {
            if (projects && projects.length > 0) {
                projectsContainer.innerHTML = ""; 
                projects.forEach((project) => {
                    const projectRow = document.createElement("div");
                    projectRow.classList.add("proyect-row");
                    projectRow.innerHTML = `
                        <p>${project.projectName}</p>
                        <p>${project.clientName}</p>
                        <p>${project.projectType}</p>
                        <p>${project.projectInfo}</p>
                        <p>${project.projectDate ? formatDate(project.projectDate) : "Fecha no disponible"}</p>
                    `;
                    projectsContainer.appendChild(projectRow);
                });
            } else {
                projectsContainer.innerHTML = "<p>No se encontraron proyectos que coincidan con la búsqueda.</p>";
            }
        })
        .catch((error) => {
            console.error("Error al buscar clientes por nombre:", error);
            projectsContainer.innerHTML = "<p>No existen proyectos que coincidan con la busqueda.</p>";
        });
});

//cargar las facturas sin pagar
function getBills(nif) {
    fetch(`http://localhost:8080/api/bills/${nif}/all`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los proyectos recientes");
            }
        })
        .then((bills) => {
            if (bills && bills.length > 0) {
                const facturasContainer = document.getElementById("facturasData");
                facturasContainer.innerHTML = "";
                bills.forEach((bill) => {
                    const facturaRow = document.createElement("div");
                    facturaRow.classList.add("factura-row");
                    facturaRow.innerHTML = `
                        <p>${bill.name}</p>
                        <p>${bill.address}</p>
                        <p>${bill.totalMaterial}€</p>
                        <p>${bill.hour}h</p>
                        <p>${bill.total}€</p>
                        <p>${bill.status}</p>
                        <p>${bill.date ? formatDate(bill.date) : "Fecha no disponible"}</p>
                    `;
                    if (bill.status == "sin enviar") {
                        facturaRow.innerHTML += `<a href="sendBill" class="btn small-btn sendBill" 
                        data-bill-code="${bill.code}" data-bill-id="${bill.id}">Enviar Factura</a>
                        `;
                    }
                    if (bill.status == "pendiente pago") {
                        facturaRow.innerHTML += `<a href="payBill" class="btn small-btn payBill" data-bill-code="${bill.code}">Actualiza a pagado</a>
                        `;
                    }  
                    facturasContainer.appendChild(facturaRow);
                });
            } else {
                document.getElementById("facturasData").innerHTML = "<p>No se encontraron proyectos recientes.</p>";
            }
        })
        .catch((error) => {
            console.error("Error al cargar los proyectos recientes:", error);
        });
}

//cargar las facturas por nombre
document.getElementById("searchButton3").addEventListener("click", function () {
    const nif = document.getElementById("nif").innerText;
    const name = document.getElementById("searchBill").value.trim();
    const facturasContainer = document.getElementById("facturasData");
    facturasContainer.innerHTML = "<p>Cargando resultados...</p>"; 

    fetch(`http://localhost:8080/api/bills/${nif}/search?name=${name}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("No existen clientes con ese nombre.");
            }
        })
        .then((bills) => {
            if (bills && bills.length > 0) {
                facturasContainer.innerHTML = ""; 
                bills.forEach((bill) => {
                    const facturaRow = document.createElement("div");
                    facturaRow.classList.add("factura-row");
                    facturaRow.innerHTML = `
                        <p>${bill.name}</p>
                        <p>${bill.address}</p>
                        <p>${bill.totalMaterial}€</p>
                        <p>${bill.hour}h</p>
                        <p>${bill.total}€</p>
                        <p>${bill.status}</p>
                        <p>${bill.date ? formatDate(bill.date) : "Fecha no disponible"}</p>
                    `;
                    if (bill.status == "sin enviar") {
                        facturaRow.innerHTML += `<a href="sendBill" class="btn small-btn sendBill" 
                        data-bill-code="${bill.code}" data-bill-id="${bill.id}">Enviar Factura</a>
                        `;
                    }
                    if (bill.status == "pendiente pago") {
                        facturaRow.innerHTML += `<a href="payBill" class="btn small-btn payBill" data-bill-code="${bill.code}">Actualiza a pagado</a>
                        `;
                    }  
                    facturasContainer.appendChild(facturaRow);
                });
            } else {
                facturasContainer.innerHTML = "<p>No se encontraron clientes que coincidan con la búsqueda.</p>";
            }
        })
        .catch((error) => {
            console.error("Error al buscar clientes por nombre:", error);
            facturasContainer.innerHTML = "<p>No existen clientes que coincidan con la busqueda.</p>";
        });
});

document.getElementById("facturasData").addEventListener("click", function (event) {
    if (event.target.classList.contains("sendBill")) {
        event.preventDefault(); 
        const button = event.target;
        button.disabled = true;
        
        const billCode = button.dataset.billCode;
        const billId = button.dataset.billId;

         fetch(`http://localhost:8080/api/bills/${billId}/send?billCode=${billCode}`, {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Error al enviar la factura: " + response.status);
                }
            })
            .then((message) => {
                alert(message);
                console.log("Factura enviada con éxito:", message);
            })
            .catch((error) => {
                console.error("Error al enviar la factura:", error);
                alert("Ocurrió un error al intentar enviar la factura. Por favor, inténtelo de nuevo.");
            })
            .finally(() => {
                button.disabled = false;
            });
    }

    if (event.target.classList.contains("payBill")) {
        event.preventDefault();
        const billCode = event.target.dataset.billCode; 
        console.log("Botón de actualizar a pagado clicado, código de factura:", billCode);
        updateBillStatusToPaid(billCode); 
    }
});
//obtener los ingresos
function getGains(nif) {
    fetch(`http://localhost:8080/api/bills/${nif}/gains`) 
        .then((response) => {
            if (response.ok) {
                return response.text(); 
            } else {
                throw new Error("Error al obtener los ingresos.");
            }
        })
        .then((totalPaid) => {
            document.getElementById("Ingresos").innerText = `${totalPaid} €`;
        })
        .catch((error) => {
            console.error("Error al cargar los ingresos:", error);
        });
}
