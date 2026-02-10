document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value
    };
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const msg = await res.text();
    alert(msg);
    if (msg === 'Signup successful') {
      window.location.href = '/auth/login';
    }
  });
  