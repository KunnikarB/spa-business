
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

let index = 0;
const reviews = document.querySelectorAll(".review");

function showReview() {
  reviews.forEach(r => r.classList.remove("active"));
  reviews[index].classList.add("active");
  index = (index + 1) % reviews.length;
}

setInterval(showReview, 3000);



