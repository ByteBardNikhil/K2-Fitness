/* ===================================
   K2 FITNESS STUDIO - JAVASCRIPT
   Mobile-First Interactive Features
   =================================== */

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "auto";
});

// Close menu when clicking on a link
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// ===================================
// STICKY NAVBAR ON SCROLL
// ===================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow when scrolled
  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ===================================
// DARK/LIGHT MODE TOGGLE
// ===================================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// ===================================
// IMAGE CAROUSEL
// ===================================
const carouselTrack = document.getElementById("carouselTrack");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("carouselIndicators");

let currentSlide = 0;
const totalSlides = carouselSlides.length;

// Create indicators
for (let i = 0; i < totalSlides; i++) {
  const indicator = document.createElement("div");
  indicator.classList.add("carousel-indicator");
  if (i === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => goToSlide(i));
  indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll(".carousel-indicator");

// Update carousel position
function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

// Go to specific slide
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Event listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto-play carousel
let carouselInterval = setInterval(nextSlide, 5000);

// Pause on hover
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", () => clearInterval(carouselInterval));
carousel.addEventListener("mouseleave", () => {
  carouselInterval = setInterval(nextSlide, 5000);
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide();
  }
}

// ===================================
// TESTIMONIALS SLIDER
// ===================================
const testimonialsTrack = document.getElementById("testimonialsTrack");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testPrevBtn = document.getElementById("testPrev");
const testNextBtn = document.getElementById("testNext");

let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

// Update testimonials position
function updateTestimonials() {
  testimonialsTrack.style.transform = `translateX(-${
    currentTestimonial * 100
  }%)`;
}

// Next testimonial
function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  updateTestimonials();
}

// Previous testimonial
function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
  updateTestimonials();
}

// Event listeners
testNextBtn.addEventListener("click", nextTestimonial);
testPrevBtn.addEventListener("click", prevTestimonial);

// Auto-play testimonials
let testimonialInterval = setInterval(nextTestimonial, 6000);

// Pause on hover
const testimonialsSlider = document.querySelector(".testimonials-slider");
testimonialsSlider.addEventListener("mouseenter", () =>
  clearInterval(testimonialInterval)
);
testimonialsSlider.addEventListener("mouseleave", () => {
  testimonialInterval = setInterval(nextTestimonial, 6000);
});

// Touch/Swipe support for testimonials
let testTouchStartX = 0;
let testTouchEndX = 0;

testimonialsSlider.addEventListener("touchstart", (e) => {
  testTouchStartX = e.changedTouches[0].screenX;
});

testimonialsSlider.addEventListener("touchend", (e) => {
  testTouchEndX = e.changedTouches[0].screenX;
  handleTestimonialSwipe();
});

function handleTestimonialSwipe() {
  if (testTouchEndX < testTouchStartX - 50) {
    nextTestimonial();
  }
  if (testTouchEndX > testTouchStartX + 50) {
    prevTestimonial();
  }
}

// ===================================
// FAQ ACCORDION
// ===================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const revealElements = document.querySelectorAll(".reveal");

function reveal() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

// Reveal on scroll
window.addEventListener("scroll", reveal);

// Reveal on page load
window.addEventListener("load", reveal);

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// CONTACT FORM SUBMISSION
// ===================================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Basic validation
  if (name && phone && message) {
    // Show success message
    alert(
      `Thank you ${name}! We've received your message and will contact you soon at ${phone}.`
    );

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to a server
    console.log("Form Data:", { name, phone, message });
  } else {
    alert("Please fill in all fields!");
  }
});

// Phone number validation (India format)
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 10) {
    value = value.slice(0, 10);
  }
  e.target.value = value;
});

// ===================================
// ANIMATE NUMBERS ON SCROLL (Stats Section)
// ===================================
const statCards = document.querySelectorAll(".stat-card h3");
let hasAnimated = false;

function animateNumbers() {
  if (hasAnimated) return;

  const statsSection = document.querySelector(".hero-stats");
  const statsSectionTop = statsSection.getBoundingClientRect().top;

  if (statsSectionTop < window.innerHeight * 0.8) {
    hasAnimated = true;

    statCards.forEach((stat) => {
      const target = parseInt(stat.textContent);
      const increment = target / 50;
      let current = 0;

      const updateNumber = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + "+";
          clearInterval(updateNumber);
        } else {
          stat.textContent = Math.floor(current) + "+";
        }
      }, 30);
    });
  }
}

window.addEventListener("scroll", animateNumbers);
window.addEventListener("load", animateNumbers);

// ===================================
// WHATSAPP BUTTON - UPDATE WITH YOUR NUMBER
// ===================================
const whatsappButton = document.querySelector(".whatsapp-float");
// Update the href in HTML with your actual WhatsApp number
// Format: https://wa.me/919876543210 (country code + number, no spaces or special characters)

// ===================================
// LAZY LOADING IMAGES
// ===================================
const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});

images.forEach((img) => {
  imageObserver.observe(img);
});

// ===================================
// PRICING CARDS HOVER EFFECT
// ===================================
const pricingCards = document.querySelectorAll(".pricing-card");

pricingCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ===================================
// SERVICE CARDS ANIMATION
// ===================================
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
window.addEventListener(
  "scroll",
  debounce(() => {
    reveal();
    animateNumbers();
  }, 10)
);

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger initial animations
  setTimeout(() => {
    reveal();
  }, 100);
});

// ===================================
// PREVENT CONTEXT MENU ON IMAGES (Optional)
// ===================================
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (e) => {
    // Uncomment the line below to prevent right-click on images
    // e.preventDefault();
  });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll("section[id]");

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = "var(--primary-color)";
      } else {
        navLink.style.color = "";
      }
    }
  });
}

window.addEventListener("scroll", debounce(highlightNavLink, 10));

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log(
  "%c🏋️ K2 FITNESS STUDIO 🏋️",
  "font-size: 20px; font-weight: bold; color: #ff4757;"
);
console.log("%cWebsite developed with ❤️", "font-size: 14px; color: #2ed573;");
console.log(
  "%cFor similar website development, contact the developer!",
  "font-size: 12px; color: #ffa502;"
);

// ===================================
// END OF SCRIPT
// ===================================
