// public/js/main.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form[action='/contact']");
    if (!form) return;
  
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };
  
      try {
        const res = await fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
  
        if (!res.ok) throw new Error(res.statusText);
        // show feedback
        form.innerHTML = `
          <h3>Thanks, ${data.name}!</h3>
          <p>Your message has been sent. We’ll be in touch shortly.</p>
        `;
      } catch (err) {
        console.error(err);
        alert("Oops—couldn’t send your message. Please try again later.");
      }
    });
  });
  