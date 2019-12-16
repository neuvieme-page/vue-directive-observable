'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var IntersectionObserver=_interopDefault(require('intersection-observer-polyfill'));/**
 * @param {Object} options
 * @param {Array<string>|string} class
 * @param {boolean} multiple
 * @param {number} threshold
 */
var observableDirective = {
  bind: function(el, binding) {
    var params = {
      class: binding.value.class
        ? binding.value.class instanceof Array
          ? binding.value.class
          : [binding.value.class]
        : typeof binding.value === 'string'
          ? binding.value.split(/\s/)
          : [],

      multiple: binding.value.multiple ? true : false,
      threshold: binding.value.threshold ? binding.value.threshold : 0,
      callback: binding.value.callback ? binding.value.callback : null
    };

    binding.value = params;

    var observer = new IntersectionObserver(
      function (elements) {
        elements.forEach(function (ref) {
          var isIntersecting = ref.isIntersecting;
          var target = ref.target;

          if (isIntersecting) {
            params.class.forEach(function (className) {
              target.classList.add(className);
            });
            if (params.callback) {
              params.callback();
            }
            if (params.multiple === false) {
              binding.value.observer.unobserve(el);
            }
          } else {
            params.class.forEach(function (className) {
              target.classList.remove(className);
            });
          }
        });
      },
      {
        threshold: params.threshold
      }
    );

    binding.value.observer = observer;
    observer.observe(el);
  },

  unbind: function unbind(el, binding) {
    if (binding.value.observer) {
      binding.value.observer.unobserve(el);
    }
  }
};

// install function executed by Vue.directive()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.directive('observable', observableDirective);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
observableDirective.install = install;exports.default=observableDirective;