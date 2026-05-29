document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  const searchInput = document.querySelector('.store-input');
  const searchBtn = document.querySelector('.search-btn');
  const filterBtn = document.querySelector('.filter-btn');
  if (!container) return;

  let allProducts = [];
  let activeCategory = 'all';

  // ===== CART & WISHLIST (localStorage) =====
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  function saveCart(c) {
    localStorage.setItem('cart', JSON.stringify(c));
  }
  function saveWishlist(w) {
    localStorage.setItem('wishlist', JSON.stringify(w));
  }

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    saveCart(cart);
  }

  function toggleWishlist(product) {
    const wl = getWishlist();
    const idx = wl.findIndex(i => i.id === product.id);
    if (idx > -1) {
      wl.splice(idx, 1);
      saveWishlist(wl);
      return false;
    } else {
      wl.push(product);
      saveWishlist(wl);
      return true;
    }
  }

  function isWishlisted(id) {
    return getWishlist().some(i => i.id === id);
  }

  // ===== TOAST =====
  document.head.insertAdjacentHTML(
    'beforeend',
    `
    <style>
      #toast-container {
        position:fixed;bottom:24px;right:24px;
        z-index:9999;display:flex;flex-direction:column;
        gap:10px;pointer-events:none;
      }
      .toast {
        display:flex;align-items:center;gap:12px;
        background:#0d1626;border:1px solid #1e293b;
        border-radius:10px;padding:12px 16px;
        min-width:280px;max-width:340px;
        box-shadow:0 8px 24px rgba(0,0,0,0.4);
        animation:toastIn 0.3s ease forwards;pointer-events:all;
      }
      .toast.hide { animation:toastOut 0.3s ease forwards; }
      .toast-icon {
        width:36px;height:36px;border-radius:8px;
        display:flex;align-items:center;justify-content:center;
        font-size:18px;flex-shrink:0;
      }
      .toast-icon.cart  { background:#1e3a5f;color:#3b82f6; }
      .toast-icon.heart { background:#2a1215;color:#ef4444; }
      .toast-text { display:flex;flex-direction:column;gap:2px; }
      .toast-title { font-size:14px;font-weight:600;color:#fff; }
      .toast-sub   { font-size:12px;color:#64748b; }
      @keyframes toastIn {
        from { opacity:0;transform:translateX(60px); }
        to   { opacity:1;transform:translateX(0); }
      }
      @keyframes toastOut {
        from { opacity:1;transform:translateX(0); }
        to   { opacity:0;transform:translateX(60px); }
      }
    </style>
  `,
  );
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="toast-container"></div>`,
  );

  function showToast(type, title) {
    const tc = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    const isCart = type === 'cart';
    const short = title.length > 32 ? title.slice(0, 32) + '…' : title;
    toast.innerHTML = `
      <div class="toast-icon ${isCart ? 'cart' : 'heart'}">
        <i class="${isCart ? 'ri-shopping-cart-2-line' : 'ri-heart-fill'}"></i>
      </div>
      <div class="toast-text">
        <span class="toast-title">${isCart ? 'Added to Cart' : 'Added to Wishlist'}</span>
        <span class="toast-sub">${short}</span>
      </div>
    `;
    tc.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ===== NAVBAR BADGES =====
  const navHeartIcon = document.querySelector(
    '.nav-right .nav-icon:nth-child(2) a',
  );
  const navCartIcon = document.querySelector(
    '.nav-right .nav-icon:nth-child(3) a',
  );

  function createBadge(el) {
    const b = document.createElement('span');
    b.style.cssText = `
      position:absolute;top:-4px;right:-4px;
      background:transparent;color:transparent;
      font-size:10px;font-weight:700;
      width:18px;height:18px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      pointer-events:none;
    `;
    el.style.position = 'relative';
    el.appendChild(b);
    return b;
  }

  const heartBadge = createBadge(navHeartIcon);
  const cartBadge = createBadge(navCartIcon);

  function updateBadge(badge, count) {
    badge.textContent = count;
    badge.style.background = count > 0 ? '#3b82f6' : 'transparent';
    badge.style.color = count > 0 ? '#fff' : 'transparent';
  }

  function refreshBadges() {
    updateBadge(
      cartBadge,
      getCart().reduce((s, i) => s + i.qty, 0),
    );
    updateBadge(heartBadge, getWishlist().length);
  }
  refreshBadges();

  // Navbar ikonkalarini sahifalarga bog'lash
  navCartIcon.href = 'cart.html';
  navHeartIcon.href = 'wishlist.html';

  // ===== FILTER SIDEBAR =====
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <style>
      #cat-select {
        width:100%;background:#0d1626;border:1px solid #1e293b;
        border-radius:8px;padding:13px 16px;font-size:15px;color:#e2e8f0;
        font-family:inherit;cursor:pointer;outline:none;
        appearance:none;-webkit-appearance:none;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat:no-repeat;background-position:right 14px center;
        transition:border-color 0.2s;
      }
      #cat-select:focus,#cat-select.selected{border-color:#3b82f6;}
      #cat-select option{background:#0d1626;color:#e2e8f0;}
      #clear-filters-btn{
        background:transparent;border:1px solid #334155;color:#e2e8f0;
        padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;
        cursor:pointer;font-family:inherit;transition:all 0.2s;
      }
      #clear-filters-btn:hover{background:#1e293b;border-color:#475569;}
    </style>
    <div id="filter-overlay" style="
      display:none;position:fixed;inset:0;
      background:rgba(0,0,0,0.75);z-index:1000;justify-content:flex-end;
    ">
      <div id="filter-sidebar" style="
        background:#060e1c;width:100%;max-width:400px;height:100%;
        overflow-y:auto;padding:28px 24px;display:flex;flex-direction:column;
        gap:20px;box-shadow:-8px 0 40px rgba(0,0,0,0.5);
      ">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;">
          <div>
            <h2 style="font-size:20px;font-weight:700;color:#fff;">Filter Products</h2>
            <p style="font-size:13px;color:#64748b;margin-top:5px;">Narrow down products by applying filters</p>
          </div>
          <button id="close-filter" style="background:transparent;border:none;color:#64748b;font-size:18px;cursor:pointer;padding:4px;">✕</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <p style="font-size:14px;font-weight:600;color:#fff;">Category</p>
          <select id="cat-select">
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
          </select>
        </div>
        <div style="display:flex;justify-content:flex-end;">
          <button id="clear-filters-btn">Clear Filters</button>
        </div>
      </div>
    </div>
  `,
  );

  const overlay = document.getElementById('filter-overlay');
  const closeBtn = document.getElementById('close-filter');
  const catSelect = document.getElementById('cat-select');
  const clearBtn = document.getElementById('clear-filters-btn');

  filterBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    catSelect.value = activeCategory;
    catSelect.classList.toggle('selected', activeCategory !== 'all');
  });

  function closeModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  catSelect.addEventListener('change', () => {
    activeCategory = catSelect.value;
    catSelect.classList.toggle('selected', activeCategory !== 'all');
    filterBtn.style.background = activeCategory !== 'all' ? '#1e3a5f' : '';
    applyFilters();
  });

  clearBtn.addEventListener('click', () => {
    activeCategory = 'all';
    catSelect.value = 'all';
    catSelect.classList.remove('selected');
    filterBtn.style.background = '';
    applyFilters();
    closeModal();
  });

  // ===== SEARCH =====
  searchInput.addEventListener('input', applyFilters);
  searchBtn.addEventListener('click', applyFilters);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') applyFilters();
  });

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let filtered = allProducts.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      const matchCat =
        activeCategory === 'all' || p.category === activeCategory;
      return matchSearch && matchCat;
    });
    renderProducts(filtered, query);
  }

  // ===== FETCH =====
  async function fetchProducts() {
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=20');
      if (!res.ok) throw new Error('Xatolik');
      allProducts = await res.json();
      renderProducts(allProducts);
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p style="color:#ef4444;text-align:center;width:100%;">Mahsulotlarni yuklab bo'lmadi.</p>`;
    }
  }

  // ===== RENDER =====
  function renderProducts(list, query = '') {
    if (!list.length) {
      container.innerHTML = `
        <div style="width:100%;text-align:center;padding:80px 0;">
          <i class="ri-search-line" style="font-size:52px;color:#1e293b;display:block;margin-bottom:16px;"></i>
          <p style="color:#64748b;font-size:16px;">
            ${query ? `"<strong style="color:#94a3b8">${query}</strong>" — mahsulot topilmadi` : 'Mahsulot topilmadi'}
          </p>
        </div>`;
      return;
    }

    container.innerHTML = list
      .map(p => {
        const wishlisted = isWishlisted(p.id);
        return `
        <div class="card" data-id="${p.id}" data-title="${p.title.replace(/"/g, '&quot;')}">
          <div class="images">
            <img src="${p.image}" alt="${p.title}">
            <div class="like">
              <i class="${wishlisted ? 'ri-heart-fill' : 'ri-heart-line'}" style="${wishlisted ? 'color:#ef4444' : ''}"></i>
            </div>
            <div class="buttons">
              <button class="btn-eye"><i class="ri-eye-line"></i></button>
              <button class="btn-cart-icon"><i class="ri-shopping-cart-2-line"></i></button>
            </div>
          </div>
          <div class="content">
            <h2 class="title">${p.title}</h2>
            <p class="description">${p.description}</p>
            <p class="price">$${p.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      `;
      })
      .join('');

    document.querySelectorAll('.card[data-id]').forEach(card => {
      const id = parseInt(card.getAttribute('data-id'));
      const title = card.getAttribute('data-title');
      const product = allProducts.find(p => p.id === id);

      card.querySelector('.images').addEventListener('click', e => {
        if (e.target.closest('.like') || e.target.closest('.buttons')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      card.querySelector('.btn-eye').addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'singlepage.html?id=' + id;
      });

      card.querySelector('.content').addEventListener('click', e => {
        if (e.target.closest('.add-to-cart')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      const likeI = card.querySelector('.like i');
      likeI.addEventListener('click', e => {
        e.stopPropagation();
        const added = toggleWishlist(product);
        likeI.classList.replace(
          added ? 'ri-heart-line' : 'ri-heart-fill',
          added ? 'ri-heart-fill' : 'ri-heart-line',
        );
        likeI.style.color = added ? '#ef4444' : '';
        refreshBadges();
        if (added) showToast('heart', title);
      });

      card.querySelector('.btn-cart-icon').addEventListener('click', e => {
        e.stopPropagation();
        addToCart(product);
        refreshBadges();
        showToast('cart', title);
      });

      card.querySelector('.add-to-cart').addEventListener('click', e => {
        e.stopPropagation();
        addToCart(product);
        refreshBadges();
        showToast('cart', title);
      });
    });
  }

  fetchProducts();
});
