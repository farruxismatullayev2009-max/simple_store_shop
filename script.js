document.addEventListener('DOMContentLoaded', () => {
  // 1. Har xil turdagi mahsulotlar bazasi (Rasmga mos: sumka, kiyimlar, uzuklar)
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

  // 2. Takrorlanish orqali ro'yxatni roppa-rosa 20 taga yetkazamiz
  const finalProducts = [];
  for (let i = 0; i < 20; i++) {
    finalProducts.push({
      ...baseProducts[i % baseProducts.length],
      id: i + 1,
    });
  }

  // 3. HTML elementini topib, ichini kartalar bilan to'ldiramiz
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

      // .images qismiga click
      const imagesDiv = card.querySelector('.images');
      imagesDiv.addEventListener('click', e => {
        if (e.target.closest('.like') || e.target.closest('.buttons')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      // Ko'z tugmasi — singlepage ga o'tadi
      const eyeBtn = card.querySelector(
        '.btn-eye, .buttons button:first-child',
      );
      eyeBtn.addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'singlepage.html?id=' + id;
      });

      // .content qismiga click
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

  // Navbar counter elementlarini topish
  const navHeartIcon = document.querySelector(
    '.nav-right .nav-icon:nth-child(2) a',
  );
  const navCartIcon = document.querySelector(
    '.nav-right .nav-icon:nth-child(3) a',
  );

  // Counter badge yaratish
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

      // Rasm qismiga click — singlepage ga o'tadi
      const imagesDiv = card.querySelector('.images');
      imagesDiv.addEventListener('click', e => {
        if (e.target.closest('.like') || e.target.closest('.buttons')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      // Ko'z tugmasi — singlepage ga o'tadi
      const eyeBtn = card.querySelector('.btn-eye');
      eyeBtn.addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'singlepage.html?id=' + id;
      });

      // Content qismiga click — singlepage ga o'tadi
      const contentDiv = card.querySelector('.content');
      contentDiv.addEventListener('click', e => {
        if (e.target.closest('.add-to-cart')) return;
        window.location.href = 'singlepage.html?id=' + id;
      });

      // Like tugmasi
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

      // Savatcha tugmasi (karta ichidagi kichik)
      const cartIconBtn = card.querySelector('.btn-cart-icon');
      cartIconBtn.addEventListener('click', e => {
        e.stopPropagation();
        cartCount++;
        updateBadge(cartBadge, cartCount);
        animateCartBtn(cartIconBtn);
      });

      // Add to Cart tugmasi
      const addToCartBtn = card.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', e => {
        e.stopPropagation();
        cartCount++;
        updateBadge(cartBadge, cartCount);
        animateCartBtn(addToCartBtn);
      });
    });
  }

  // Tugmaga qisqa animatsiya
  function animateCartBtn(btn) {
    btn.style.transform = 'scale(0.92)';
    btn.style.transition = 'transform 0.1s';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }

  fetchProducts();
});