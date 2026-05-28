document.addEventListener('DOMContentLoaded', () => {
  
  const baseProducts = [
    {
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      price: '$109.95',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric...',
      price: '$22.30',
      image:
        'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: 'Mens Cotton Jacket',
      description:
        'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, casual daily wear...',
      price: '$55.99',
      image:
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: 'Mens Casual Slim Fit',
      description:
        'The color could be slightly different between on the screen and in practice. Please note that body builds vary by person...',
      price: '$15.99',
      image:
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: "John Hardy Women's Naga Gold Bracelet",
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl...",
      price: '$695.00',
      image:
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: 'Solid Gold Petite Micropave',
      description:
        'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and finely crafted silver jewelry...',
      price: '$168.00',
      image:
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: 'White Gold Plated Princess Engagement Ring',
      description:
        'Classic Created Wedding Engagement Ring for Women. Timeless and elegant design that catches the light beautifully...',
      price: '$9.99',
      image:
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=500&auto=format&fit=crop',
    },
    {
      title: 'Pierced Owl Rose Gold Plated Stainless Steel',
      description:
        'Rose Gold Plated Stainless Steel Double Flared Flesh Tunnel Plug Piercing Gauges earrings jewelry...',
      price: '$10.99',
      image:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop',
    },
  ];

  
  const finalProducts = [];
  for (let i = 0; i < 20; i++) {
    finalProducts.push({
      ...baseProducts[i % baseProducts.length],
      id: i + 1,
    });
  }

  
  const container = document.getElementById('products-container');

  if (container) {
    container.innerHTML = finalProducts
      .map(
        product => `
      <div class="card">
        <div class="images">
          <img src="${product.image}" alt="image">
          <div class="like">
            <i class="ri-heart-line"></i>
          </div>
          <div class="buttons">
            <button><i class="ri-eye-line"></i></button>
            <button><i class="ri-shopping-cart-2-line"></i></button>
          </div>
        </div>
        
        <div class="content">
          <h2 class="title">${product.title}</h2>
          <p class="description">${product.description}</p>
          <p class="price">${product.price}</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `,
      )
      .join('');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  if (!container) return;

  async function fetchProducts() {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products?limit=20',
      );
      if (!response.ok) throw new Error('Xatolik');
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error('Xatolik:', error);
      container.innerHTML = `
        <p style="color: #ef4444; text-align: center; width: 100%;">
          Mahsulotlarni yuklab bo'lmadi.
        </p>
      `;
    }
  }

  function renderProducts(productsList) {
    container.innerHTML = productsList
      .map(product => {
        const formattedPrice = product.price
          ? `$${product.price.toFixed(2)}`
          : '$0.00';

        return `
          <div class="card" data-id="${product.id}">
            <div class="images">
              <img src="${product.image}" alt="${product.title}">
              <div class="like">
                <i class="ri-heart-line"></i>
              </div>
              <div class="buttons">
                <button class="btn-eye"><i class="ri-eye-line"></i></button>
                <button class="btn-cart-icon"><i class="ri-shopping-cart-2-line"></i></button>
              </div>
            </div>
            <div class="content">
              <h2 class="title">${product.title}</h2>
              <p class="description">${product.description}</p>
              <p class="price">${formattedPrice}</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;
      })
      .join('');

    document.querySelectorAll('.card[data-id]').forEach(card => {
      const id = card.getAttribute('data-id');

      
      const imagesDiv = card.querySelector('.images');
      imagesDiv.addEventListener('click', e => {
        if (e.target.closest('.like') || e.target.closest('.buttons')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      
      const eyeBtn = card.querySelector(
        '.btn-eye, .buttons button:first-child',
      );
      eyeBtn.addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'singlepage.html?id=' + id;
      });

      
      const contentDiv = card.querySelector('.content');
      contentDiv.addEventListener('click', e => {
        if (e.target.closest('.add-to-cart')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });
    });
  }

  fetchProducts();
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  if (!container) return;

  
  const navHeartIcon = document.querySelector(
    '.nav-right .nav-icon:nth-child(2) a',
  );
  const navCartIcon = document.querySelector(
    '.nav-right .nav-icon:nth-child(3) a',
  );

  
  function createBadge(parentEl) {
    const badge = document.createElement('span');
    badge.className = 'nav-badge';
    badge.textContent = '0';
    badge.style.cssText = `
      position: absolute;
      top: -4px;
      right: -4px;
      background: #3b82f6;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      pointer-events: none;
    `;
    parentEl.style.position = 'relative';
    parentEl.appendChild(badge);
    return badge;
  }

  const heartBadge = createBadge(navHeartIcon);
  const cartBadge = createBadge(navCartIcon);

  let likeCount = 0;
  let cartCount = 0;

  function updateBadge(badge, count) {
    badge.textContent = count;
    badge.style.background = count > 0 ? '#3b82f6' : 'transparent';
    badge.style.color = count > 0 ? '#fff' : 'transparent';
  }

  async function fetchProducts() {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products?limit=20',
      );
      if (!response.ok) throw new Error('Xatolik');
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error('Xatolik:', error);
      container.innerHTML = `
        <p style="color: #ef4444; text-align: center; width: 100%;">
          Mahsulotlarni yuklab bo'lmadi.
        </p>
      `;
    }
  }

  function renderProducts(productsList) {
    container.innerHTML = productsList
      .map(product => {
        const formattedPrice = product.price
          ? `$${product.price.toFixed(2)}`
          : '$0.00';

        return `
          <div class="card" data-id="${product.id}">
            <div class="images">
              <img src="${product.image}" alt="${product.title}">
              <div class="like">
                <i class="ri-heart-line"></i>
              </div>
              <div class="buttons">
                <button class="btn-eye"><i class="ri-eye-line"></i></button>
                <button class="btn-cart-icon"><i class="ri-shopping-cart-2-line"></i></button>
              </div>
            </div>
            <div class="content">
              <h2 class="title">${product.title}</h2>
              <p class="description">${product.description}</p>
              <p class="price">${formattedPrice}</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;
      })
      .join('');

    document.querySelectorAll('.card[data-id]').forEach(card => {
      const id = card.getAttribute('data-id');

      
      const imagesDiv = card.querySelector('.images');
      imagesDiv.addEventListener('click', e => {
        if (e.target.closest('.like') || e.target.closest('.buttons')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      
      const eyeBtn = card.querySelector('.btn-eye');
      eyeBtn.addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'singlepage.html?id=' + id;
      });

      
      const contentDiv = card.querySelector('.content');
      contentDiv.addEventListener('click', e => {
        if (e.target.closest('.add-to-cart')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

     
      const likeBtn = card.querySelector('.like i');
      likeBtn.addEventListener('click', e => {
        e.stopPropagation();
        const isLiked = likeBtn.classList.contains('ri-heart-fill');
        if (isLiked) {
          likeBtn.classList.replace('ri-heart-fill', 'ri-heart-line');
          likeBtn.style.color = '';
          likeCount--;
        } else {
          likeBtn.classList.replace('ri-heart-line', 'ri-heart-fill');
          likeBtn.style.color = '#ef4444';
          likeCount++;
        }
        updateBadge(heartBadge, likeCount);
      });

     
      const cartIconBtn = card.querySelector('.btn-cart-icon');
      cartIconBtn.addEventListener('click', e => {
        e.stopPropagation();
        cartCount++;
        updateBadge(cartBadge, cartCount);
        animateCartBtn(cartIconBtn);
      });

     
      const addToCartBtn = card.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', e => {
        e.stopPropagation();
        cartCount++;
        updateBadge(cartBadge, cartCount);
        animateCartBtn(addToCartBtn);
      });
    });
  }

  
  function animateCartBtn(btn) {
    btn.style.transform = 'scale(0.92)';
    btn.style.transition = 'transform 0.1s';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }

  fetchProducts();
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  const searchInput = document.querySelector('.store-input');
  const searchBtn = document.querySelector('.search-btn');
  const filterBtn = document.querySelector('.filter-btn');
  if (!container) return;

  let allProducts = [];
  let activeCategory = 'all';

  // Navbar badges
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
  let likeCount = 0,
    cartCount = 0;

  function updateBadge(badge, count) {
    badge.textContent = count;
    badge.style.background = count > 0 ? '#3b82f6' : 'transparent';
    badge.style.color = count > 0 ? '#fff' : 'transparent';
  }

  // ===== SIDEBAR MODAL =====
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <style>
      #filter-sidebar::-webkit-scrollbar { width: 0; }

      #cat-select {
        width: 100%;
        background: #0d1626;
        border: 1px solid #1e293b;
        border-radius: 8px;
        padding: 13px 16px;
        font-size: 15px;
        color: #e2e8f0;
        font-family: inherit;
        cursor: pointer;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        transition: border-color 0.2s;
      }
      #cat-select:focus,
      #cat-select.selected {
        border-color: #3b82f6;
      }
      #cat-select option {
        background: #0d1626;
        color: #e2e8f0;
        padding: 10px;
      }
      #clear-filters-btn {
        background: transparent;
        border: 1px solid #334155;
        color: #e2e8f0;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s;
        align-self: flex-end;
      }
      #clear-filters-btn:hover {
        background: #1e293b;
        border-color: #475569;
      }
    </style>

    <div id="filter-overlay" style="
      display:none;position:fixed;inset:0;
      background:rgba(0,0,0,0.75);z-index:1000;
      justify-content:flex-end;
    ">
      <div id="filter-sidebar" style="
        background:#060e1c;
        width:100%;max-width:400px;
        height:100%;overflow-y:auto;
        padding:28px 24px;
        display:flex;flex-direction:column;gap:20px;
      ">

        <!-- Header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;">
          <div>
            <h2 style="font-size:20px;font-weight:700;color:#fff;">Filter Products</h2>
            <p style="font-size:13px;color:#64748b;margin-top:5px;">Narrow down products by applying filters</p>
          </div>
          <button id="close-filter" style="
            background:transparent;border:none;color:#64748b;
            font-size:18px;cursor:pointer;padding:4px;
            line-height:1;transition:color 0.2s;margin-top:2px;
          ">✕</button>
        </div>

        <!-- Category -->
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

        <!-- Clear Filters -->
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

  function openModal() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Hozirgi tanlangan kategoriyani ko'rsatish
    catSelect.value = activeCategory;
    catSelect.classList.toggle('selected', activeCategory !== 'all');
  }

  function closeModalFn() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  filterBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModalFn);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModalFn();
  });

  // Kategoriya o'zgarganida darhol filter qo'llanadi
  catSelect.addEventListener('change', () => {
    activeCategory = catSelect.value;
    catSelect.classList.toggle('selected', activeCategory !== 'all');
    filterBtn.style.background = activeCategory !== 'all' ? '#1e3a5f' : '';
    applyFilters();
  });

  // Clear filters
  clearBtn.addEventListener('click', () => {
    activeCategory = 'all';
    catSelect.value = 'all';
    catSelect.classList.remove('selected');
    filterBtn.style.background = '';
    applyFilters();
    closeModalFn();
  });

  // Qidirish
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

  function renderProducts(list, query = '') {
    if (!list.length) {
      container.innerHTML = `
        <div style="width:100%;text-align:center;padding:80px 0;">
          <i class="ri-search-line" style="font-size:52px;color:#1e293b;display:block;margin-bottom:16px;"></i>
          <p style="color:#64748b;font-size:16px;">
            ${
              query
                ? `"<strong style="color:#94a3b8">${query}</strong>" — mahsulot topilmadi`
                : 'Mahsulot topilmadi'
            }
          </p>
        </div>`;
      return;
    }

    container.innerHTML = list
      .map(
        p => `
      <div class="card" data-id="${p.id}">
        <div class="images">
          <img src="${p.image}" alt="${p.title}">
          <div class="like"><i class="ri-heart-line"></i></div>
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
    `,
      )
      .join('');

    document.querySelectorAll('.card[data-id]').forEach(card => {
      const id = card.getAttribute('data-id');

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
        const liked = likeI.classList.contains('ri-heart-fill');
        likeI.classList.replace(
          liked ? 'ri-heart-fill' : 'ri-heart-line',
          liked ? 'ri-heart-line' : 'ri-heart-fill',
        );
        likeI.style.color = liked ? '' : '#ef4444';
        likeCount += liked ? -1 : 1;
        updateBadge(heartBadge, likeCount);
      });

      card.querySelector('.btn-cart-icon').addEventListener('click', e => {
        e.stopPropagation();
        cartCount++;
        updateBadge(cartBadge, cartCount);
      });
      card.querySelector('.add-to-cart').addEventListener('click', e => {
        e.stopPropagation();
        cartCount++;
        updateBadge(cartBadge, cartCount);
      });
    });
  }

  fetchProducts();
});