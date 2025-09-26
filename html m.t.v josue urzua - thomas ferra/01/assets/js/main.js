// Función para cargar productos destacados en la página de inicio
function cargarProductosDestacados() {
    const contenedor = document.getElementById('productos-destacados');
    
    if (!contenedor) return;
    
    // Obtener productos destacados (primeros 6 productos)
    const productosDestacados = productos.slice(0, 6);
    
    let html = '';
    
    productosDestacados.forEach(producto => {
        html += `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <img src="${producto.imagen}" class="card-img-top product-img" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text flex-grow-1">${producto.descripcion}</p>
                        <div class="mt-auto">
                            <p class="card-text fw-bold text-primary">$${producto.precio.toLocaleString()}</p>
                            <div class="d-grid gap-2">
                                <a href="producto-detalle.html?id=${producto.id}" class="btn btn-primary">Ver Detalles</a>
                                <button class="btn btn-outline-primary agregar-carrito" data-id="${producto.id}">
                                    <i class="fas fa-cart-plus me-1"></i> Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    
    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', function() {
            const idProducto = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(idProducto);
            actualizarContadorCarrito();
            
            // Mostrar mensaje de éxito
            mostrarMensaje('Producto agregado al carrito', 'success');
        });
    });
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo = 'info') {
    // Crear elemento de mensaje
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    alerta.style.top = '20px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '9999';
    alerta.style.minWidth = '300px';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al documento
    document.body.appendChild(alerta);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.parentNode.removeChild(alerta);
        }
    }, 3000);
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarProductosDestacados();
    actualizarContadorCarrito();
});