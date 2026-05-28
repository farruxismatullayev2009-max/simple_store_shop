document.addEventListener('DOMContentLoaded', () => {
  const sunBtn = document.querySelector('.nav-right .nav-icon:nth-child(1) a');
  if (!sunBtn) return;

  const dropdown = document.createElement('div');
  dropdown.id = 'theme-dropdown';
  dropdown.style.cssText = `
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #020817;
    border: 1px solid #1e293b;
    border-radius: 5px;
    overflow: hidden;
    z-index: 500;
    min-width: 130px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  `;

  dropdown.innerHTML = ['Light', 'Dark', 'System']
    .map(
      label => `
    <div class="theme-option" data-theme="${label.toLowerCase()}" style="
      padding: 11px 16px;
      font-size: 14px;
      color: #e2e8f0;
      cursor: pointer;
      transition: background 0.15s;
      font-family: inherit;
    ">${label}</div>
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

  function updateNavIcon(resolvedTheme) {
    const icon = sunBtn.querySelector('i');
    // Qoq fonda — quyosh, oq fonda — oy
    icon.className = resolvedTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }

  function applyTheme(theme) {
    const resolved = theme === 'system' ? getSystemTheme() : theme;

    if (resolved === 'light') {
      document.body.style.background = '#f1f5f9';
      document.body.style.color = '#0f172a';
      document.querySelector('.navbar').style.background =
        'rgba(248,250,252,0.9)';
      document.querySelector('.navbar').style.borderColor = '#e2e8f0';
      document.querySelectorAll('.card').forEach(c => {
        c.style.background = '#ffffff';
        c.style.borderColor = '#e2e8f0';
      });
      document
        .querySelectorAll('.title')
        .forEach(t => (t.style.color = '#0f172a'));
      document
        .querySelectorAll('.price')
        .forEach(p => (p.style.color = '#0f172a'));
    } else {
      document.body.style.background = '#020817';
      document.body.style.color = '#ffffff';
      document.querySelector('.navbar').style.background = '';
      document.querySelector('.navbar').style.borderColor = '';
      document.querySelectorAll('.card').forEach(c => {
        c.style.background = '';
        c.style.borderColor = '';
      });
      document.querySelectorAll('.title').forEach(t => (t.style.color = ''));
      document.querySelectorAll('.price').forEach(p => (p.style.color = ''));
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
