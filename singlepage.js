document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('single-product-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    container.innerHTML = `<p style="color:#94a3b8;text-align:center;padding:80px 0;">Product ID topilmadi!</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
    );
    if (!response.ok) throw new Error('Xatolik');
    const product = await response.json();

    const displayPrice = product.price
      ? `$${Number(product.price).toFixed(2)}`
      : '$0.00';

    
    const rating = product.rating?.rate || 0;
    const count = product.rating?.count || 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) starsHTML += `<i class="ri-star-fill"></i>`;
      else if (i === fullStars && halfStar)
        starsHTML += `<i class="ri-star-half-fill"></i>`;
      else starsHTML += `<i class="ri-star-line"></i>`;
    }

    container.innerHTML = `
      <a href="index.html" class="back-btn">
        <i class="ri-arrow-left-line"></i> Back to products
      </a>

      <div class="product-detail-wrapper">

        <div class="product-image-side">
          <img src="${product.image}" alt="${product.title}">
        </div>

        <div class="product-info-side">
          <span class="category-badge">${product.category}</span>

          <h1 class="detail-title">${product.title}</h1>

          <div class="rating-row">
            <div class="stars">${starsHTML}</div>
            <span class="rating-text">${rating} (${count} reviews)</span>
          </div>

          <p class="detail-price">${displayPrice}</p>

          <div class="divider"></div>

          <div class="tabs">
            <button class="tab-btn active" data-tab="description">Description</button>
            <button class="tab-btn" data-tab="details">Details</button>
            <button class="tab-btn" data-tab="shipping">Shipping</button>
          </div>

          <div class="tab-content" id="tab-description">
            <p>${product.description}</p>
          </div>
          <div class="tab-content hidden" id="tab-details">
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Rating:</strong> ${rating} / 5</p>
            <p><strong>Total Reviews:</strong> ${count}</p>
            <p><strong>Product ID:</strong> ${product.id}</p>
          </div>
          <div class="tab-content hidden" id="tab-shipping">
            <p>Free shipping on orders over $50.</p>
            <p>Standard delivery: 3–5 business days.</p>
            <p>Express delivery: 1–2 business days (additional fee).</p>
            <p>Returns accepted within 30 days of delivery.</p>
          </div>

          <div class="divider"></div>

          <div class="quantity-row">
            <span class="qty-label">Quantity</span>
            <div class="qty-controls">
              <button class="qty-btn" id="qty-minus"><i class="ri-subtract-line"></i></button>
              <span class="qty-value" id="qty-value">1</span>
              <button class="qty-btn" id="qty-plus"><i class="ri-add-line"></i></button>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn-buy">
              <i class="ri-shopping-cart-2-line"></i> Add to Cart
            </button>
            <button class="btn-wish">
              <i class="ri-heart-line"></i>
            </button>
          </div>

        </div>
      </div>
    `;

    
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('.tab-btn')
          .forEach(b => b.classList.remove('active'));
        document
          .querySelectorAll('.tab-content')
          .forEach(c => c.classList.add('hidden'));
        btn.classList.add('active');
        document
          .getElementById('tab-' + btn.dataset.tab)
          .classList.remove('hidden');
      });
    });

    
    let qty = 1;
    document.getElementById('qty-minus').addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        document.getElementById('qty-value').textContent = qty;
      }
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
      qty++;
      document.getElementById('qty-value').textContent = qty;
    });

    
    const wishBtn = document.querySelector('.btn-wish');
    wishBtn.addEventListener('click', () => {
      const icon = wishBtn.querySelector('i');
      icon.classList.toggle('ri-heart-line');
      icon.classList.toggle('ri-heart-fill');
      wishBtn.style.color = icon.classList.contains('ri-heart-fill')
        ? '#ef4444'
        : '';
      wishBtn.style.borderColor = icon.classList.contains('ri-heart-fill')
        ? '#ef4444'
        : '';
    });
  } catch (error) {
    console.error('Xatolik:', error);
    container.innerHTML = `<p style="color:#ef4444;text-align:center;padding:80px 0;">Mahsulot yuklanmadi. Qaytadan urinib ko'ring.</p>`;
  }
});
