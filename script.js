const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const menuOverlay = document.getElementById("menuOverlay"); // Capturamos la capa
const menuLinks = document.querySelectorAll(".nav-menu a");

// Función auxiliar para abrir/cerrar todo junto
function toggleMenu() {
  navMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
}

// Función auxiliar para cerrar todo
function closeMenu() {
  navMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
}

// Al hacer clic en el botón de hamburguesa
menuToggle.addEventListener("click", (event) => {
  toggleMenu();
  event.stopPropagation();
});

// Al hacer clic en los enlaces del menú
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// ¡Mucho más simple! Si clican en la capa protectora, se cierra el menú
menuOverlay.addEventListener("click", () => {
  closeMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".step-card");
  const points = document.querySelectorAll(".point");

  cards.forEach((card) => {
    // Cuando el mouse entra a la tarjeta
    card.addEventListener("mouseenter", () => {
      const stepNumber = card.getAttribute("data-step");

      // Buscamos el punto que tenga el mismo data-step y le sumamos la clase active
      const correspondingPoint = document.querySelector(
        `.point[data-step="${stepNumber}"]`,
      );
      if (correspondingPoint) {
        correspondingPoint.classList.add("active");
      }
    });

    // Cuando el mouse sale de la tarjeta
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

      const nextInput = form.querySelector('input[name="_next"]');
      if (nextInput && nextInput.value) {
        window.location.href = nextInput.value;
      }
    });
  }
});
