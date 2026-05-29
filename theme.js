(function () {
  // Sahifa yuklanishi bilanoq theme qo'llansin (flicker bo'lmasin)
  const saved = localStorage.getItem('theme') || 'system';
  const resolved =
    saved === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : saved;

  if (resolved === 'light') {
    document.documentElement.style.setProperty('--body-bg', '#f1f5f9');
    document.documentElement.style.setProperty('--body-color', '#0f172a');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const sunBtn = document.querySelector('.nav-right .nav-icon:nth-child(1) a');
  if (!sunBtn) return;

  // Dropdown
  const dropdown = document.createElement('div');
  dropdown.style.cssText = `
    display:none; position:absolute; top:calc(100% + 8px); right:0;
    background:#0d1626; border:1px solid #1e293b; border-radius:10px;
    overflow:hidden; z-index:500; min-width:130px;
    box-shadow:0 8px 24px rgba(0,0,0,0.4);
  `;
  dropdown.innerHTML = ['Light', 'Dark', 'System']
    .map(
      l => `
    <div class="theme-option" data-theme="${l.toLowerCase()}" style="
      padding:11px 16px; font-size:14px; color:#e2e8f0;
      cursor:pointer; transition:background 0.15s; font-family:inherit;
    ">${l}</div>
  `,
    )
    .join('');

  const iconWrapper = sunBtn.parentElement;
  iconWrapper.style.position = 'relative';
  iconWrapper.appendChild(dropdown);

  let isOpen = false;

  sunBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    isOpen = !isOpen;
    dropdown.style.display = isOpen ? 'block' : 'none';
  });
  document.addEventListener('click', () => {
    isOpen = false;
    dropdown.style.display = 'none';
  });
  dropdown.addEventListener('click', e => e.stopPropagation());

  dropdown.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('mouseover', () => {
      if (!opt.classList.contains('active')) opt.style.background = '#1e293b';
    });
    opt.addEventListener('mouseout', () => {
      if (!opt.classList.contains('active')) opt.style.background = '';
    });
  });

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function updateNavIcon(resolved) {
    const icon = sunBtn.querySelector('i');
    icon.className = resolved === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }

  function applyTheme(theme) {
    const resolved = theme === 'system' ? getSystemTheme() : theme;

    if (resolved === 'light') {
      document.body.style.background = '#f1f5f9';
      document.body.style.color = '#0f172a';

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.background = 'rgba(248,250,252,0.95)';
        navbar.style.borderColor = '#e2e8f0';
      }
      // Navbar matnlari
      document
        .querySelectorAll('.navbar .logo a, .navbar .nav-item a')
        .forEach(el => (el.style.color = '#0f172a'));
      document
        .querySelectorAll('.navbar .nav-icon a, .navbar .login-btn')
        .forEach(el => (el.style.color = '#0f172a'));
      document
        .querySelectorAll('.navbar .hamburger-menu')
        .forEach(el => (el.style.color = '#0f172a'));

      document.querySelectorAll('.card').forEach(c => {
        c.style.background = '#fff';
        c.style.borderColor = '#e2e8f0';
      });
      document
        .querySelectorAll(
          '.title, .cart-item-name, .wl-card-name, .detail-title',
        )
        .forEach(t => (t.style.color = '#0f172a'));
      document
        .querySelectorAll('.price, .detail-price, .cart-item-total')
        .forEach(p => (p.style.color = '#0f172a'));
      document
        .querySelectorAll('.order-summary, .login-card, .wl-card')
        .forEach(el => {
          el.style.background = '#ffffff';
          el.style.borderColor = '#e2e8f0';
        });

      // Footer
      const footer = document.querySelector('.main-footer');
      if (footer) {
        footer.style.background = '#e2e8f0';
        footer.style.borderColor = '#cbd5e1';
      }
      document
        .querySelectorAll('.footer-title')
        .forEach(el => (el.style.color = '#0f172a'));
      document
        .querySelectorAll(
          '.footer-text, .footer-contact li span, .footer-contact li i',
        )
        .forEach(el => (el.style.color = '#475569'));
      document
        .querySelectorAll(
          '.footer-links a, .footer-socials a, .bottom-links a, .copyright',
        )
        .forEach(el => (el.style.color = '#475569'));
    } else {
      document.body.style.background = '#020817';
      document.body.style.color = '#ffffff';

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.background = '';
        navbar.style.borderColor = '';
      }
      // Navbar matnlarini qaytarish
      document
        .querySelectorAll('.navbar .logo a')
        .forEach(el => (el.style.color = '#fff'));
      document
        .querySelectorAll('.navbar .nav-item a, .navbar .nav-icon a')
        .forEach(el => (el.style.color = ''));
      document
        .querySelectorAll('.navbar .login-btn')
        .forEach(el => (el.style.color = '#fff'));
      document
        .querySelectorAll('.navbar .hamburger-menu')
        .forEach(el => (el.style.color = '#fff'));

      document.querySelectorAll('.card').forEach(c => {
        c.style.background = '';
        c.style.borderColor = '';
      });
      document
        .querySelectorAll(
          '.title, .cart-item-name, .wl-card-name, .detail-title',
        )
        .forEach(t => (t.style.color = ''));
      document
        .querySelectorAll('.price, .detail-price, .cart-item-total')
        .forEach(p => (p.style.color = ''));
      document
        .querySelectorAll('.order-summary, .login-card, .wl-card')
        .forEach(el => {
          el.style.background = '';
          el.style.borderColor = '';
        });

      // Footer
      const footerD = document.querySelector('.main-footer');
      if (footerD) {
        footerD.style.background = '';
        footerD.style.borderColor = '';
      }
      document
        .querySelectorAll('.footer-title')
        .forEach(el => (el.style.color = ''));
      document
        .querySelectorAll(
          '.footer-text, .footer-contact li span, .footer-contact li i',
        )
        .forEach(el => (el.style.color = ''));
      document
        .querySelectorAll(
          '.footer-links a, .footer-socials a, .bottom-links a, .copyright',
        )
        .forEach(el => (el.style.color = ''));
    }
    updateNavIcon(resolved);
  }

  function setActive(value) {
    dropdown.querySelectorAll('.theme-option').forEach(opt => {
      const isActive = opt.dataset.theme === value;
      opt.classList.toggle('active', isActive);
      opt.style.background = isActive ? '#1e3a5f' : '';
      opt.style.color = isActive ? '#60a5fa' : '#e2e8f0';
    });
  }

  const saved = localStorage.getItem('theme') || 'system';
  setActive(saved);
  applyTheme(saved);

  dropdown.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const val = opt.dataset.theme;
      localStorage.setItem('theme', val);
      setActive(val);
      applyTheme(val);
      dropdown.style.display = 'none';
      isOpen = false;
    });
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });
});
