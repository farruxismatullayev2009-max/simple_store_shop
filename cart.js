document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-container');

  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function saveCart(c) {
    localStorage.setItem('cart', JSON.stringify(c));
  }

  function getSubtotal(cart) {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
  }

  function render() {
    const cart = getCart();

    if (!cart.length) {
      container.innerHTML = `
        <div class="empty-cart">
          <i class="ri-shopping-cart-line"></i>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button class="btn-primary" onclick="window.location.href='index.html'">
            Continue Shopping
          </button>
        </div>
      `;
      return;
    }

    const subtotal = getSubtotal(cart);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    container.innerHTML = `
      <h1 class="cart-title">Shopping Cart</h1>
      <div class="cart-wrapper">
        <div>
          <div class="cart-items">
            ${cart
              .map(
                item => `
              <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img">
                  <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                  <p class="cart-item-name">${item.title}</p>
                  <p class="cart-item-price-small">$${item.price.toFixed(2)}</p>
                  <div class="cart-item-controls">
                    <button class="qty-btn minus-btn"><i class="ri-subtract-line"></i></button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn plus-btn"><i class="ri-add-line"></i></button>
                    <button class="delete-btn"><i class="ri-delete-bin-line"></i></button>
                  </div>
                </div>
                <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
              </div>
            `,
              )
              .join('')}
          </div>

          <div class="cart-footer">
            <button class="btn-outline" id="clear-cart-btn">Clear Cart</button>
            <button class="btn-outline" onclick="window.location.href='index.html'">Continue Shopping</button>
          </div>
        </div>

        <div class="order-summary">
          <h2 class="summary-title">Order Summary</h2>
          <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Shipping</span>
            <span class="summary-value free">Free</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Tax</span>
            <span class="summary-value">$${tax.toFixed(2)}</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row">
            <span class="summary-total-label">Total</span>
            <span class="summary-total-value">$${total.toFixed(2)}</span>
          </div>
          <button class="checkout-btn">
            Checkout <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    `;

    // Events
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
      saveCart([]);
      render();
    });

    document.querySelectorAll('.cart-item').forEach(row => {
      const id = parseInt(row.getAttribute('data-id'));

      row.querySelector('.minus-btn').addEventListener('click', () => {
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item.qty > 1) item.qty--;
        else
          cart.splice(
            cart.findIndex(i => i.id === id),
            1,
          );
        saveCart(cart);
        render();
      });

      row.querySelector('.plus-btn').addEventListener('click', () => {
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        item.qty++;
        saveCart(cart);
        render();
      });

      row.querySelector('.delete-btn').addEventListener('click', () => {
        const cart = getCart();
        cart.splice(
          cart.findIndex(i => i.id === id),
          1,
        );
        saveCart(cart);
        render();
      });
    });
  }

  render();
});
