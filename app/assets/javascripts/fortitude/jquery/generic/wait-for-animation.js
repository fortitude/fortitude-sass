(function ($) {
  'use strict';

  function transition() {
    var el = document.createElement('fortitude');

    var eventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    };

    var durationNames = {
      WebkitTransition : '-webkit-transition-duration',
      MozTransition    : 'transition-duration',
      OTransition      : '-o-transition-duration',
      transition       : 'transition-duration'
    };

    for (var name in eventNames) {
      if (el.style[name] !== undefined) {
        return { end: eventNames[name], duration: durationNames[name] };
      }
    }

    return false;
  }

  function animation() {
    var el = document.createElement('fortitude');

    var eventNames = {
      WebkitAnimation : 'webkitAnimationEnd',
      MozAnimation    : 'animationend',
      OAnimation      : 'oAnimationEnd oanimationend',
      animation       : 'animationend'
    };

    var durationNames = {
      WebkitAnimation : '-webkit-animation-duration',
      MozAnimation    : 'animationDuration',
      OAnimation      : '-o-animation-duration',
      animation       : 'animation-duration'
    };

    for (var name in eventNames) {
      if (el.style[name] !== undefined) {
        return { end: eventNames[name], duration: durationNames[name] };
      }
    }

    return false;
  }

  var transitionData = transition();
  var animationData = animation();

  function parseDuration(duration) {
    var split = duration.split(/(ms|s)/, 2);
    var result = split[1] === "ms" ? parseFloat(split[0]) : parseFloat(split[0]) * 1000;
    return result || 0;
  }

  $.fn.waitForAnimation = function(options, callback) {
    var self = this;
    var called = false;
    var $this = $(self);
    var defaults = {
      type: 'animation'
    };

    var options = $.extend({}, defaults, options);
    if (options.type === 'animation') {
      var eventType = animationData.end;
      var duration = parseDuration(getComputedStyle($this.get(0), null)[animationData.duration]);
    } else if (options.type === 'transition') {
      var eventType = transitionData.end;
      var duration = parseDuration(getComputedStyle($this.get(0), null)[transitionData.duration]);
    }

    var defer = $.Deferred(function( defer ) {
        var _callback = function() {
          called = true;
          $this.off(eventType, _callback);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          defer.resolve();
        };

        $this.on(eventType, _callback);
        var timeoutId = setTimeout(_callback, duration);

    }).promise();

    return defer.done( callback );

  };
})(jQuery);