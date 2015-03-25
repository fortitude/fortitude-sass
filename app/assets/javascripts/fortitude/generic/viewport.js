(function($) {
  'use strict';

  // zoom fix on input elements
  $(document).on('focus blur', ':input', function(event) {
    var $viewport = $('meta[name="viewport"]'),
        scale = 1;
    
    if(event.type === 'focusout' ||
       event.type === 'blur'){
      
      scale = 5;
    }
    
    $viewport.attr('content', 
      'width=device-width,' +
      'initial-scale=1,' +
      'maximum-scale=' + scale
    );
  });
})(jQuery);