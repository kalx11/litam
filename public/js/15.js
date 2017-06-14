webpackJsonp([15],{

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(45)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(85),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ignacio/proyectos/descon/resources/assets/js/components/Productos.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Productos.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-efe52b82", Component.options)
  } else {
    hotAPI.reload("data-v-efe52b82", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * sweetalert2 v6.6.5
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  type: null,
  customClass: '',
  target: 'body',
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonColor: '#3085d6',
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonColor: '#aaa',
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusCancel: false,
  showCloseButton: false,
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageClass: null,
  timer: null,
  width: 500,
  padding: 20,
  background: '#fff',
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: '40px',
  onOpen: null,
  onClose: null,
  useRejections: true
};

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'iosfix', 'modal', 'overlay', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'content', 'buttonswrapper', 'confirm', 'cancel', 'icon', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

/*
 * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  var rgb = '#';
  for (var i = 0; i < 3; i++) {
    var c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

var uniqueArray = function uniqueArray(arr) {
  var result = [];
  for (var i in arr) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
};

/* global MouseEvent */

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousWindowKeyDown: null,
  previousActiveElement: null,
  previousBodyPadding: null

  /*
   * Add modal + overlay to DOM
   */
};var init = function init(params) {
  if (typeof document === 'undefined') {
    console.error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = document.querySelector(params.target);
  if (!targetElement) {
    console.warn('SweetAlert2: Can\'t find the target "' + params.target + '"');
    targetElement = document.body;
  }
  targetElement.appendChild(container);

  var modal = getModal();
  var input = getChildByClass(modal, swalClasses.input);
  var file = getChildByClass(modal, swalClasses.file);
  var range = modal.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = modal.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(modal, swalClasses.select);
  var checkbox = modal.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(modal, swalClasses.textarea);

  input.oninput = function () {
    sweetAlert.resetValidationError();
  };

  input.onkeydown = function (event) {
    setTimeout(function () {
      if (event.keyCode === 13 && params.allowEnterKey) {
        event.stopPropagation();
        sweetAlert.clickConfirm();
      }
    }, 0);
  };

  file.onchange = function () {
    sweetAlert.resetValidationError();
  };

  range.oninput = function () {
    sweetAlert.resetValidationError();
    rangeOutput.value = range.value;
  };

  range.onchange = function () {
    sweetAlert.resetValidationError();
    range.previousSibling.value = range.value;
  };

  select.onchange = function () {
    sweetAlert.resetValidationError();
  };

  checkbox.onchange = function () {
    sweetAlert.resetValidationError();
  };

  textarea.oninput = function () {
    sweetAlert.resetValidationError();
  };

  return modal;
};

/*
 * Manipulate DOM
 */

var sweetHTML = ('\n <div role="dialog" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.modal + '" tabindex="-1">\n   <ul class="' + swalClasses.progresssteps + '"></ul>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="' + swalClasses.image + '">\n   <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n   <div id="' + swalClasses.content + '" class="' + swalClasses.content + '"></div>\n   <input class="' + swalClasses.input + '">\n   <input type="file" class="' + swalClasses.file + '">\n   <div class="' + swalClasses.range + '">\n     <output></output>\n     <input type="range">\n   </div>\n   <select class="' + swalClasses.select + '"></select>\n   <div class="' + swalClasses.radio + '"></div>\n   <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n     <input type="checkbox">\n   </label>\n   <textarea class="' + swalClasses.textarea + '"></textarea>\n   <div class="' + swalClasses.validationerror + '"></div>\n   <div class="' + swalClasses.buttonswrapper + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <button type="button" class="' + swalClasses.close + '" aria-label="Close this dialog">&times;</button>\n </div>\n').replace(/(^|\n)\s*/g, '');

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var getModal = function getModal() {
  return getContainer() ? getContainer().querySelector('.' + swalClasses.modal) : null;
};

var getIcons = function getIcons() {
  var modal = getModal();
  return modal.querySelectorAll('.' + swalClasses.icon);
};

var elementByClass = function elementByClass(className) {
  return getContainer() ? getContainer().querySelector('.' + className) : null;
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getButtonsWrapper = function getButtonsWrapper() {
  return elementByClass(swalClasses.buttonswrapper);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements(focusCancel) {
  var buttons = [getConfirmButton(), getCancelButton()];
  if (focusCancel) {
    buttons.reverse();
  }
  var focusableElements = buttons.concat(Array.prototype.slice.call(getModal().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, *[tabindex]:not([tabindex="-1"])')));
  return uniqueArray(focusableElements);
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus

  // place cursor at end of text in text input
  ();if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addClass = function addClass(elem, className) {
  if (!elem || !className) {
    return;
  }
  var classes = className.split(/\s+/).filter(Boolean);
  classes.forEach(function (className) {
    elem.classList.add(className);
  });
};

var removeClass = function removeClass(elem, className) {
  if (!elem || !className) {
    return;
  }
  var classes = className.split(/\s+/).filter(Boolean);
  classes.forEach(function (className) {
    elem.classList.remove(className);
  });
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem, display) {
  if (!display) {
    display = 'block';
  }
  elem.style.opacity = '';
  elem.style.display = display;
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jqeury $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var fireClick = function fireClick(node) {
  if (!isVisible(node)) {
    return false;
  }

  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var animationEndEvent = function () {
  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && testEl.style[i] !== undefined) {
      return transEndEventNames[i];
    }
  }

  return false;
}

// Reset previous window keydown handler and focued element
();var resetPrevState = function resetPrevState() {
  window.onkeydown = states.previousWindowKeyDown;
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    var x = window.scrollX;
    var y = window.scrollY;
    states.previousActiveElement.focus();
    if (x && y) {
      // IE has no scrollX/scrollY support
      window.scrollTo(x, y);
    }
  }
};

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

// JavaScript Debounce Function
// Simplivied version of https://davidwalsh.name/javascript-debounce-function
var debounce = function debounce(func, wait) {
  var timeout = void 0;
  return function () {
    var later = function later() {
      timeout = null;
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var modalParams = _extends({}, defaultParams);
var queue = [];
var swal2Observer = void 0;

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = getModal() || init(params);

  for (var param in params) {
    if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
      console.warn('SweetAlert2: Unknown parameter "' + param + '"');
    }
  }

  // Set modal width
  modal.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;

  modal.style.padding = params.padding + 'px';
  modal.style.background = params.background;
  var successIconParts = modal.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.background = params.background;
  }

  var title = getTitle();
  var content = getContent();
  var buttonsWrapper = getButtonsWrapper();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton

  // Title
  ();if (params.titleText) {
    title.innerText = params.titleText;
  } else {
    title.innerHTML = params.title.split('\n').join('<br>');
  }

  // Content
  if (params.text || params.html) {
    if (_typeof(params.html) === 'object') {
      content.innerHTML = '';
      if (0 in params.html) {
        for (var _i = 0; _i in params.html; _i++) {
          content.appendChild(params.html[_i].cloneNode(true));
        }
      } else {
        content.appendChild(params.html.cloneNode(true));
      }
    } else if (params.html) {
      content.innerHTML = params.html;
    } else if (params.text) {
      content.textContent = params.text;
    }
    show(content);
  } else {
    hide(content);
  }

  // Close button
  if (params.showCloseButton) {
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Custom Class
  modal.className = swalClasses.modal;
  if (params.customClass) {
    addClass(modal, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      console.warn('SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        line.style.width = params.progressStepsDistance;
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i2 = 0; _i2 < icons.length; _i2++) {
    hide(icons[_i2]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      console.error('SweetAlert2: Unknown alert type: ' + params.type);
      return false;
    }
    var icon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon

    // Animate icon
    );if (params.animation) {
      switch (params.type) {
        case 'success':
          addClass(icon, 'swal2-animate-success-icon');
          addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
          addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
          break;
        case 'error':
          addClass(icon, 'swal2-animate-error-icon');
          addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
          break;
        default:
          break;
      }
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Buttons wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(buttonsWrapper);
  } else {
    show(buttonsWrapper);
  }

  // Edit text on cancel and confirm buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // Set buttons to selected background colors
  if (params.buttonsStyling) {
    confirmButton.style.backgroundColor = params.confirmButtonColor;
    cancelButton.style.backgroundColor = params.cancelButtonColor;
  }

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass

  // Buttons styling
  );if (params.buttonsStyling) {
    addClass(confirmButton, swalClasses.styled);
    addClass(cancelButton, swalClasses.styled);
  } else {
    removeClass(confirmButton, swalClasses.styled);
    removeClass(cancelButton, swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // CSS animation
  if (params.animation === true) {
    removeClass(modal, swalClasses.noanimation);
  } else {
    addClass(modal, swalClasses.noanimation);
  }
};

/*
 * Animations
 */
var openModal = function openModal(animation, onComplete) {
  var container = getContainer();
  var modal = getModal();

  if (animation) {
    addClass(modal, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(modal, swalClasses.hide);
  } else {
    removeClass(modal, swalClasses.fade);
  }
  show(modal

  // scrolling is 'hidden' until animation is done, after that 'auto'
  );container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
    modal.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      modal.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass(document.documentElement, swalClasses.shown);
  addClass(document.body, swalClasses.shown);
  addClass(container, swalClasses.shown);
  fixScrollbar();
  iOSfix();
  states.previousActiveElement = document.activeElement;
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(modal);
    });
  }
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

// SweetAlert entry point
var sweetAlert = function sweetAlert() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args[0] === undefined) {
    console.error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  var params = _extends({}, modalParams);

  switch (_typeof(args[0])) {
    case 'string':
      params.title = args[0];
      params.html = args[1];
      params.type = args[2];

      break;

    case 'object':
      _extends(params, args[0]);
      params.extraParams = args[0].extraParams;

      if (params.input === 'email' && params.inputValidator === null) {
        params.inputValidator = function (email) {
          return new Promise(function (resolve, reject) {
            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailRegex.test(email)) {
              resolve();
            } else {
              reject('Invalid email address');
            }
          });
        };
      }

      if (params.input === 'url' && params.inputValidator === null) {
        params.inputValidator = function (url) {
          return new Promise(function (resolve, reject) {
            // taken from https://stackoverflow.com/a/3809435/1331425
            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
            if (urlRegex.test(url)) {
              resolve();
            } else {
              reject('Invalid URL');
            }
          });
        };
      }
      break;

    default:
      console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }

  setParameters(params);

  var container = getContainer();
  var modal = getModal();

  return new Promise(function (resolve, reject) {
    // Close on timer
    if (params.timer) {
      modal.timeout = setTimeout(function () {
        sweetAlert.closeModal(params.onClose);
        if (params.useRejections) {
          reject('timer');
        } else {
          resolve({ dismiss: 'timer' });
        }
      }, params.timer);
    }

    // Get input element by specified type or, if type isn't specified, by params.input
    var getInput = function getInput(inputType) {
      inputType = inputType || params.input;
      if (!inputType) {
        return null;
      }
      switch (inputType) {
        case 'select':
        case 'textarea':
        case 'file':
          return getChildByClass(modal, swalClasses[inputType]);
        case 'checkbox':
          return modal.querySelector('.' + swalClasses.checkbox + ' input');
        case 'radio':
          return modal.querySelector('.' + swalClasses.radio + ' input:checked') || modal.querySelector('.' + swalClasses.radio + ' input:first-child');
        case 'range':
          return modal.querySelector('.' + swalClasses.range + ' input');
        default:
          return getChildByClass(modal, swalClasses.input);
      }
    };

    // Get the value of the modal input
    var getInputValue = function getInputValue() {
      var input = getInput();
      if (!input) {
        return null;
      }
      switch (params.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return params.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (params.input) {
      setTimeout(function () {
        var input = getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (params.showLoaderOnConfirm) {
        sweetAlert.showLoading();
      }

      if (params.preConfirm) {
        params.preConfirm(value, params.extraParams).then(function (preConfirmValue) {
          sweetAlert.closeModal(params.onClose);
          resolve(preConfirmValue || value);
        }, function (error) {
          sweetAlert.hideLoading();
          if (error) {
            sweetAlert.showValidationError(error);
          }
        });
      } else {
        sweetAlert.closeModal(params.onClose);
        if (params.useRejections) {
          resolve(value);
        } else {
          resolve({ value: value });
        }
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = getConfirmButton();
      var cancelButton = getCancelButton();
      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'mouseover':
        case 'mouseup':
          if (params.buttonsStyling) {
            if (targetedConfirm) {
              confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
            } else if (targetedCancel) {
              cancelButton.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.1);
            }
          }
          break;
        case 'mouseout':
          if (params.buttonsStyling) {
            if (targetedConfirm) {
              confirmButton.style.backgroundColor = params.confirmButtonColor;
            } else if (targetedCancel) {
              cancelButton.style.backgroundColor = params.cancelButtonColor;
            }
          }
          break;
        case 'mousedown':
          if (params.buttonsStyling) {
            if (targetedConfirm) {
              confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2);
            } else if (targetedCancel) {
              cancelButton.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.2);
            }
          }
          break;
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            if (params.input) {
              var inputValue = getInputValue();

              if (params.inputValidator) {
                sweetAlert.disableInput();
                params.inputValidator(inputValue, params.extraParams).then(function () {
                  sweetAlert.enableButtons();
                  sweetAlert.enableInput();
                  confirm(inputValue);
                }, function (error) {
                  sweetAlert.enableButtons();
                  sweetAlert.enableInput();
                  if (error) {
                    sweetAlert.showValidationError(error);
                  }
                });
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            sweetAlert.closeModal(params.onClose);
            if (params.useRejections) {
              reject('cancel');
            } else {
              resolve({ dismiss: 'cancel' });
            }
          }
          break;
        default:
      }
    };

    var buttons = modal.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing modal by close button
    getCloseButton().onclick = function () {
      sweetAlert.closeModal(params.onClose);
      if (params.useRejections) {
        reject('close');
      } else {
        resolve({ dismiss: 'close' });
      }
    };

    // Closing modal by overlay click
    container.onclick = function (e) {
      if (e.target !== container) {
        return;
      }
      if (params.allowOutsideClick) {
        sweetAlert.closeModal(params.onClose);
        if (params.useRejections) {
          reject('overlay');
        } else {
          resolve({ dismiss: 'overlay' });
        }
      }
    };

    var buttonsWrapper = getButtonsWrapper();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton

    // Reverse buttons (Confirm on the right side)
    ();if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    } else {
      confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(params.focusCancel
      // search for visible elements and select the next possible match
      );for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
    };

    var handleKeyDown = function handleKeyDown(event) {
      var e = event || window.event;
      var keyCode = e.keyCode || e.which;

      if ([9, 13, 32, 27, 37, 38, 39, 40].indexOf(keyCode) === -1) {
        // Don't do work on keys we don't care about.
        return;
      }

      var targetElement = e.target || e.srcElement;

      var focusableElements = getFocusableElements(params.focusCancel);
      var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
      for (var _i4 = 0; _i4 < focusableElements.length; _i4++) {
        if (targetElement === focusableElements[_i4]) {
          btnIndex = _i4;
          break;
        }
      }

      // TAB
      if (keyCode === 9) {
        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault

        // ARROWS - switch focus between buttons
        ();
      } else if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
          cancelButton.focus
          // and vice versa
          ();
        } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
          confirmButton.focus();
        }

        // ENTER/SPACE
      } else if (keyCode === 13 || keyCode === 32) {
        if (btnIndex === -1 && params.allowEnterKey) {
          // ENTER/SPACE clicked outside of a button.
          if (params.focusCancel) {
            fireClick(cancelButton, e);
          } else {
            fireClick(confirmButton, e);
          }
          e.stopPropagation();
          e.preventDefault();
        }

        // ESC
      } else if (keyCode === 27 && params.allowEscapeKey === true) {
        sweetAlert.closeModal(params.onClose);
        if (params.useRejections) {
          reject('esc');
        } else {
          resolve({ dismiss: 'esc' });
        }
      }
    };

    if (!window.onkeydown || window.onkeydown.toString() !== handleKeyDown.toString()) {
      states.previousWindowKeyDown = window.onkeydown;
      window.onkeydown = handleKeyDown;
    }

    // Loading state
    if (params.buttonsStyling) {
      confirmButton.style.borderLeftColor = params.confirmButtonColor;
      confirmButton.style.borderRightColor = params.confirmButtonColor;
    }

    /**
     * Show spinner instead of Confirm button and disable Cancel button
     */
    sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
      if (!params.showConfirmButton) {
        hide(confirmButton);
        if (!params.showCancelButton) {
          hide(getButtonsWrapper());
        }
      }
      removeClass(buttonsWrapper, swalClasses.loading);
      removeClass(modal, swalClasses.loading);
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.getTitle = function () {
      return getTitle();
    };
    sweetAlert.getContent = function () {
      return getContent();
    };
    sweetAlert.getInput = function () {
      return getInput();
    };
    sweetAlert.getImage = function () {
      return getImage();
    };
    sweetAlert.getButtonsWrapper = function () {
      return getButtonsWrapper();
    };
    sweetAlert.getConfirmButton = function () {
      return getConfirmButton();
    };
    sweetAlert.getCancelButton = function () {
      return getCancelButton();
    };

    sweetAlert.enableButtons = function () {
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.disableButtons = function () {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    };

    sweetAlert.enableConfirmButton = function () {
      confirmButton.disabled = false;
    };

    sweetAlert.disableConfirmButton = function () {
      confirmButton.disabled = true;
    };

    sweetAlert.enableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i5 = 0; _i5 < radios.length; _i5++) {
          radios[_i5].disabled = false;
        }
      } else {
        input.disabled = false;
      }
    };

    sweetAlert.disableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input && input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i6 = 0; _i6 < radios.length; _i6++) {
          radios[_i6].disabled = true;
        }
      } else {
        input.disabled = true;
      }
    };

    // Set modal min-height to disable scrolling inside the modal
    sweetAlert.recalculateHeight = debounce(function () {
      var modal = getModal();
      if (!modal) {
        return;
      }
      var prevState = modal.style.display;
      modal.style.minHeight = '';
      show(modal);
      modal.style.minHeight = modal.scrollHeight + 1 + 'px';
      modal.style.display = prevState;
    }, 50

    // Show block with validation error
    );sweetAlert.showValidationError = function (error) {
      var validationError = getValidationError();
      validationError.innerHTML = error;
      show(validationError);

      var input = getInput();
      if (input) {
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    };

    // Hide block with validation error
    sweetAlert.resetValidationError = function () {
      var validationError = getValidationError();
      hide(validationError);
      sweetAlert.recalculateHeight();

      var input = getInput();
      if (input) {
        removeClass(input, swalClasses.inputerror);
      }
    };

    sweetAlert.getProgressSteps = function () {
      return params.progressSteps;
    };

    sweetAlert.setProgressSteps = function (progressSteps) {
      params.progressSteps = progressSteps;
      setParameters(params);
    };

    sweetAlert.showProgressSteps = function () {
      show(getProgressSteps());
    };

    sweetAlert.hideProgressSteps = function () {
      hide(getProgressSteps());
    };

    sweetAlert.enableButtons();
    sweetAlert.hideLoading();
    sweetAlert.resetValidationError

    // inputs
    ();var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i7 = 0; _i7 < inputTypes.length; _i7++) {
      var inputClass = swalClasses[inputTypes[_i7]];
      var inputContainer = getChildByClass(modal, inputClass);
      input = getInput(inputTypes[_i7]

      // set attributes
      );if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (params.inputClass) {
        addClass(inputContainer, params.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (params.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(modal, swalClasses.input);
        input.value = params.inputValue;
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(modal, swalClasses.file);
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(modal, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(modal, swalClasses.select);
        select.innerHTML = '';
        if (params.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = params.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          for (var optionValue in inputOptions) {
            var option = document.createElement('option');
            option.value = optionValue;
            option.innerHTML = inputOptions[optionValue];
            if (params.inputValue === optionValue) {
              option.selected = true;
            }
            select.appendChild(option);
          }
          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(modal, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          for (var radioValue in inputOptions) {
            var radioInput = document.createElement('input');
            var radioLabel = document.createElement('label');
            var radioLabelSpan = document.createElement('span');
            radioInput.type = 'radio';
            radioInput.name = swalClasses.radio;
            radioInput.value = radioValue;
            if (params.inputValue === radioValue) {
              radioInput.checked = true;
            }
            radioLabelSpan.innerHTML = inputOptions[radioValue];
            radioLabel.appendChild(radioInput);
            radioLabel.appendChild(radioLabelSpan);
            radioLabel.for = radioInput.id;
            radio.appendChild(radioLabel);
          }
          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(modal, swalClasses.checkbox);
        var checkboxInput = getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(params.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = params.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(modal, swalClasses.textarea);
        textarea.value = params.inputValue;
        textarea.placeholder = params.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        console.error('SweetAlert2: Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
        break;
    }

    if (params.input === 'select' || params.input === 'radio') {
      if (params.inputOptions instanceof Promise) {
        sweetAlert.showLoading();
        params.inputOptions.then(function (inputOptions) {
          sweetAlert.hideLoading();
          populateInputOptions(inputOptions);
        });
      } else if (_typeof(params.inputOptions) === 'object') {
        populateInputOptions(params.inputOptions);
      } else {
        console.error('SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got ' + _typeof(params.inputOptions));
      }
    }

    openModal(params.animation, params.onOpen

    // Focus the first element (input or button)
    );if (params.allowEnterKey) {
      setFocus(-1, 1);
    } else {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }

    // fix scroll
    getContainer().scrollTop = 0;

    // Observe changes inside the modal and adjust height
    if (typeof MutationObserver !== 'undefined' && !swal2Observer) {
      swal2Observer = new MutationObserver(sweetAlert.recalculateHeight);
      swal2Observer.observe(modal, { childList: true, characterData: true, subtree: true });
    }
  });
};

/*
 * Global function to determine if swal2 modal is shown
 */
sweetAlert.isVisible = function () {
  return !!getModal();
};

/*
 * Global function for chaining sweetAlert modals
 */
sweetAlert.queue = function (steps) {
  queue = steps;
  var resetQueue = function resetQueue() {
    queue = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < queue.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        sweetAlert(queue[i]).then(function (result) {
          queueResult.push(result);
          step(i + 1, callback);
        }, function (dismiss) {
          resetQueue();
          reject(dismiss);
        });
      } else {
        resetQueue();
        resolve(queueResult);
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current modal in queue
 */
sweetAlert.getQueueStep = function () {
  return document.body.getAttribute('data-swal2-queue-step'

  /*
   * Global function for inserting a modal to the queue
   */
  );
};sweetAlert.insertQueueStep = function (step, index) {
  if (index && index < queue.length) {
    return queue.splice(index, 0, step);
  }
  return queue.push(step);
};

/*
 * Global function for deleting a modal from the queue
 */
sweetAlert.deleteQueueStep = function (index) {
  if (typeof queue[index] !== 'undefined') {
    queue.splice(index, 1);
  }
};

/*
 * Global function to close sweetAlert
 */
sweetAlert.close = sweetAlert.closeModal = function (onComplete) {
  var container = getContainer();
  var modal = getModal();
  if (!modal) {
    return;
  }
  removeClass(modal, swalClasses.show);
  addClass(modal, swalClasses.hide);
  clearTimeout(modal.timeout);

  resetPrevState();

  var removeModalAndResetState = function removeModalAndResetState() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass(document.documentElement, swalClasses.shown);
    removeClass(document.body, swalClasses.shown);
    undoScrollbar();
    undoIOSfix();
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
    modal.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      modal.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(modal, swalClasses.hide)) {
        removeModalAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removeModalAndResetState();
  }
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(modal);
    });
  }
};

/*
 * Global function to click 'Confirm' button
 */
sweetAlert.clickConfirm = function () {
  return getConfirmButton().click

  /*
   * Global function to click 'Cancel' button
   */
  ();
};sweetAlert.clickCancel = function () {
  return getCancelButton().click

  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */
  ();
};sweetAlert.showLoading = sweetAlert.enableLoading = function () {
  var modal = getModal();
  if (!modal) {
    sweetAlert('');
  }
  var buttonsWrapper = getButtonsWrapper();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(buttonsWrapper);
  show(confirmButton, 'inline-block');
  addClass(buttonsWrapper, swalClasses.loading);
  addClass(modal, swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;
};

/**
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = function (userParams) {
  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    return console.error('SweetAlert2: the argument for setDefaults() is required and has to be a object');
  }

  for (var param in userParams) {
    if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
      console.warn('SweetAlert2: Unknown parameter "' + param + '"');
      delete userParams[param];
    }
  }

  _extends(modalParams, userParams);
};

/**
 * Reset default params for each popup
 */
sweetAlert.resetDefaults = function () {
  modalParams = _extends({}, defaultParams);
};

sweetAlert.noop = function () {};

sweetAlert.version = '6.6.5';

sweetAlert.default = sweetAlert;

return sweetAlert;

})));
if (window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * accounting.js v0.4.1
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */

(function(root, undefined) {

	/* --- Setup --- */

	// Create the local library object, to be exported or referenced globally later
	var lib = {};

	// Current version
	lib.version = '0.4.1';


	/* --- Exposed settings --- */

	// The library's settings configuration object. Contains default parameters for
	// currency and number formatting
	lib.settings = {
		currency: {
			symbol : "$",		// default currency symbol is '$'
			format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
			decimal : ".",		// decimal point separator
			thousand : ",",		// thousands separator
			precision : 2,		// decimal places
			grouping : 3		// digit grouping (not implemented yet)
		},
		number: {
			precision : 0,		// default precision on numbers is 0
			grouping : 3,		// digit grouping (not implemented yet)
			thousand : ",",
			decimal : "."
		}
	};


	/* --- Internal Helper Methods --- */

	// Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
		nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js
	 */
	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js, delegates to ECMA5's native Array.isArray
	 */
	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

	/**
	 * Tests whether supplied parameter is a true object
	 */
	function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 *
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
	function map(obj, iterator, context) {
		var results = [], i, j;

		if (!obj) return results;

		// Use native .map method if it exists:
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

		// Fallback for native .map:
		for (i = 0, j = obj.length; i < j; i++ ) {
			results[i] = iterator.call(context, obj[i], i, obj);
		}
		return results;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	function checkPrecision(val, base) {
		val = Math.round(Math.abs(val));
		return isNaN(val)? base : val;
	}


	/**
	 * Parses a format string or object and returns format obj for use in rendering
	 *
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values (or a function returning
	 * either a string or object)
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 */
	function checkCurrencyFormat(format) {
		var defaults = lib.settings.currency.format;

		// Allow function as format parameter (should return string or object):
		if ( typeof format === "function" ) format = format();

		// Format can be a string, in which case `value` ("%v") must be present:
		if ( isString( format ) && format.match("%v") ) {

			// Create and return positive, negative and zero formats:
			return {
				pos : format,
				neg : format.replace("-", "").replace("%v", "-%v"),
				zero : format
			};

		// If no format, or object is missing valid positive value, use defaults:
		} else if ( !format || !format.pos || !format.pos.match("%v") ) {

			// If defaults is a string, casts it to an object for faster checking next time:
			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		// Otherwise, assume format was fine:
		return format;
	}


	/* --- API Methods --- */

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * Alias: `accounting.parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 */
	var unformat = lib.unformat = lib.parse = function(value, decimal) {
		// Recursively unformat arrays:
		if (isArray(value)) {
			return map(value, function(val) {
				return unformat(val, decimal);
			});
		}

		// Fails silently (need decent errors):
		value = value || 0;

		// Return the value as-is if it's already a number:
		if (typeof value === "number") return value;

		// Default decimal point comes from settings, but could be set to eg. "," in opts:
		decimal = decimal || lib.settings.number.decimal;

		 // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
				.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
				.replace(regex, '')         // strip out any cruft
				.replace(decimal, '.')      // make sure decimal point is standard
			);

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	};


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
	 * problems for accounting- and finance-related software.
	 */
	var toFixed = lib.toFixed = function(value, precision) {
		precision = checkPrecision(precision, lib.settings.number.precision);
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
	};


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * Alias: `accounting.format()`
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val) {
				return formatNumber(val, precision, thousand, decimal);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(precision) ? precision : {
					precision : precision,
					thousand : thousand,
					decimal : decimal
				}),
				lib.settings.number
			),

			// Clean up precision
			usePrecision = checkPrecision(opts.precision),

			// Do some calc:
			negative = number < 0 ? "-" : "",
			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
			mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
	};


	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * defaults: (0, "$", 2, ",", ".", "%s%v")
	 *
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 *
	 * To do: tidy up the parameters
	 */
	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val){
				return formatMoney(val, symbol, precision, thousand, decimal, format);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero):
			formats = checkCurrencyFormat(opts.format),

			// Choose which format to use for this value:
			useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

		// Return with currency symbol added:
		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	};


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
		if (!list) return [];

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero), only need pos for now:
			formats = checkCurrencyFormat(opts.format),

			// Whether to pad at start of string or after currency symbol:
			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

			// Store value for the length of the longest string in the column:
			maxLength = 0,

			// Format the list according to options, store the length of the longest string:
			formatted = map(list, function(val, i) {
				if (isArray(val)) {
					// Recursively format columns if list is a multi-dimensional array:
					return lib.formatColumn(val, opts);
				} else {
					// Clean up the value
					val = unformat(val);

					// Choose which format to use for this value (pos, neg or zero):
					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

						// Format this value, push into formatted list and save the length:
						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

					if (fVal.length > maxLength) maxLength = fVal.length;
					return fVal;
				}
			});

		// Pad each number in the list and send back the column of numbers:
		return map(formatted, function(val, i) {
			// Only if this is a string (not a nested array, which would have already been padded):
			if (isString(val) && val.length < maxLength) {
				// Depending on symbol position, pad after symbol or at index 0:
				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
			}
			return val;
		});
	};


	/* --- Module Definition --- */

	// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `accounting` to the global object
	if (true) {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = lib;
		}
		exports.accounting = lib;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return lib;
		});
	} else {
		// Use accounting.noConflict to restore `accounting` back to its original value.
		// Returns a reference to the library's `accounting` object;
		// e.g. `var numbers = accounting.noConflict();`
		lib.noConflict = (function(oldAccounting) {
			return function() {
				// Reset the value of the root's `accounting` variable:
				root.accounting = oldAccounting;
				// Delete the noConflict method:
				lib.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return lib;
			};
		})(root.accounting);

		// Declare `fx` on the root (global/window) object:
		root['accounting'] = lib;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));


/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_accounting__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_accounting___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_accounting__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'items-create': function itemsCreate() {
      return __webpack_require__.e/* import() */(10).then(__webpack_require__.bind(null, 68));
    },
    'items-edit': function itemsEdit() {
      return __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 72));
    }
  },
  data: function data() {
    return {
      items: {},
      total: 0,
      page: 1,
      last_page: 1,
      search: '',
      isEditing: false
    };
  },
  filters: {
    currency: function currency(value) {
      if (!value) return;
      return __WEBPACK_IMPORTED_MODULE_2_accounting___default.a.formatMoney(value, { symbol: "$", format: "%v %s", thousand: '.', decimal: ',' });
    }
  },
  methods: {
    openDialog: function openDialog() {
      this.$refs.createDialog.$refs.dialog1.open();
    },
    getUsers: function getUsers() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/items?page=' + this.page + '&search=' + this.search).then(function (_ref) {
        var data = _ref.data;

        _this.search = '';
        _this.items = data.data;
        _this.total = data.total;
        _this.page = data.current_page;
        _this.last_page = data.last_page;
      });
    },
    reload: function reload() {
      this.search = '';
      this.getUsers();
    },
    deleteItem: function deleteItem(id) {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()({
        text: "¿Quieres eliminar este producto?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo'
      }).then(function () {
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete('items/' + id).then(function () {
          __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()('Deleted!', 'Producto eliminado', 'success');
          self.getUsers();
        });
      });
    },
    searchInput: function searchInput() {
      this.getUsers();
      this.search = '';
    },
    next: function next() {
      if (this.page < this.last_page || last_page === 0) {
        this.page++;
        this.getUsers();
      }
    },
    previous: function previous() {
      if (this.page > 1) {
        this.page--;
        this.getUsers();
      }
    }
  },
  created: function created() {
    this.getUsers();
  }
});

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('p', {
    staticClass: "subtitle is-5"
  }, [_c('strong', [_vm._v(_vm._s(_vm.total))]), _vm._v(" productos\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "level-item"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search),
      expression: "search"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Encuentra un producto"
    },
    domProps: {
      "value": (_vm.search)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.search = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.searchInput()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-search",
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.reload()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openDialog($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isEditing = !_vm.isEditing
      }
    }
  }, [_c('i', {
    staticClass: "fa",
    class: _vm.isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o',
    attrs: {
      "aria-hidden": "true"
    }
  })])])])])])]), _vm._v(" "), _c('md-table', [_c('md-table-header', [_c('md-table-row', [_c('md-table-head', {
    attrs: {
      "md-numeric": ""
    }
  }, [_vm._v("#")]), _vm._v(" "), _c('md-table-head', [_vm._v("Nombre")]), _vm._v(" "), _c('md-table-head', [_vm._v("Descripción")]), _vm._v(" "), _c('md-table-head', [_vm._v("Cantidad")]), _vm._v(" "), _c('md-table-head', [_vm._v("Precio")]), _vm._v(" "), _c('md-table-head', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEditing),
      expression: "isEditing"
    }]
  })], 1)], 1), _vm._v(" "), _c('md-table-body', _vm._l((_vm.items), function(row, index) {
    return _c('md-table-row', {
      key: index
    }, [_c('md-table-cell', {
      attrs: {
        "md-numeric": ""
      }
    }, [_vm._v(_vm._s(row.id))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(row.name))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(row.description))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(row.amount))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(_vm._f("currency")(row.cost)))]), _vm._v(" "), _c('md-table-cell', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.isEditing),
        expression: "isEditing"
      }]
    }, [_c('md-menu', [_c('md-button', {
      staticClass: "md-icon-button",
      attrs: {
        "md-menu-trigger": ""
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil",
      attrs: {
        "aria-hidden": "true"
      }
    })]), _vm._v(" "), _c('md-menu-content', [_c('md-menu-item', {
      nativeOn: {
        "click": function($event) {
          $event.preventDefault();
          _vm.$refs.editItem.open(row)
        }
      }
    }, [_vm._v("Editar")]), _vm._v(" "), _c('md-menu-item', {
      nativeOn: {
        "click": function($event) {
          $event.preventDefault();
          _vm.deleteItem(row.id)
        }
      }
    }, [_vm._v("Borrar")])], 1)], 1)], 1)], 1)
  }))], 1), _vm._v(" "), _c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('md-button', {
    staticClass: "button",
    attrs: {
      "disabled": _vm.page <= 1
    },
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.previous($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-double-left"
  })])], 1), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('md-button', {
    staticClass: "button",
    attrs: {
      "disabled": _vm.page >= _vm.last_page || _vm.last_page === 0
    },
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.next($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-double-right"
  })])], 1)])])]), _vm._v(" "), _c('items-create', {
    ref: "createDialog",
    on: {
      "done": _vm.getUsers
    }
  }), _vm._v(" "), _c('items-edit', {
    ref: "editItem",
    on: {
      "done": _vm.getUsers
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-efe52b82", module.exports)
  }
}

/***/ })

});