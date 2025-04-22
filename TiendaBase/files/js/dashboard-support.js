document.addEventListener('DOMContentLoaded', function() {
    // Cargar los datos de los tickets al iniciar
    loadTickets();

    // Manejar el formulario de tickets
    const ticketForm = document.getElementById('ticketForm');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const subject = document.getElementById('subject').value;
            const customer = document.getElementById('customer').value;

            fetch('/api/create-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, customer })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadTickets(); // Recargar tickets
            })
            .catch(err => console.log('Error al crear el ticket:', err));
        });
    }
    
    // Manejar el cierre de sesión - NUEVA IMPLEMENTACIÓN MÁS DIRECTA
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        console.log('Botón de logout encontrado, configurando manejador de eventos');
        
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón de logout clickeado');
            
            // Método directo
            fetch('/logout', {
                method: 'GET',
                credentials: 'include' // Asegura que las cookies se envíen con la solicitud
            })
            .then(function(response) {
                console.log('Respuesta del servidor recibida:', response.status);
                // No importa la respuesta, redirigir al index
                window.location.href = '/';
            })
            .catch(function(error) {
                console.error('Error en cierre de sesión:', error);
                // En caso de error, redirigir igualmente
                window.location.href = '/';
            });
        });
    } else {
        console.error('No se encontró el botón de logout con ID "logoutBtn"');
    }
});

// Prevenir navegación hacia atrás después del login
(function() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function() {
        window.history.pushState(null, document.title, window.location.href);
    });
})();

// Función para cargar los tickets desde el backend
function loadTickets() {
    fetch('/api/get-tickets')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('ticketsTable');
        if (tableBody) {
            const tbody = tableBody.querySelector('tbody') || tableBody;
            tbody.innerHTML = ''; // Limpiar la tabla

            data.tickets.forEach(ticket => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ticket.id}</td>
                    <td>${ticket.subject}</td>
                    <td>${ticket.customer}</td>
                    <td>${ticket.status}</td>
                    <td><button onclick="closeTicket(${ticket.id})">Cerrar</button></td>
                `;
                tbody.appendChild(row);
            });
        }
    })
    .catch(err => console.log('Error al cargar los tickets:', err));
}

// Función para cerrar un ticket
function closeTicket(ticketId) {
    fetch(`/api/close-ticket/${ticketId}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadTickets(); // Recargar tickets
    })
    .catch(err => console.log('Error al cerrar el ticket:', err));
}