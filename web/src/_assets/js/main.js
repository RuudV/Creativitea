/*
 * Creativitea Functions
 * */
ctea = function () {
  'use strict';
  /*
   * Cached Elements
   * */
  var els = {
    'body': window.document.body,
    'logo': chelper().getElementByClass('.js-logo'),
    'navBar': chelper().getElementByClass('.js-nav-bar'),
    'searchBar': chelper().getElementByClass('.js-search-bar')
  };

  // prevent transition flicker on page load
  function removeTransitionFlicker() {
    // remove the preload class 50ms after dom ready
    setTimeout(function () {
      els.body.classList.remove('preload');
    }, 50);
  }

  // set touch classes on the body
  function setTouchClasses() {
    var touchSupport;
    touchSupport = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    // set appropriate class on body
    if (touchSupport) {
      els.body.classList.add('touch');
    } else {
      els.body.classList.add('no-touch');
    }
  }

  // process interval functions
  function processIntervalFunctions() {
    var timeOut = 100, scrollTop, prevScrollTop;

    // check the scroll difference and toggle a class to show/hide navigation
    window.setInterval(function () {
      scrollTop = window.scrollY;
      prevScrollTop = prevScrollTop || scrollTop;

      // call interval dependant functions
      toggleHover(scrollTop, prevScrollTop);
      toggleMainNav(scrollTop, prevScrollTop);
      toggleMainNavLogo(scrollTop);

      // set prevScrollTop to current scrollTop value for next interval
      prevScrollTop = scrollTop;
    }, timeOut);
  }

  // make sure hover is disabled when user is actively scrolling
  function toggleHover(scrollTop, prevScrollTop) {
    var disableHoverClass = 'disable-hover-js', scrollDifference = scrollTop - prevScrollTop;
    if (scrollDifference >= 10 || scrollDifference <= -10) {
      els.body.classList.add(disableHoverClass);
    } else {
      els.body.classList.remove(disableHoverClass);
    }
  }

  // hide/show the main nav on certain scroll behaviour
  function toggleMainNav(scrollTop, prevScrollTop) {
    var scrollDifference, navBarHiddenClass, navBarClassSwitchThreshold;
    navBarHiddenClass = 'nav-bar-hidden-js';
    navBarClassSwitchThreshold = 300;
    // set the scroll difference that'll work together with the threshold to determine to show/hide the main navigation bar
    scrollDifference = Math.abs(prevScrollTop - scrollTop);

    // show/hide main nav bar
    if (scrollDifference >= 30 && scrollTop > navBarClassSwitchThreshold && chelper().hasClass(els.searchBar, 'search-bar-visible-js') === false) {
      if (scrollTop >= (prevScrollTop + 30)) {
        els.navBar.classList.add(navBarHiddenClass);
      } else {
        els.navBar.classList.remove(navBarHiddenClass);
      }
    } else if (scrollTop <= navBarClassSwitchThreshold) {
      els.navBar.classList.remove(navBarHiddenClass);
    }
  }

  // show/hide the main nav bar creativitea logo
  function toggleMainNavLogo(scrollTop) {
    var navBar, navBarLogoVisibleClass;
    navBar = els.navBar;
    navBarLogoVisibleClass = 'nav-bar-logo-visible-js';

    // if the user scrolled more than 300px from the top show the logo else hide it
    if (scrollTop > 229) {
      navBar.classList.add(navBarLogoVisibleClass);
    } else if (chelper().hasClass(els.searchBar, 'search-bar-visible-js') === false) {
      navBar.classList.remove(navBarLogoVisibleClass);
    }
  }

  // show secondary navigation
  function toggleSecondaryNavigation() {
    var navBar, secondaryNavListVisibleClass;
    navBar = els.navBar;
    secondaryNavListVisibleClass = 'secondary-nav-list-visible-js';

    if (navBar.classList.contains(secondaryNavListVisibleClass) === true) {
      navBar.classList.remove(secondaryNavListVisibleClass);
    } else {
      navBar.classList.add(secondaryNavListVisibleClass);
    }
  }

  // show/hide search bar
  function toggleSearchBar() {
    var searchBarVisibleClass, logoHiddenClass, navBarLogoVisibleClass, currentScrollPosition;
    searchBarVisibleClass = 'search-bar-visible-js';
    logoHiddenClass = 'logo-hidden-js';
    navBarLogoVisibleClass = 'nav-bar-logo-visible-js';
    // store current scroll position to be used to prevent scroll jump on input focus
    currentScrollPosition = window.scrollY;

    if (els.searchBar.classList.contains(searchBarVisibleClass) === true) {
      els.searchBar.classList.remove(searchBarVisibleClass);
      els.logo.classList.remove(logoHiddenClass);
      if (currentScrollPosition <= 229) {
        els.navBar.classList.remove(navBarLogoVisibleClass);
      }
      chelper().getElementByClass('.js-search-input').blur();
    } else {
      els.searchBar.classList.add(searchBarVisibleClass);
      els.logo.classList.add(logoHiddenClass);
      els.navBar.classList.add(navBarLogoVisibleClass);
      chelper().getElementByClass('.js-search-input').focus();
      // prevent scroll jump
      window.scrollTo(0, currentScrollPosition);
    }
  }

  // scroll to top function
  function scrollToTop(scrollDuration) {
    var scrollHeight, scrollStep, scrollCount, scrollMargin, scrollInterval, cosParameter;
    scrollHeight = window.scrollY;
    scrollStep = Math.PI / (scrollDuration / 15);
    cosParameter = scrollHeight / 2;
    scrollCount = 0;
    scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        scrollCount += 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, (scrollHeight - scrollMargin));
      } else {
        clearInterval(scrollInterval);
      }
    }, (1000 / 60));
  }

  // add event handlers
  function addHandlers() {
    // scroll to the top when nav-bar-logo is clicked
    chelper().getElementByClass('.js-nav-bar-logo').addEventListener('click', function (e) {
      e.preventDefault();
      scrollToTop(900);
    }, false);

    // toggle the secondary navigation when clicked on the secondary-nav-list-toggle
    chelper().getElementByClass('.js-secondary-nav-list-toggle').addEventListener('click', function (e) {
      e.preventDefault();
      toggleSecondaryNavigation();
    }, false);

    chelper().getElementByClass('.js-search-toggle').addEventListener('click', function (e) {
      e.preventDefault();
      toggleSearchBar();
    });
  }

  // public initializer
  function init() {
    // remove transition flicker
    removeTransitionFlicker();
    // detect touch support
    setTouchClasses();
    // add click handlers
    addHandlers();
    // activate interval dependant functions
    processIntervalFunctions();
  }

  // make init function accessible
  return {
    init: init
  };
};


/*
 * Document Ready
 * */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // Mark the DOM as loaded in the console
  console.log('DOMContentLoaded');
  // execute creativitea init
  ctea().init();
});