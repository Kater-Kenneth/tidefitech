document.addEventListener("DOMContentLoaded", () => {

  const scriptURL = "https://script.google.com/macros/s/AKfycbwMycAXQAoXzDzKYUD-k-ipUZM9tPgQ1BPu_wCdomsKI1uETF-wekHF5UEmM97jo6rHNA/exec";

  const forms = document.querySelectorAll(".newsletter-form");

  forms.forEach(form => {

    const button = form.querySelector("button");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      button.disabled = true;
      button.innerText = "Submitting...";

      try {
        await fetch(scriptURL, {
          method: "POST",
          body: formData
        });

        showToast("✅ Successfully subscribed!");

        form.reset();

      } catch (error) {
        showToast("❌ Something went wrong.");
      } finally {
        button.disabled = false;
        button.innerHTML = `SUBSCRIBE NOW <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>`;
      }
    });
  });

  // Global floating notification (no layout break)
  function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "fixed top-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg shadow-lg z-50 opacity-0 transition-opacity duration-300";

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

});