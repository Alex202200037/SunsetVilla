document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting script...");
  
 // Language switching functionality
const dropdownToggle = document.querySelector('.lang-btn.dropdown-toggle');
const langDropdown = document.querySelector('.lang-dropdown');
const langButtons = document.querySelectorAll('.lang-dropdown .lang-btn');
let currentLang = 'en';

function changeLanguage(lang) {
  currentLang = lang;

  // Update active button in dropdown
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update the toggle button to show only the flag
  const selectedBtn = document.querySelector(`.lang-dropdown .lang-btn[data-lang="${lang}"]`);
  if (selectedBtn) dropdownToggle.textContent = selectedBtn.textContent.split(' ')[0]; // só a bandeira

  // Update all translatable elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.dataset.translatePlaceholder;
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  // Update aria-labels
  document.querySelectorAll('[data-translate-aria]').forEach(element => {
    const key = element.dataset.translateAria;
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute('aria-label', translations[lang][key]);
    }
  });
}

// Toggle dropdown visibility
if (dropdownToggle && langDropdown) {
  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // evita fechar imediatamente
    const isOpen = !langDropdown.hidden;
    langDropdown.hidden = isOpen;
    dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', () => {
    langDropdown.hidden = true;
    dropdownToggle.setAttribute('aria-expanded', 'false');
  });
}

// Add event listeners to language buttons inside dropdown
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    changeLanguage(btn.dataset.lang);
    langDropdown.hidden = true; // fecha o dropdown depois da escolha
    dropdownToggle.setAttribute('aria-expanded', 'false');
  });
});


const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}


  // Lazy-load images with data-src
  const lazyImages = document.querySelectorAll("img.lazy");
  if (IntersectionObserver && lazyImages.length) {
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
            img.classList.remove("lazy");
          }
          io.unobserve(img);
        }
      }
    }, { rootMargin: "200px 0px" });
    lazyImages.forEach(img => io.observe(img));
  } else {
    lazyImages.forEach(img => {
      const src = img.getAttribute("data-src");
      if (src) img.src = src;
    });
  }

  // Lightbox for gallery - more robust implementation
  let lightbox, lightboxImg, closeBtn, prevBtn, nextBtn;
  let currentImageIndex = 0;
  let galleryItems = [];

  function initLightbox() {
    lightbox = document.getElementById("lightbox");
    lightboxImg = document.querySelector(".lightbox-img");
    closeBtn = document.querySelector(".lightbox-close");
    prevBtn = document.querySelector(".lightbox-prev");
    nextBtn = document.querySelector(".lightbox-next");
    galleryItems = document.querySelectorAll("[data-lightbox]");

    console.log("Lightbox elements:", { lightbox, lightboxImg, closeBtn, prevBtn, nextBtn, galleryItems: galleryItems.length });
    
    if (galleryItems.length > 0) {
      galleryItems.forEach((item, index) => {
        console.log(`Gallery item ${index}:`, item.href, item.querySelector('img')?.alt);
      });
    }

    // Add event listeners
    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Prev clicked, current index:", currentImageIndex);
        showImage(currentImageIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Next clicked, current index:", currentImageIndex);
        showImage(currentImageIndex + 1);
      });
    }

    if (lightbox) {
      lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
      });
    }
  }

  function showImage(index) {
    if (!galleryItems.length) return;
    
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    
    currentImageIndex = index;
    const href = galleryItems[index].getAttribute("href");
    if (href && lightboxImg) {
      lightboxImg.src = href;
      lightboxImg.alt = galleryItems[index].querySelector("img").alt;
    }
  }

  // Add click events to gallery items
  document.querySelectorAll("[data-lightbox]").forEach((el, index) => {
    el.addEventListener("click", e => {
      e.preventDefault();
      currentImageIndex = index;
      const href = el.getAttribute("href");
      if (href && lightbox && lightboxImg) {
        lightboxImg.src = href;
        lightboxImg.alt = el.querySelector("img").alt;
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  // Initialize lightbox
  console.log("About to initialize lightbox...");
  initLightbox();
  console.log("Lightbox initialization complete");

  document.addEventListener("keydown", e => {
    if (lightbox && !lightbox.hidden) {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showImage(currentImageIndex - 1);
      } else if (e.key === "ArrowRight") {
        showImage(currentImageIndex + 1);
      }
    }
  });

  // Contact form progressive enhancement
emailjs.init("BYH64d9zWi5GHc0nW"); // substitui pelo teu User ID

const form = document.getElementById("contact-form");
const status = document.querySelector(".form-status");

form.addEventListener("submit", function(e){
  e.preventDefault();
  status.hidden = false;
  status.textContent = "A enviar...";

      // Prepara os dados do form
      const templateParams = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        checkin: form.checkin.value,
        checkout: form.checkout.value,
        guests: form.guests.value,
        message: form.message.value,
      };

  // envia email para ti
  emailjs.sendForm('service_1xt3f3n', 'template_01dzeqh', form)
    .then(() => {
      // envia email de confirmação para o cliente
      emailjs.sendForm('service_1xt3f3n', 'template_07huefb', form)
        .then(() => {
          status.textContent = "Obrigado! Recebemos o seu contacto e enviaremos detalhes em breve.";
          form.reset();
        }, (err) => {
          status.textContent = "Erro ao enviar confirmação para o cliente, mas o email chegou até nós.";
        });
    }, (err) => {
      status.textContent = "Ocorreu um erro. Por favor tente novamente.";
    });
}); 
});