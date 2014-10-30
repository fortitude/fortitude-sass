(function($) {
  'use strict';
  var transition = function() {
    var el = document.createElement('fortitude'),

    eventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition:    'transitionend',
      OTransition:      'oTransitionEnd otransitionend',
      transition:       'transitionend'
    },

    durationNames = {
      WebkitTransition:  '-webkit-transition-duration',
      MozTransition:     'transition-duration',
      OTransition:       '-o-transition-duration',
      transition:        'transition-duration'
    };

    for (var name in eventNames) {
      if (el.style[name] !== undefined) {
        return { end: eventNames[name], duration: durationNames[name] };
      }
    }

    return false;
  },

  animation = function() {
    var el = document.createElement('fortitude'),

    eventNames = {
      WebkitAnimation:  'webkitAnimationEnd',
      MozAnimation:     'animationend',
      OAnimation:       'oAnimationEnd oanimationend',
      animation:        'animationend'
    },

    durationNames = {
      WebkitAnimation:  '-webkit-animation-duration',
      MozAnimation:     'animationDuration',
      OAnimation:       '-o-animation-duration',
      animation:        'animation-duration'
    };

    for (var name in eventNames) {
      if (el.style[name] !== undefined) {
        return { end: eventNames[name], duration: durationNames[name] };
      }
    }

    return false;
  },

  transitionData = transition(),
  animationData = animation(),

  parseDuration = function(duration) {
    var split = duration.split(/(ms|s)/, 2),
      result = split[1] === 'ms' ? parseFloat(split[0]) : parseFloat(split[0]) * 1000;
    return result || 0;
  };

  $.fn.waitForAnimation = function(options, callback) {
    var self = this,
      $this = $(self),
      defaults = {
        type: 'animation'
      },
      eventType, duration, defer;

    options = $.extend({}, defaults, options);

    if (options.type === 'animation') {
      eventType = animationData.end;
      duration = parseDuration(getComputedStyle($this.get(0), null)[animationData.duration]);
    } else if (options.type === 'transition') {
      eventType = transitionData.end;
      duration = parseDuration(getComputedStyle($this.get(0), null)[transitionData.duration]);
    }

    defer = $.Deferred(function(deferred) {
      var timeoutId,
        _callback = function() {
          $this.off(eventType, _callback);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          deferred.resolve();
        };

      $this.on(eventType, _callback);
      timeoutId = setTimeout(_callback, duration);

    }).promise();

    return defer.done(callback);
  };
})(jQuery);
