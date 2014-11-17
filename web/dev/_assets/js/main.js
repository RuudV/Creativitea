// main.js
function mainNav() {
  "use strict";

  var timeOut = 100, scrollTop, prevScrollTop, mainNavElement, difference, hiddenClass;
  mainNavElement = document.querySelectorAll('.js-main-nav')[0];
  hiddenClass = 'main-nav-hidden-js';
  window.setInterval(function () {
    scrollTop = document.body.scrollTop;
    prevScrollTop = prevScrollTop || scrollTop;
    difference = Math.abs(prevScrollTop - scrollTop);

    if (difference >= 30) {
      if (scrollTop >= (prevScrollTop + 30)) {
        mainNavElement.classList.add(hiddenClass);
      } else {
        mainNavElement.classList.remove(hiddenClass);
      }
    } else if (scrollTop === 0) {
      mainNavElement.classList.remove(hiddenClass);
    }

    prevScrollTop = scrollTop;
  }, timeOut);
}

document.addEventListener('DOMContentLoaded', function () {
  "use strict";
  // Mark the DOM as loaded in the console
  console.log('DOMContentLoaded');
  // activate main navigation functionality
  mainNav();
});