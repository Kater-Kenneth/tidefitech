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

// newsletter.js
// ===== NEWSLETTER (TECH FORM ONLY) =====
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("techForm");
  if (!form) return; // Prevent conflict with other forms

  const scriptURL = "https://script.google.com/macros/s/AKfycbxSmof5rdEaRwT1B6shZf1q5oUu4Id7YZQfvMljJFImmGAwQWG9-71mN6Mdg9wi94TK/exec";

  const submitBtn = form.querySelector("button[type='submit']");

  // Create notification container once
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.top = "-60px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.backgroundColor = "#28a745";
  notification.style.color = "#fff";
  notification.style.padding = "15px 25px";
  notification.style.borderRadius = "8px";
  notification.style.fontSize = "15px";
  notification.style.fontWeight = "600";
  notification.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  notification.style.zIndex = "9999";
  notification.style.transition = "top 0.4s ease";
  document.body.appendChild(notification);

  function showNotification(message, success = true) {
    notification.innerText = message;
    notification.style.backgroundColor = success ? "#28a745" : "#dc3545";
    notification.style.top = "20px";

    setTimeout(() => {
      notification.style.top = "-60px";
    }, 3000);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.status === "success") {
        showNotification("✅ Registration Successful!", true);
        form.reset();
      } else {
        showNotification("❌ Submission failed.", false);
      }

    } catch (error) {
      console.error(error);
      showNotification("❌ Something went wrong.", false);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = `REGISTER FOR WORKSHOP <i class="fas fa-arrow-right ml-2"></i>`;
  });

});