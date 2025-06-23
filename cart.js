// Cart logic for Audiophile
(function() {
  const CART_KEY = 'audiophile_cart';
  const SHIPPING = 50;
  const VAT_RATE = 0.2;

  function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function updateCartBadge() {
    const cartBtn = document.getElementById('cart-btn');
    if (!cartBtn) return;
    let badge = cartBtn.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5';
      badge.style.transform = 'translate(50%,-50%)';
      cartBtn.style.position = 'relative';
      cartBtn.appendChild(badge);
    }
    badge.textContent = getCartCount();
    badge.style.display = getCartCount() > 0 ? 'inline-block' : 'none';
  }

  function addToCart(product) {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === product.id);
    if (idx > -1) {
      cart[idx].qty += product.qty;
    } else {
      cart.push(product);
    }
    saveCart(cart);
    updateCartBadge();
  }

  function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartBadge();
  }

  function updateCartQty(productId, qty) {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === productId);
    if (idx > -1) {
      cart[idx].qty = qty;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
      saveCart(cart);
      updateCartBadge();
    }
  }

  function getTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const vat = Math.round(subtotal * VAT_RATE);
    const shipping = subtotal > 0 ? SHIPPING : 0;
    const grandTotal = subtotal + shipping + vat;
    return { subtotal, vat, shipping, grandTotal };
  }

  function renderCart() {
    const cart = getCart();
    const totals = getTotals();
    let html = `<div class="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Cart</h2>
      <button onclick="document.getElementById('cart-modal').remove()" class="absolute top-4 right-4 text-gray-500">&times;</button>
      <div>`;
    if (cart.length === 0) {
      html += '<p>Your cart is empty.</p>';
    } else {
      html += cart.map(item => `
        <div class="flex items-center justify-between mb-4">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded"/>
          <div class="flex-1 ml-4">
            <div class="font-semibold">${item.name}</div>
            <div class="text-sm text-gray-500">$${item.price} x ${item.qty}</div>
          </div>
          <button onclick="removeFromCart('${item.id}');window.renderCart();" class="text-red-500 ml-2">Remove</button>
        </div>
      `).join('');
      html += `<div class="border-t pt-4 mt-4">
        <div class="flex justify-between mb-2"><span>Subtotal</span><span>$${totals.subtotal}</span></div>
        <div class="flex justify-between mb-2"><span>Shipping</span><span>$${totals.shipping}</span></div>
        <div class="flex justify-between mb-2"><span>VAT (20%)</span><span>$${totals.vat}</span></div>
        <div class="flex justify-between font-bold text-lg"><span>Total</span><span>$${totals.grandTotal}</span></div>
        <a href="checkout.html" class="block mt-6 bg-orange-500 text-white text-center py-3 rounded hover:bg-orange-600 font-semibold uppercase text-sm">Checkout</a>
      </div>`;
    }
    html += '</div></div>';
    let modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.innerHTML = html;
    document.body.appendChild(modal);
  }

  // Expose globally
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQty = updateCartQty;
  window.getCart = getCart;
  window.getTotals = getTotals;
  window.renderCart = renderCart;

  // Cart button event
  document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
      cartBtn.onclick = function() {
        if (document.getElementById('cart-modal')) return;
        renderCart();
      };
    }
  });

  // Run badge update on page load
  window.addEventListener('DOMContentLoaded', updateCartBadge);
})(); 