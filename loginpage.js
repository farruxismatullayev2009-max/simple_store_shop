document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const loginBtn = document.getElementById('login-btn');
  const togglePassword = document.getElementById('toggle-password');

  // Password ko'rsatish/yashirish
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.querySelector('i').className = isPassword
      ? 'ri-eye-line'
      : 'ri-eye-off-line';
  });

  // Validatsiya
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    emailError.textContent = '';
    passwordError.textContent = '';
    emailInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
  }

  // Login tugmasi
  loginBtn.addEventListener('click', () => {
    clearErrors();
    let valid = true;

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Email is required.';
      emailInput.style.borderColor = '#ef4444';
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email.';
      emailInput.style.borderColor = '#ef4444';
      valid = false;
    }

    if (!passwordInput.value) {
      passwordError.textContent = 'Password is required.';
      passwordInput.style.borderColor = '#ef4444';
      valid = false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      passwordInput.style.borderColor = '#ef4444';
      valid = false;
    }

    if (valid) {
      loginBtn.textContent = 'Logging in...';
      loginBtn.disabled = true;
      loginBtn.style.opacity = '0.7';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  });

  // Enter bosilganda ham ishlaydi
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') loginBtn.click();
    });
  });
});
