/* ==========================================
   TIMOR NOVOSELSKY PHOTOGRAPHY - SIDE CART MANAGER
   ========================================== */

const CART_STORAGE_KEY = 'timor_photography_cart';

function getCart() {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
}

function updateCartUI() {
    const cart = getCart();
    const isGerman = document.documentElement.lang === 'de' || window.location.pathname.includes('-de');
    
    const cartTriggers = document.querySelectorAll('.cartTriggerBadge');
    cartTriggers.forEach(el => {
        el.textContent = cart.length;
    });

    const itemList = document.getElementById('cartItemsList');
    const emptyMsg = document.getElementById('cartEmptyMsg');
    const subtotalEl = document.getElementById('cartSubtotalAmount');

    if (itemList) {
        itemList.innerHTML = '';
        if (cart.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
        } else {
            if (emptyMsg) emptyMsg.style.display = 'none';
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cartItem';
                itemDiv.innerHTML = `
                    <img src="${item.src}" class="cartItemThumb" alt="">
                    <div class="cartItemInfo">
                        <div class="cartItemTitle">${item.title}</div>
                        <div class="cartItemPrice">${item.price} CHF</div>
                    </div>
                    <button class="cartItemRemove" onclick="removeFromCart(${index})">${isGerman ? 'Entfernen' : 'Remove'}</button>
                `;
                itemList.appendChild(itemDiv);
            });
        }
    }

    if (subtotalEl) {
        const total = cart.reduce((sum, item) => sum + (item.price || 35), 0);
        subtotalEl.textContent = total + ' CHF';
    }
}

function addToCart(title, src, price = 35) {
    const cart = getCart();
    cart.push({
        id: src + '_' + Date.now(),
        title: title || 'Fine Art Photograph',
        src: src,
        price: price
    });
    saveCart(cart);
    updateCartUI();
    openCart();
}

function removeFromCart(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCart(cart);
        updateCartUI();
    }
}

function openCart() {
    const cartDrawer = document.getElementById('sideCartDrawer');
    const cartOverlay = document.getElementById('sideCartOverlay');
    if (cartDrawer) cartDrawer.classList.add('activeCart');
    if (cartOverlay) cartOverlay.classList.add('activeCartOverlay');
}

function closeCart() {
    const cartDrawer = document.getElementById('sideCartDrawer');
    const cartOverlay = document.getElementById('sideCartOverlay');
    if (cartDrawer) cartDrawer.classList.remove('activeCart');
    if (cartOverlay) cartOverlay.classList.remove('activeCartOverlay');
}

function addCurrentLightboxToCart() {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    if (!lightboxImg || !lightboxImg.src) return;
    
    const src = lightboxImg.getAttribute('src') || lightboxImg.src;
    const title = (lightboxCaption ? lightboxCaption.textContent : '') || 'Fine Art Photograph';
    
    if (typeof closeLightbox === 'function') {
        closeLightbox();
    }
    
    addToCart(title, src, 35);
}

function proceedToCheckout() {
    const cart = getCart();
    const isGerman = document.documentElement.lang === 'de' || window.location.pathname.includes('-de');
    if (cart.length === 0) {
        alert(isGerman ? 'Ihr Warenkorb ist leer.' : 'Your cart is empty.');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price || 35), 0);
    alert(isGerman 
        ? `Weiterleitung zur sicheren Kasse für ${total} CHF...\nVielen Dank für Ihre Bestellung!` 
        : `Proceeding to secure Stripe Checkout for ${total} CHF...\nThank you for your order!`);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

function goBack(defaultUrl) {
    if (document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
        window.history.back();
    } else {
        window.location.href = defaultUrl || (document.documentElement.lang === 'de' || window.location.pathname.includes('-de') ? 'index-de.html' : 'index.html');
    }
}

function toggleFullscreen(event) {
    if (event) event.stopPropagation();
    const lightboxImg = document.getElementById('lightboxImg');
    if (!lightboxImg) return;
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (lightboxImg.requestFullscreen) {
            lightboxImg.requestFullscreen();
        } else if (lightboxImg.webkitRequestFullscreen) {
            lightboxImg.webkitRequestFullscreen();
        } else if (lightboxImg.msRequestFullscreen) {
            lightboxImg.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
