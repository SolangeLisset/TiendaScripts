  // Función para cambiar el avatar
  function changeAvatar() {
    const newAvatar = prompt("Ingresa la URL de tu nueva imagen de avatar:");
    if (newAvatar) {
        document.getElementById('userAvatar').src = newAvatar;
    }
}

// Cambio de sección en el perfil
const sectionLinks = document.querySelectorAll('a[data-section]');
const sections = document.querySelectorAll('.content-section');

sectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Mostrar la sección correspondiente
        const sectionId = link.getAttribute('data-section');
        document.getElementById(`${sectionId}-section`).classList.remove('hidden');
        
        // Cambiar clase activa
        sectionLinks.forEach(link => {
            link.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Guardar cambios en el perfil
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const bio = document.getElementById('bioInput').value;
    alert('Cambios guardados en el perfil: ' + bio);
});

// Cambiar contraseña
document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }
    
    alert('Contraseña cambiada correctamente');
});

// Abrir un ticket de soporte
document.getElementById('newTicketForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('ticketTitle').value;
    const description = document.getElementById('ticketDescription').value;
    alert(`Ticket creado: ${title}\nDescripción: ${description}`);
});

// Reemplazar el evento de cierre de sesión existente
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir navegación directa
            
            fetch('/logout')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Sesión cerrada correctamente');
                    // Borrar información del usuario del localStorage si existe
                    localStorage.removeItem('user');
                    // Redirigir al index
                    window.location.replace('/');
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                    // En caso de error, intentamos redirigir de todas formas
                    localStorage.removeItem('user');
                    alert('Hubo un problema al cerrar sesión');
                    window.location.replace('/');
                });
        });
    }
});

// Prevenir navegación hacia atrás después del login
(function() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function() {
        window.history.pushState(null, document.title, window.location.href);
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    // Datos simulados de los scripts comprados
    const purchasedScripts = [
        { id: 1, name: "Script A", purchaseDate: "01/03/2025", licenseStatus: "Activo" },
        { id: 2, name: "Script B", purchaseDate: "10/03/2025", licenseStatus: "Expirado" },
        { id: 3, name: "Script C", purchaseDate: "15/03/2025", licenseStatus: "Activo" }
    ];

    const purchasedScriptsContainer = document.getElementById("purchasedScripts");
    const deleteAllBtn = document.getElementById("deleteAllBtn");

    // Función para cargar los scripts comprados
    function loadPurchasedScripts() {
        purchasedScriptsContainer.innerHTML = ""; // Limpiar la lista antes de agregar los nuevos elementos

        purchasedScripts.forEach(script => {
            const scriptElement = document.createElement("li");
            scriptElement.classList.add("script-item");
            scriptElement.innerHTML = `
                <h3>${script.name}</h3>
                <p>Fecha de compra: ${script.purchaseDate}</p>
                <p>Licencia: ${script.licenseStatus}</p>
                <button class="btn download-btn" ${script.licenseStatus === "Expirado" ? "disabled" : ""}>Descargar</button>
                <button class="btn remove-btn" data-id="${script.id}">Eliminar</button>
            `;
            purchasedScriptsContainer.appendChild(scriptElement);
        });

        // Añadir funcionalidad de eliminar por cada script
        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const scriptId = e.target.getAttribute("data-id");
                removeScript(scriptId);
            });
        });
    }

    // Función para eliminar un script
    function removeScript(scriptId) {
        const index = purchasedScripts.findIndex(script => script.id == scriptId);
        if (index !== -1) {
            purchasedScripts.splice(index, 1); // Eliminar el script del arreglo
            loadPurchasedScripts(); // Recargar los scripts después de eliminar
        }
    }

    // Función para eliminar todos los scripts
    deleteAllBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas eliminar todos los scripts?")) {
            purchasedScripts.length = 0; // Vaciar el arreglo
            loadPurchasedScripts(); // Recargar los scripts después de eliminar
        }
    });

    // Cargar los scripts cuando se accede a la sección "Mis Scripts"
    document.querySelector('a[data-section="purchases"]').addEventListener("click", () => {
        loadPurchasedScripts();
    });

    // Inicializar la sección activa por defecto
    showSection("profile");
});
