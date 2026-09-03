'use strict';

/**
 * Helper: add event listener to one or multiple elements
 */
const addEventOnElem = function (elem, type, callback) {
  if (!elem) return;

  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * NAVBAR TOGGLE
 */
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const toggleNavbar = function () {
  if (navbar) {
    navbar.classList.toggle('active');
  }
};

addEventOnElem(navTogglers, 'click', toggleNavbar);

const closeNavbar = function () {
  if (navbar) {
    navbar.classList.remove('active');
  }
};

addEventOnElem(navLinks, 'click', closeNavbar);

/**
 * HEADER & BACK TO TOP BUTTON
 */
const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 100) {
    if (header) {
      header.classList.add('active');
    }

    if (backTopBtn) {
      backTopBtn.classList.add('active');
    }
  } else {
    if (header) {
      header.classList.remove('active');
    }

    if (backTopBtn) {
      backTopBtn.classList.remove('active');
    }
  }
});

/**
 * CURRENT YEAR
 */
const year = document.getElementById('year');

if (year) {
  const thisYear = new Date().getFullYear();
  year.setAttribute('datetime', thisYear);
  year.textContent = thisYear;
}

/**
 * ENGLISH / SWEDISH LANGUAGE SWITCHER
 *
 * English:
 * /                  = homepage
 * /en/about         = About
 * /en/contact       = Contact
 * /en/treatments    = Treatments
 * /en/fitness        = F.I.T
 * /en/wellness       = Wellness
 *
 * Swedish:
 * /sv/              = homepage
 * /sv/om-oss        = About
 * /sv/kontakt       = Contact
 * /sv/behandlingar  = Treatments
 * /sv/fitness        = F.I.T
 * /sv/valbefinnande  = Wellness
 */
document.addEventListener('DOMContentLoaded', function () {
  const langEnLink = document.getElementById('lang-en');
  const langSvLink = document.getElementById('lang-sv');

  /**
   * Page names shared between English and Swedish
   */
  const pageMap = {
    index: {
      en: '/',
      sv: '/sv/',
    },

    about: {
      en: '/en/about',
      sv: '/sv/om-oss',
    },

    contact: {
      en: '/en/contact',
      sv: '/sv/kontakt',
    },

    treatments: {
      en: '/en/treatments',
      sv: '/sv/behandlingar',
    },

    fitness: {
      en: '/en/fitness',
      sv: '/sv/fitness',
    },

    wellness: {
      en: '/en/wellness',
      sv: '/sv/valbefinnande',
    },
  };

  /**
   * Convert current URL into a simple page key.
   *
   * Examples:
   *
   * /
   * /en/
   * /en/index.html
   * /sv/
   * /sv/index.html
   *
   * all become:
   * index
   *
   * /en/about
   * /en/about.html
   * become:
   * about
   *
   * /sv/om-oss
   * /sv/om-oss.html
   * become:
   * about
   */
  function getCurrentPageKey() {
    let path = window.location.pathname;

    // Remove trailing slash
    path = path.replace(/\/$/, '');

    // Homepage
    if (
      path === '' ||
      path === '/' ||
      path === '/en' ||
      path === '/en/index.html' ||
      path === '/sv' ||
      path === '/sv/index.html'
    ) {
      return 'index';
    }

    // Remove language folder
    path = path.replace(/^\/en\//, '');
    path = path.replace(/^\/sv\//, '');

    // Remove .html if someone visits the old URL
    path = path.replace(/\.html$/, '');

    /**
     * Swedish → English page names
     */
    const swedishToEnglish = {
      'om-oss': 'about',
      kontakt: 'contact',
      behandlingar: 'treatments',
      fitness: 'fitness',
      valbefinnande: 'wellness',
    };

    if (swedishToEnglish[path]) {
      return swedishToEnglish[path];
    }

    /**
     * English page names
     */
    const englishPages = [
      'about',
      'contact',
      'treatments',
      'fitness',
      'wellness',
    ];

    if (englishPages.includes(path)) {
      return path;
    }

    // If page cannot be identified, use homepage
    return 'index';
  }

  /**
   * Get translated URL
   */
  function getTranslatedPage(targetLanguage) {
    const currentPageKey = getCurrentPageKey();

    if (pageMap[currentPageKey] && pageMap[currentPageKey][targetLanguage]) {
      return pageMap[currentPageKey][targetLanguage];
    }

    // Safe fallback
    return targetLanguage === 'sv' ? '/sv/' : '/';
  }

  /**
   * Set correct href values
   */
  if (langEnLink) {
    langEnLink.href = getTranslatedPage('en');
  }

  if (langSvLink) {
    langSvLink.href = getTranslatedPage('sv');
  }

  /**
   * English button
   */
  if (langEnLink) {
    langEnLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = getTranslatedPage('en');
    });
  }

  /**
   * Swedish button
   */
  if (langSvLink) {
    langSvLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = getTranslatedPage('sv');
    });
  }
});

/**
 * REVIEWS SLIDER
 */
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.review');
const dotsContainer = document.querySelector('.dots');

let dots = [];
let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let interval;

/**
 * Stop if this page does not contain the review slider
 */
if (track && slides.length > 0 && dotsContainer) {
  /**
   * Move slider
   */
  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  /**
   * Next slide
   */
  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
  }

  /**
   * Previous slide
   */
  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  }

  /**
   * Auto slider
   */
  function startAuto() {
    stopAuto();
    interval = setInterval(nextSlide, 30000);
  }

  /**
   * Stop auto slider
   */
  function stopAuto() {
    if (interval) {
      clearInterval(interval);
    }
  }

  /**
   * Drag start
   */
  function startDrag(x) {
    isDragging = true;
    startX = x;
    currentX = x;
    stopAuto();
    track.style.transition = 'none';
  }

  /**
   * Drag move
   */
  function moveDrag(x) {
    if (!isDragging) return;

    currentX = x;

    const diff = currentX - startX;

    track.style.transform = `translateX(calc(-${index * 100}% + ${diff}px))`;
  }

  /**
   * Drag end
   */
  function endDrag() {
    if (!isDragging) return;

    isDragging = false;

    const diff = currentX - startX;

    track.style.transition = 'transform 0.4s ease';

    if (diff < -50) {
      nextSlide();
    } else if (diff > 50) {
      prevSlide();
    } else {
      updateSlide();
    }

    startAuto();
  }

  /**
   * Touch events
   */
  track.addEventListener(
    'touchstart',
    function (e) {
      startDrag(e.touches[0].clientX);
    },
    { passive: true },
  );

  track.addEventListener(
    'touchmove',
    function (e) {
      moveDrag(e.touches[0].clientX);
    },
    { passive: true },
  );

  track.addEventListener('touchend', endDrag);

  /**
   * Mouse events
   */
  track.addEventListener('mousedown', function (e) {
    startDrag(e.clientX);
  });

  track.addEventListener('mousemove', function (e) {
    moveDrag(e.clientX);
  });

  track.addEventListener('mouseup', endDrag);
  track.addEventListener('mouseleave', endDrag);

  /**
   * Create dots
   */
  function createDots() {
    slides.forEach(function (_, i) {
      const dot = document.createElement('div');

      dot.classList.add('dot');

      dot.addEventListener('click', function () {
        index = i;
        updateSlide();
        stopAuto();
        startAuto();
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  /**
   * Update active dot
   */
  function updateDots() {
    dots.forEach(function (dot) {
      dot.classList.remove('active');
    });

    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  /**
   * Initialize slider
   */
  document.addEventListener('DOMContentLoaded', function () {
    createDots();
    updateSlide();
    startAuto();
  });
}
