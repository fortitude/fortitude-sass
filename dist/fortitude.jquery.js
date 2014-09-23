(function($) {
    'use strict';

    $(document).
      on('close:ft:flashbar', '.flashbar', function() {
        $(this).remove();
      }).
      on('click.ft.flashbar.data-api', '.flashbar__close', function(event) {
        $(this).closest('.flashbar').trigger('close:ft:flashbar');
        event.preventDefault();
      });

})(jQuery);

(function($) {
  'use strict';

  var $document = $(document);

  function setClassName() {
    var $this = $(this),
        className = $this.find(':selected').attr('class') || "",
        data = $this.data('ft.select') || {};

    if (className !== data.previousClass) {
      $this.
        addClass(className).
        removeClass(data.previousClass).
        data('ft.select', $.merge({previousClass: className}, data));
    }

  }

  $document.on('change.ft.select.data-api', 'select:not([multiple])', setClassName);

  $document.on('DOMContentLoaded', function() {
    $document.find('select').data('ft.select', {previousClass: ""}).each(setClassName);
  });

})(jQuery);

(function($) {
    'use strict';
    $(document).
      on('open:ft:shade', '.shade', function(event) {
        var $this = $(this);
        if(!$this.hasClass('shade--is-active')) {
          $this
            .addClass('shade--is-active')
            .addClass($this.data().showClass)
            .show()
            .waitForAnimation()
            .then(function() {
              $this.removeClass($this.data().showClass);
            });
        }
      }).
      on('close:ft:shade', '.shade', function(event) {
        var $this = $(this);
        if($this.hasClass('shade--is-active')) {
          $this
            .addClass($this.data().hideClass)
            .waitForAnimation()
            .then(function() {
              $this
                .hide()
                .removeClass('shade--is-active')
                .removeClass($this.data().hideClass);
            });
        }
      }).
      on('click.ft.shade.data-api', '.shade', function(event) {
        $(this).trigger('close:ft:shade');
        event.preventDefault();
    });

})(jQuery);

(function($) {
  'use strict';

  $.measureScrollBar = function() {
    var $body = $('body');
    var element = document.createElement('div');
    element.setAttribute('style', 'position: absolute; top: -9999px; width: 50px; height: 50px; overflow: scroll;');
    $body.append(element);
    var scrollbarWidth = element.offsetWidth - element.clientWidth;
    $body.get(0).removeChild(element);
    return scrollbarWidth;
  };
})(jQuery);

(function($) {
  'use strict';

  $.screenLock = function(locking) {
    var $html = $('html');
    var $body = $('body');

    if (locking) {
      $html.addClass('html--is-locked');
      $body.css({paddingRight: $.measureScrollBar()});
    } else {
      $html.removeClass('html--is-locked');
      $body.css({paddingRight: ''});
    }
  };

})(jQuery);

(function($) {
  'use strict';

  // zoom fix on input elements
  var $viewport = $('meta[name="viewport"]');
  $(document).on('focus blur', ':input', function(event) {
    $viewport.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type === 'focusout' || event.type === 'blur' ? 5 : 1));
  });
})(jQuery);

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

