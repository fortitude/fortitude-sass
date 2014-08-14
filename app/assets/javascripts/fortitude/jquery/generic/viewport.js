(function($) {
  'use strict';

  // zoom fix on input elements
  var $viewport = $('meta[name="viewport"]');
  $(document).on('focus blur', ':input', function(event) {
    $viewport.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type === 'focusout' || event.type === 'blur' ? 5 : 1));
  });
})(jQuery);