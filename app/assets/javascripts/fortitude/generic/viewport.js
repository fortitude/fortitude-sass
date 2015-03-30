(function($) {
  'use strict';

  // zoom fix on input elements
  $(document).on('focus blur', ':input', function(event) {
    var $viewport = $('meta[name="viewport"]'),
        content = 'width=device-width, initial-scale=1.0';

    if(event.type === 'focusout' ||
       event.type === 'blur'){

      content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
    }

    $viewport.attr('content', content);
  });
})(jQuery);
