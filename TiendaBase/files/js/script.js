document.addEventListener('DOMContentLoaded', function() {
    // Cargar los scripts/productos al cargar la página
    cargarScripts();
});

// Función para cargar la lista de scripts/productos desde la API
function cargarScripts() {
    // Mostrar indicador de carga si existe
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) loadingElement.style.display = 'block';
    
    fetch('/api/scripts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de productos');
            }
            return response.json();
        })
        .then(scripts => {
            // Mostrar los scripts en la página
            mostrarScripts(scripts);
        })
        .catch(error => {
            console.error('Error:', error);
            // Mostrar mensaje de error en la página
            const contenedor = document.getElementById('scripts-container');
            contenedor.innerHTML = `
                <div class="error-message">
                    <p>Ha ocurrido un error al cargar los productos. Por favor, intenta nuevamente más tarde.</p>
                </div>
            `;
        })
        .finally(() => {
            // Ocultar indicador de carga
            if (loadingElement) loadingElement.style.display = 'none';
        });
}

// Función para mostrar los scripts en la página
function mostrarScripts(scripts) {
    const contenedor = document.getElementById('scripts-container');
    
    // Limpiar el contenedor
    contenedor.innerHTML = '';
    
    // Si no hay scripts, mostrar mensaje
    if (!scripts || scripts.length === 0) {
        contenedor.innerHTML = '<p class="no-results">No se encontraron productos disponibles.</p>';
        return;
    }
    
    // Crear elementos para cada script
    scripts.forEach(script => {
        const scriptElement = document.createElement('div');
        scriptElement.className = 'script-card';
        
        // Determinar la imagen (usar una por defecto si no hay)
        const imagenUrl = script.imagenUrl || '/img/default-product.jpg';
        
        // Crear HTML para el script
        scriptElement.innerHTML = `
            <div class="script-image">
                <img src="${imagenUrl}" alt="${script.titulo}">
            </div>
            <div class="script-content">
                <h3 class="script-title">${script.titulo}</h3>
                <p class="script-description">${truncarTexto(script.descripcion, 100)}</p>
                <div class="script-meta">
                    <span class="script-price">${script.precio} USD</span>
                    <span class="script-category">${script.categoria ? script.categoria.nombre : 'Sin categoría'}</span>
                </div>
                <div class="script-actions">
                    <button class="ver-detalle-btn" onclick="abrirDetalleProducto('${script._id}')">Ver más detalle</button>
                </div>
            </div>
        `;
        
        // Agregar el elemento al contenedor
        contenedor.appendChild(scriptElement);
    });
}

// Función para abrir los detalles del producto en una nueva ventana
function abrirDetalleProducto(productId) {
    // Abrir una nueva ventana con los detalles del producto
    window.open(`/product-detail.html?id=${productId}`, '_blank');
}

// Función auxiliar para truncar texto
function truncarTexto(texto, longitud) {
    if (!texto) return '';
    return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
}