// prevent transition flicker on page load
function removeTransitionFlicker() {
  'use strict';
  // remove the preload class 50ms after dom ready
  setTimeout(function () {
    window.document.body.classList.remove('preload');
  }, 50);
}

// set touch classes on the body
function setTouchClasses() {
  'use strict';
  var touchSupport;
  touchSupport = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  // set appropriate class on body
  if (touchSupport) {
    window.document.body.classList.add('touch');
  } else {
    window.document.body.classList.add('no-touch');
  }
}

// process interval functions
function processIntervalFunctions() {
  'use strict';
  var timeOut = 100, scrollTop, prevScrollTop;

  // check the scroll difference and toggle a class to show/hide navigation
  window.setInterval(function () {
    scrollTop = window.scrollY;
    prevScrollTop = prevScrollTop || scrollTop;

    // call interval dependant functions
    toggleMainNav(scrollTop, prevScrollTop);
    toggleMainNavLogo(scrollTop);

    // set prevScrollTop to current scrollTop value for next interval
    prevScrollTop = scrollTop;
  }, timeOut);
}

// hide/show the main nav on certain scroll behaviour
function toggleMainNav(scrollTop, prevScrollTop) {
  'use strict';
  var navBar, scrollDifference, navBarHiddenClass, navBarClassSwitchThreshold;
  navBar = document.querySelectorAll('.js-nav-bar')[0];
  navBarHiddenClass = 'nav-bar-hidden-js';
  navBarClassSwitchThreshold = 300;
  // set the scroll difference that'll work together with the threshold to determine to show/hide the main navigation bar
  scrollDifference = Math.abs(prevScrollTop - scrollTop);

  // show/hide main nav bar
  if (scrollDifference >= 30 && scrollTop > navBarClassSwitchThreshold) {
    if (scrollTop >= (prevScrollTop + 30)) {
      navBar.classList.add(navBarHiddenClass);
    } else {
      navBar.classList.remove(navBarHiddenClass);
    }
  } else if (scrollTop <= navBarClassSwitchThreshold) {
    navBar.classList.remove(navBarHiddenClass);
  }
}

// show/hide the main nav bar creativitea logo
function toggleMainNavLogo(scrollTop) {
  'use strict';
  var navBar, navBarLogoVisibleClass;
  navBar = document.querySelectorAll('.js-nav-bar')[0];
  navBarLogoVisibleClass = 'nav-bar-logo-visible-js';

  // if the user scrolled more than 300px from the top show the logo else hide it
  if (scrollTop > 229) {
    navBar.classList.add(navBarLogoVisibleClass);
  } else {
    navBar.classList.remove(navBarLogoVisibleClass);
  }
}

// show secondary navigation
function toggleSecondaryNavigation() {
  var navBar, secondaryNavListVisibleClass;
  navBar = document.querySelectorAll('.nav-bar')[0];
  secondaryNavListVisibleClass = 'secondary-nav-list-visible-js';

  if (navBar.classList.contains(secondaryNavListVisibleClass) === true) {
    navBar.classList.remove(secondaryNavListVisibleClass);
  } else {
    navBar.classList.add(secondaryNavListVisibleClass);
  }
}

// scroll to top function
function addHandlers() {
  'use strict';
  // scroll to the top when nav-bar-logo is clicked
  document.querySelectorAll('.js-nav-bar-logo')[0].addEventListener('click', function (e) {
    e.preventDefault();
    scrollToTop(900);
  }, false);

  // toggle the secondary navigation when clicked on the secondary-nav-list-toggle
  document.querySelectorAll('.js-secondary-nav-list-toggle')[0].addEventListener('click', function (e) {
    e.preventDefault();
    toggleSecondaryNavigation();
  }, false);
}

// scroll to top function
function scrollToTop(scrollDuration) {
  'use strict';
  var scrollHeight, scrollStep, scrollCount, scrollMargin, scrollInterval, cosParameter;
  scrollHeight = window.scrollY;
  scrollStep = Math.PI / ( scrollDuration / 15 );
  cosParameter = scrollHeight / 2;
  scrollCount = 0;
  scrollInterval = setInterval(function () {
    if (window.scrollY !== 0) {
      scrollCount = scrollCount + 1;
      scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
      window.scrollTo(0, (scrollHeight - scrollMargin));
    }
    else clearInterval(scrollInterval);
  }, (1000 / 60));
}

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // Mark the DOM as loaded in the console
  console.log('DOMContentLoaded');
  // remove transition flicker
  removeTransitionFlicker();
  // detect touch support
  setTouchClasses();
  // add click handlers
  addHandlers();
  // activate interval dependant functions
  processIntervalFunctions();
});