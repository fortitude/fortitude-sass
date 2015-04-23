(function($) {
  'use strict';

  $.measureScrollBar = function() {
    var $body = $('body');
    var $element = $('<div />');
    var element = $element.get(0);

    $element.css({
      'position': 'absolute',
      'top': '-9999px',
      'width': '50px',
      'height': '50px',
      'overflow': 'scroll'
    });

    $body.append($element.get(0));
    var scrollbarWidth = element.offsetWidth - element.clientWidth;
    $element.remove();
    return scrollbarWidth;
  };
})(jQuery);
