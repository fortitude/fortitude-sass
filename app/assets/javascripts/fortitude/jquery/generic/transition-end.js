(function ($) {
  'use strict';

  function transitionEnd() {
    var el = document.createElement('fortitude');

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false;
  }

  function parseTansitionDuration(duration) {
    var split = duration.split(/(ms|s)/, 2);
    var result = split[1] === "ms" ? parseFloat(split[0]) : parseFloat(split[0]) * 1000;
    return result || 0;
  }

  $.fn.transitionEnd = function (callback) {
    var self = this;
    var called = false;
    var $this = $(self);
    var duration = parseTansitionDuration(getComputedStyle($this.get(0), null).transitionDuration);
    var _callback = function () {
        called = true;
        $this.off($.support.transition.end, _callback);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        callback.apply(self, arguments);
    };
    $this.on($.support.transition.end, _callback);
    var timeoutId = setTimeout(_callback, duration);
  };

  $(function () {
    $.support.transition = transitionEnd()
  });

})(jQuery);