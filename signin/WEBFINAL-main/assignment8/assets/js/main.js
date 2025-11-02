// ===== SIGN UP =====
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = { name, email, phone, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful!');
    window.location.href = 'login.html';
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorDiv = document.getElementById('loginError');

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      errorDiv.textContent = 'No account found. Please sign up first.';
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'profile.html';
    } else {
      errorDiv.textContent = 'Incorrect email or password.';
    }
  });
}

// ===== PROFILE =====
const profileName = document.getElementById('profileName');
if (profileName) {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const loggedIn = localStorage.getItem('isLoggedIn');

  if (!storedUser || loggedIn !== 'true') {
    window.location.href = 'login.html';
  } else {
    document.getElementById('profileName').textContent = storedUser.name;
    document.getElementById('profileEmail').textContent = storedUser.email;
    document.getElementById('profilePhone').textContent = storedUser.phone;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'login.html';
    });
  }
}
