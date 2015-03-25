(function($) {
  'use strict';

  $.measureScrollBar = function() {
    var $body = $('body'),
        element = document.createElement('div'),
        scrollbarWidth = element.offsetWidth - element.clientWidth;
    
    element.setAttribute('style', 
      'position: absolute; ' +
      'top: -9999px; ' + 
      'width: 50px; ' +
      'height: 50px; ' + 
      'overflow: scroll;'
    );
    
    $body.append(element);
    $body.get(0).removeChild(element);
    return scrollbarWidth;
  };
})(jQuery);