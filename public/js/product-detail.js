   // Obtener todos los enlaces con la clase "ver-mas"
   const verMasLinks = document.querySelectorAll('.ver-mas');
    
   // Añadir un event listener a cada enlace
   verMasLinks.forEach(link => {
       link.addEventListener('click', function(event) {
           // Prevenir el comportamiento por defecto (que redirige inmediatamente)
           event.preventDefault();
           
           // Obtener el ID del producto desde el atributo 'data-id'
           const productId = this.getAttribute('data-id');
           
           // Redirigir a la página de detalles con la ID del producto
           window.location.href = `product-detail.html?id=${productId}`;
       })
    });