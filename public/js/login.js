document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value
    };
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const msg = await res.text();
    alert(msg);
    if (msg === 'Login successful') {
      window.location.href = '/';
    }
  });
  