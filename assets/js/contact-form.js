const form = document.getElementById("contactForm");

if (form) {
  const status = document.getElementById("contactFormStatus");
  const button = form.querySelector('button[type="submit"]');
  const originalButtonText = button ? button.innerText : "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    if (button) {
      button.innerText = "Sending...";
      button.disabled = true;
    }

    if (status) {
      status.classList.add("hidden");
      status.textContent = "";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      form.reset();

      if (status) {
        status.textContent = "Thank you. Your message has been sent.";
        status.classList.remove("hidden", "bg-error-container");
        status.classList.add("bg-primary-fixed", "text-on-primary-fixed");
      }
    } catch (error) {
      if (status) {
        status.textContent =
          "Sorry, your message could not be sent right now. Please try again.";
        status.classList.remove("hidden", "bg-primary-fixed");
        status.classList.add("bg-error-container", "text-on-error-container");
      }
    } finally {
      if (button) {
        button.innerText = originalButtonText;
        button.disabled = false;
      }
    }
  });
}
