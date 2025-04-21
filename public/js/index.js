// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Modal Handling
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginBtnMobile = document.getElementById('loginBtnMobile');
const registerBtnMobile = document.getElementById('registerBtnMobile');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const showRegisterModal = document.getElementById('showRegisterModal');
const showLoginModal = document.getElementById('showLoginModal');
const overlay = document.getElementById('overlay');

function openModal(modal) {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

loginBtn.addEventListener('click', () => openModal(loginModal));
registerBtn.addEventListener('click', () => openModal(registerModal));
loginBtnMobile.addEventListener('click', () => {
    openModal(loginModal);
    navMenu.classList.remove('active');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
});
registerBtnMobile.addEventListener('click', () => {
    openModal(registerModal);
    navMenu.classList.remove('active');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
});

closeLoginModal.addEventListener('click', () => closeModal(loginModal));
closeRegisterModal.addEventListener('click', () => closeModal(registerModal));
showRegisterModal.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
});
showLoginModal.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
});

overlay.addEventListener('click', () => {
    closeModal(loginModal);
    closeModal(registerModal);
});

// Cart Handling
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;

    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message" style="text-align: center; padding: 2rem; color: #e1e1e1;">
                <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '€0.00';
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="/api/placeholder/80/80" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-item" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn increase-item" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `€${total.toFixed(2)}`;

    // Add event listeners to new buttons
    document.querySelectorAll('.decrease-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            decreaseItem(id);
        });
    });

    document.querySelectorAll('.increase-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            increaseItem(id);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeItem(id);
        });
    });
}

function addItem(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    updateCart();
}

function increaseItem(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseItem(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
        updateCart();
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Event listeners
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    cartModal.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const name = e.target.getAttribute('data-name');
        const price = e.target.getAttribute('data-price');
        
        addItem(id, name, price);
        
        // Show notification
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'all 0.3s';
        notification.textContent = `${name} añadido al carrito`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    });
});

checkoutBtn.addEventListener('click', () => {
    alert('Redirigiendo al proceso de pago...');
    // In a real implementation, this would redirect to a checkout page
});

// Initialize cart
updateCart();


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // ★ Usa redirectUrl del backend ★
                    window.location.href = data.redirectUrl; 
                } else {
                    alert(data.message || 'Error al iniciar sesión');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión');
            }
        });
    }
});

document.querySelectorAll('.ver-mas').forEach(boton => {
    boton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = event.target.dataset.id; // Suponiendo que el botón tiene un `data-id`
        window.open(`product-detail.html?id=${id}`, '_blank'); // Abre en nueva pestaña
    });
});


    // Event listener para el formulario de registro
    const registerForm = document.getElementById('registerForm'); // Formulario de registro

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const registerUsername = document.getElementById('registerUsername').value;
            const registerEmail = document.getElementById('registerEmail').value;
            const registerPassword = document.getElementById('registerPassword').value;
            const registerConfirmPassword = document.getElementById('registerConfirmPassword').value;

            // Validar que las contraseñas coincidan
            if (registerPassword !== registerConfirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            // Validar que los campos no estén vacíos
            if (!registerUsername || !registerEmail || !registerPassword || !registerConfirmPassword) {
                alert('Por favor, completa todos los campos');
                return;
            }

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: registerUsername,
                        email: registerEmail,
                        password: registerPassword
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registro exitoso');
                    window.location.href = '/index.html'; // Redirigir al login
                } else {
                    alert(data.message || 'Error al registrar usuario');
                }
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                alert('Hubo un problema al procesar tu solicitud. Intenta de nuevo más tarde.');
            }
        });
    }

