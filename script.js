const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const menuOverlay = document.getElementById("menuOverlay"); 
const menuLinks = document.querySelectorAll(".nav-menu a");

function toggleMenu() {
  navMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
}

function closeMenu() {
  navMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
}

menuToggle.addEventListener("click", (event) => {
  toggleMenu();
  event.stopPropagation();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

menuOverlay.addEventListener("click", () => {
  closeMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".step-card");
  const points = document.querySelectorAll(".point");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const stepNumber = card.getAttribute("data-step");

      const correspondingPoint = document.querySelector(
        `.point[data-step="${stepNumber}"]`,
      );
      if (correspondingPoint) {
        correspondingPoint.classList.add("active");
      }
    });

    card.addEventListener("mouseleave", () => {
      const stepNumber = card.getAttribute("data-step");

      const correspondingPoint = document.querySelector(
        `.point[data-step="${stepNumber}"]`,
      );
      if (correspondingPoint) {
        correspondingPoint.classList.remove("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.15,
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(
    revealCallback,
    observerOptions,
  );

  const elementsToAnimate = document.querySelectorAll(
    ".tarjeta, .step-card, #envios h1, #envios h3",
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("reveal-hidden");
    revealObserver.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contacto form");
  const popup = document.getElementById("customPopup");
  const closePopupBtn = document.getElementById("closePopup");

  if (form && popup && closePopupBtn) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      popup.classList.add("show");

      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Formulario enviado con éxito");
            form.reset();
          } else {
            console.error("Hubo un problema con el envío");
          }
        })
        .catch((error) => {
          console.error("Error de red:", error);
        });
    });

    closePopupBtn.addEventListener("click", () => {
  popup.classList.remove("show");
  
  if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    window.location.href = "http://127.0.0.1:5500/";
  } else {
    window.location.href = window.location.origin + window.location.pathname;
  }
});
});
