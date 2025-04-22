document.addEventListener("DOMContentLoaded", () => {
    const sectionLinks = document.querySelectorAll('a[data-section]');
    const sections = document.querySelectorAll('.admin-content-section');
    const adminScriptList = document.getElementById("adminScriptList");
    const adminUserList = document.getElementById("adminUserList");

    // Cambiar de sección
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

    // Cargar Scripts
    async function loadScripts() {
        try {
            const response = await fetch('/api/scripts');
            const scripts = await response.json();
            adminScriptList.innerHTML = ""; // Limpiar la lista de scripts

            scripts.forEach(script => {
                const scriptItem = document.createElement("div");
                scriptItem.classList.add("script-item");
                scriptItem.innerHTML = `
                    <h3>${script.name}</h3>
                    <p>Fecha de compra: ${script.purchase_date}</p>
                    <p>Licencia: ${script.license_status}</p>
                    <button class="btn">Descargar</button>
                    <button class="btn remove-btn" data-id="${script.id}">Eliminar</button>
                `;
                adminScriptList.appendChild(scriptItem);
            });

            // Eliminar un script
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const scriptId = e.target.getAttribute("data-id");
                    deleteScript(scriptId);
                });
            });

        } catch (error) {
            console.error('Error al cargar los scripts:', error);
        }
    }

    // Eliminar un script
    async function deleteScript(scriptId) {
        try {
            const response = await fetch(`/api/scripts/${scriptId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadScripts();  // Recargar los scripts
            } else {
                console.error('Error al eliminar el script');
            }
        } catch (error) {
            console.error('Error al eliminar el script:', error);
        }
    }

    // Cargar Usuarios
    async function loadUsers() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            adminUserList.innerHTML = ""; // Limpiar la lista de usuarios

            users.forEach(user => {
                const userItem = document.createElement("div");
                userItem.classList.add("user-item");
                userItem.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <button class="btn remove-btn" data-id="${user.id}">Eliminar</button>
                `;
                adminUserList.appendChild(userItem);
            });

            // Eliminar un usuario
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const userId = e.target.getAttribute("data-id");
                    deleteUser(userId);
                });
            });

        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        }
    }

    // Eliminar un usuario
    async function deleteUser(userId) {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadUsers();  // Recargar los usuarios
            } else {
                console.error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }

    // Cargar Estadísticas
    function loadStats() {
        // Aquí puedes agregar lógica para obtener estadísticas desde el servidor
        document.getElementById("adminStats").innerHTML = `
            <p>Total de scripts vendidos: 120</p>
            <p>Total de usuarios registrados: 30</p>
        `;
    }

    // Cargar contenido por defecto
    loadScripts();
    loadUsers();
    loadStats();
});

// Seleccionar los enlaces de la barra lateral
const sectionLinks = document.querySelectorAll('a[data-section]');
const sections = document.querySelectorAll('.content-section');

// Añadir un event listener a cada enlace de la barra lateral
sectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.add('hidden');
        });

        // Mostrar la sección correspondiente
        const sectionId = link.getAttribute('data-section');
        const activeSection = document.getElementById(`${sectionId}-section`);
        if (activeSection) {
            activeSection.classList.remove('hidden');
        }

        // Cambiar clase activa en la barra lateral
        sectionLinks.forEach(link => {
            link.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Añadir manejo de cierre de sesión al final del archivo
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
                    if (data.success) {
                        alert('Sesión cerrada correctamente');
                        // Redirigir al index
                        window.location.replace('/');
                    }
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                    // En caso de error, intentamos redirigir de todas formas
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


