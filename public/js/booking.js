// public/js/booking.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.booking-form');
    if (!form) return;
  
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      // data.date is like "2025-05-05"
  
      const payload = {
        clientName:    data.clientName,
        email:   data.email,
        date:    data.date,
        service: data.service
      };
  
      try {
        const res = await fetch('/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const msg = await res.text();
        alert(msg);
        if (res.ok) form.reset();
      } catch (err) {
        console.error(err);
        alert('Network error');
      }
    });
  });
  