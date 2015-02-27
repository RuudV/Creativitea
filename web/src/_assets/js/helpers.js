/*
 * Helper Functions
 * */
ch = function () {
  'use strict';

  // the call back for each loop
  function forEach(list, callback) {
    if (list !== undefined) {
      [].forEach.call(list, callback);
    }
    return false;
  }

  // add handler space seperated
  function addHandlers(eventsString, element, callback) {
    var events = eventsString.split(' ');
    for (var i = 0; i < events.length; i++) {
      element.addEventListener(events[i], callback);
    }
  }

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
    forEach: function (list, callback) {
      forEach(list, callback);
    },
    getElementByClass: function (elementClass) {
      return getElementByClass(elementClass);
    },
    getElementsByClass: function (elementsClass) {
      return getElementsByClass(elementsClass);
    },
    hasClass: function (element, className) {
      return hasClass(element, className);
    },
    addHandlers: function (eventsString, element, callback) {
      addHandlers(eventsString, element, callback);
    }
  };
};