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