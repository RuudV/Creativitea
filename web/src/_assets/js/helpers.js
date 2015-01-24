/*
 * Helper Functions
 * */
chelper = function () {
  'use strict';
  // get first element by a specific class
  function getElementByClass(elementClass) {
    return document.querySelectorAll(elementClass)[0];
  }

  // get array of elements by a specific class
  function getElementsByClass(elementsClass) {
    return document.querySelectorAll(elementsClass);
  }

  // return boolean depending on if element has a class
  function hasClass(element, className) {
    return element.classList.contains(className);
  }

  // publicize helper functions
  return {
    getElementByClass: function (elementClass) {
      return getElementByClass(elementClass);
    },
    getElementsByClass: function (elementsClass) {
      return getElementsByClass(elementsClass);
    },
    hasClass: function (element, className) {
      return hasClass(element, className);
    }
  };
};