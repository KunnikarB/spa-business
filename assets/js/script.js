
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
};

addEventOnElem(navTogglers, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove('active');
};

addEventOnElem(navLinks, 'click', closeNavbar);

/**
 * header & back top btn active
 */

const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 100) {
    header.classList.add('active');
    backTopBtn.classList.add('active');
  } else {
    header.classList.remove('active');
    backTopBtn.classList.remove('active');
  }
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();
year.setAttribute('datetime', thisYear);
year.textContent = thisYear;


// Switch En/Sv

  document.addEventListener('DOMContentLoaded', function () {
    const langEnLink = document.getElementById('lang-en');
    const langSvLink = document.getElementById('lang-sv');

    const pageMap = {
      'index.html': 'index.html',
      'about.html': 'om-oss.html',
      'contact.html': 'kontakt.html',
      'treatments.html': 'behandlingar.html',
      'fitness.html': 'fitness.html',
      'wellness.html': 'valbefinnande.html'
    };

    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const currentLang = pathParts[1];
    const currentPage = pathParts[2] || 'index.html';

    function getTranslatedPage(targetLang) {
      if (targetLang === 'en') {
        const enPage = Object.keys(pageMap).find(
          (key) => pageMap[key] === currentPage
        );
        return `/${targetLang}/${enPage || 'index.html'}`;
      } else {
        const svPage = pageMap[currentPage] || 'index.html';
        return `/${targetLang}/${svPage}`;
      }
    }

    langEnLink?.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = getTranslatedPage('en');
    });

    langSvLink?.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = getTranslatedPage('sv');
    });
  });

  // Reviews

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".review");
const dotsContainer = document.querySelector(".dots");
let dots = [];

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let interval;

// Move slider
function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// Next / Prev
function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
}

// Auto
function startAuto() {
  interval = setInterval(nextSlide, 30000); // faster feels better for slider
}

function stopAuto() {
  clearInterval(interval);
}

// Drag start
function startDrag(x) {
  isDragging = true;
  startX = x;
  stopAuto();
  track.style.transition = "none";
}

// Drag move (REAL movement 🔥)
function moveDrag(x) {
  if (!isDragging) return;

  currentX = x;
  let diff = currentX - startX;

  track.style.transform = `translateX(calc(-${index * 100}% + ${diff}px))`;
}

// Drag end (snap)
function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  let diff = currentX - startX;

  if (diff < -50) nextSlide();
  else if (diff > 50) prevSlide();

  track.style.transition = "transform 0.4s ease";
  updateSlide();
  startAuto();
}

// Events
const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", e => startDrag(e.touches[0].clientX));
slider.addEventListener("touchmove", e => moveDrag(e.touches[0].clientX));
slider.addEventListener("touchend", endDrag);

slider.addEventListener("mousedown", e => startDrag(e.clientX));
slider.addEventListener("mousemove", e => moveDrag(e.clientX));
slider.addEventListener("mouseup", endDrag);
slider.addEventListener("mouseleave", endDrag);

// Dots dynamically
function createDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.addEventListener("click", () => {
      index = i;
      updateSlide();
      updateDots();
      stopAuto();
      startAuto();
    });

    dotsContainer.appendChild(dot);
    dots.push(dot);
  });
}

// Update active dot
function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  createDots();
  updateSlide();
  startAuto();
});
