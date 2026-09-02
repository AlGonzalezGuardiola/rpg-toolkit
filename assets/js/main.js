(function () {
  'use strict';

  var STORE_KEY = 'rt5e-lang';
  var SUPPORTED = ['es', 'en'];

  function pickInitialLang() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'es';
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.classList.remove('lang-es', 'lang-en');
    html.classList.add('lang-' + lang);

    // text nodes
    var nodes = document.querySelectorAll('[data-' + lang + ']');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = el.getAttribute('data-' + lang);
      if (val == null) continue;
      if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else {
        el.textContent = val;
      }
    }

    // swappable image sources (store badges)
    var imgs = document.querySelectorAll('[data-src-' + lang + ']');
    for (var j = 0; j < imgs.length; j++) {
      imgs[j].setAttribute('src', imgs[j].getAttribute('data-src-' + lang));
    }

    // toggle button state
    var btns = document.querySelectorAll('[data-setlang]');
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute('aria-pressed', String(btns[k].getAttribute('data-setlang') === lang));
    }

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  function initLangToggle() {
    var btns = document.querySelectorAll('[data-setlang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        applyLang(this.getAttribute('data-setlang'));
      });
    }
  }

  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(pickInitialLang());
    initLangToggle();
    initHeaderScroll();
    initReveal();
    initYear();
  });
})();
