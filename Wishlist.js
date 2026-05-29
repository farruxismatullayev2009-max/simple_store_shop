document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wishlist-container');

  function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  function saveWishlist(wl) {
    localStorage.setItem('wishlist', JSON.stringify(wl));
  }
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function saveCart(c) {
    localStorage.setItem('cart', JSON.stringify(c));
  }

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    saveCart(cart);
  }

  function render() {
    const wl = getWishlist();

    if (!wl.length) {
      container.innerHTML = `
        <div class="empty-wishlist">
          <i class="ri-heart-line"></i>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love to your wishlist.</p>
          <button class="btn-primary" onclick="window.location.href='index.html'">
            Browse Products
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="wishlist-header">
        <h1 class="wishlist-title">My Wishlist (${wl.length} item${wl.length > 1 ? 's' : ''})</h1>
        <button class="btn-outline" id="clear-wishlist-btn">Clear Wishlist</button>
      </div>
      <div class="wishlist-grid">
        ${wl
          .map(
            item => `
          <div class="wl-card" data-id="${item.id}">
            <div class="wl-card-img">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="wl-card-body">
              <p class="wl-card-name" title="${item.title}">${item.title}</p>
              <p class="wl-card-price">$${item.price.toFixed(2)}</p>
              <div class="wl-card-actions">
                <button class="btn-add-cart">
                  <i class="ri-shopping-cart-2-line"></i> Add to Cart
                </button>
                <button class="btn-remove">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    `;

    document
      .getElementById('clear-wishlist-btn')
      .addEventListener('click', () => {
        saveWishlist([]);
        render();
      });

    document.querySelectorAll('.wl-card').forEach(card => {
      const id = parseInt(card.getAttribute('data-id'));
      const product = wl.find(i => i.id === id);

      card.querySelector('.btn-add-cart').addEventListener('click', () => {
        addToCart(product);
        const btn = card.querySelector('.btn-add-cart');
        btn.innerHTML = '<i class="ri-check-line"></i> Added!';
        btn.style.background = '#16a34a';
        setTimeout(() => {
          btn.innerHTML = '<i class="ri-shopping-cart-2-line"></i> Add to Cart';
          btn.style.background = '';
        }, 1500);
      });

      card.querySelector('.btn-remove').addEventListener('click', () => {
        const wl = getWishlist();
        wl.splice(
          wl.findIndex(i => i.id === id),
          1,
        );
        saveWishlist(wl);
        render();
      });
    });
  }

  render();
});
