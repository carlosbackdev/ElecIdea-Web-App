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
    if (!name) {
        alert("Por favor, ingresa un nombre para buscar.");
        return; 
    }

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
    if (!name) {
        alert("Por favor, ingresa un nombre para buscar.");
        return; 
    }

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