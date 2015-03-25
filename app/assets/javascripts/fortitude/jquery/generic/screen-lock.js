(function($) {
  'use strict';

  $.screenLock = function(locking) {
    var $html = $('html'),
        $body = $('body');

    if(typeof(locking) === 'undefined'){
      locking = true;
    }
    
    if (locking) {
      $html.addClass('html--is-locked');
      $body.css({paddingRight: $.measureScrollBar()});
    } else {
      $html.removeClass('html--is-locked');
      $body.css({paddingRight: ''});
    }
  };

})(jQuery);